import sqlite3, base64, hmac, hashlib, json, sys, itertools
from pony_models import *
from pony.orm import *
from pony.orm.serialization import to_dict
from bottle import route, post, get, put, delete, run, template, request, response, abort, static_file


def get_model(modelName):
	instance = None
	try:
		instance = getattr(sys.modules[__name__], modelName)
	except AttributeError as e:
		abort(404, "The requested table does not exist.")

	return instance

def resolve_result(result, modelName):
	result = to_dict(result)
	model = get_model(modelName)
	if len(model.Meta.collections) > 0:
		try:
			instances = result[modelName]
		except KeyError as e:
			return []
		for instanceKey, instance in instances.items():
			instance.pop('Password', None) # remove password field if exists
			for attr, mapping in model.Meta.collections:
				for i in range(0, len(instance[attr])):
					key = instance[attr].pop(0)
					result[mapping][key].pop('Password', None) # remove password field if exists
					instance[attr].append(result[mapping][key])

	return list(result[modelName].values())


db.bind('sqlite', 'websiteDatabase.db', create_db=False)
db.generate_mapping(create_tables=False)
sql_debug(True)

def hash(text):
	salt = b'28i3k4mrfdmjxsu89weol4r,5mtnbgvyc7xs8wor8t76etgsvz cdr3t6r78ifodpx-s0a98w7eyrhfnvmcklx'
	text = bytes(text, 'utf-8')
	return hmac.new(salt, text, digestmod=hashlib.sha256).hexdigest()

def read_body(body):
	return json.loads(body.read().decode('utf-8'))

# register a user; also logs them in
@post('/user/register')
@db_session
def user_register():
	body = read_body(request.body)
	name = body['Name']
	username = body['Username']
	password = body['Password']
	hpassword = hash(password)
	try:
		user = User(Name=name, Username=username, Password=hpassword)
	except pony.orm.core.TransactionIntegrityError as e:
		resp = {"message": "Username already exists."}
		response.content_type = 'application/json'
		response.status_code = 409
		return json.dumps(resp)

# logs a user in
@post('/user/login')
@db_session
def user_login():
	body = read_body(request.body)
	resp = {}
	username = body['Username']
	password = body['Password']
	hpassword = hash(password)
	
	user = User.get(Username=username, Password=hpassword)

	if user is None:
		abort(401, 'Invalid credentials.')
	else:
		result = resolve_result(user, 'User')[0]
		result.pop('Password', None)
		resp = result
		response.set_cookie("auth", str(user.UID), path="/")
	response.content_type = 'application/json'
	return json.dumps(resp)



@get('/test')
@db_session
def test():
	classes = select(c for c in Class)[:][1]
	result = classes.to_dict(with_collections=True)
	response.content_type = 'application/json'
	return json.dumps(result)

@get('/api/prereqs/<cid>')
@db_session
def get_prereqs(cid):
	instance = select(c for c in Class if cid == c.CID).first()
	if instance == None:
		abort(404, 'The requested resource does not exist.')
	result = []
	for eqclass in instance.Prerequisites.EQClass:
		classes = select(c for c in Class if eqclass in c.EQClasses.EQClass)
		result.append(resolve_result(classes, 'Class'))
	response.content_type = 'application/json'
	return json.dumps(result)



@get('/api/<table>/<id>')
@get('/api/<table>')
@db_session
def table_select(table, id=None):
	instance = get_model(table)
	if id is None:
		result = resolve_result(select(i for i in instance)[:], table)
	else:
		try:
			result = resolve_result(instance[tuple(id.split(','))], table)
		except ObjectNotFound as e:
			abort(404, "The requested resource does not exist.")
	response.content_type = 'application/json'
	return json.dumps(result)

@post('/api/<table>')
@db_session
def table_insert(table):
	body = read_body(request.body)
	model = get_model(table)
	instance = model(**body)

@put('/api/<table>/<id>')
@db_session
def table_update(table, id):
	body = read_body(request.body)
	model = get_model(table)
	try:
		instance = model[tuple(id.split(','))]
	except ObjectNotFound as e:
		abort(404, "The requested resource does not exist.")

	instance.set(**body)

@delete('/api/<table>/<id>')
@db_session
def table_delete_item(table, id):
	model = get_model(table)
	try:
		instance = model[tuple(id.split(','))]
	except ObjectNotFound as e:
		abort(404, "The requested resource does not exist.")
	instance.delete()

@delete('/api/User/ClassesTaken/<uid>')
@db_session
def user_delete_all_classes_taken(uid):
	result = select(u.ClassesTaken for u in User if u.UID == uid)
	for ct in result:
		ct.delete()


  
@route('/')
def index():
  return static_file('index.html', root='../')
  
# All other files  
@route('/<filepath:path>')
def server_static(filepath):
  return static_file(filepath, root='../')

run(port=8080)