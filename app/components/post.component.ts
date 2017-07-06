import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { UserModel } from '../models/user.model';
import { Http, Response } from '@angular/http';
import { UserService } from '../services/user.service';

var $ = (window as any).$ || {};
var Materialize = (window as any).Materialize || {};

@Component({
	selector:'post',
	template: `
		<div class="container">
			<div class="card {{color}}">
				<div class="card-content white-text">
					<div class="row">
					    <div class="col s1 post-voting">
							<a (click)="upvote()" class="white-text upvote"><i class="small material-icons">keyboard_arrow_up</i></a>
				            <div class="post-score">{{post.weight}}</div>
				            <a (click)="downvote()" class="white-text downvote"><i class="material-icons">keyboard_arrow_down</i></a>
					    </div>
					    <div class="col s11">
					        <div class="card-title post-info">
					            <div class="post-title">{{post.title}}</div>
					            <div class="post-date">{{post.datetime}}</div>
					            <div class="post-username">{{post.username}}</div>
					        </div>
					        <p class="grey-text text-lighten-2 post-body">{{post.text}}</p>
					    </div>
					</div>

				</div>
				<div class="card-action">
					<a *ngIf="postComment.length>0" (click)="toggleComments()" class="blue-text text-lighten-5">{{showComments ? "Hide" : "Show"}} comments</a>
					<a (click)="showCreateCommentModal(post.pid)" class="blue-text text-lighten-5">Add comment</a>

				</div>
			</div>

			<div id="createCommentModal-{{ post.pid }}" style="z-index: 100" class="modal bottom-sheet">
		  	<div class="modal-content">
		 	 	<form class="col s12">
		      	  	<div class="row">
		        	  	<div class="input-field col s6">
				          <textarea #textEntry id="createCommentBody" class="materialize-textarea"></textarea>
				          <label for="createCommentBody">Comment body</label>
			        	</div>
			        </div>
		      	</form>
		  	</div>
		  	<div class="modal-footer">
		      	<a (click)="hideCreateCommentModal(post.pid)" class="left modal-close waves-effect waves-green btn-flat">Close</a>
		      	<a (click)="addComment(textEntry.value)" class="left modal-close waves-effect waves-green btn-flat">Submit</a>
		  	</div>
		</div>
			
		</div>
        
		<div *ngIf="postComment.length>0 && showComments"  class="postComment">
        	<div *ngFor="let pc of postComment">
					<comment [comment]="pc" [post]="post" [depth]="1"></comment>
			</div>
		</div>

	    
	`
	,
	styles:[
	`
	.post-title {
	    margin-bottom: 0;
	    font-weight: bold;
	}

	.post-date {
	    margin-top: -2.2em;
	    font-size: 50%;
	}
	.post-username{
		margin-top: -2.2em;
	  font-size: 50%;
	}
	.card a {
		cursor: pointer;
	}
	.post-body {
	    font-weight: 300;
	}
	.post-voting a {
		display: block;
	}
	.post-voting i {
		font-size: 2rem;
	}
	
	.card-action a {
		cursor: pointer;
	}
	.post-score {
		margin-left: .7em;
		display: inline-block;
		margin-top: 0;
		margin-bottom: 0;
	}

	.upvote, .downvote {
		cursor: pointer;
	}
	`
	]
	})

export class PostComponent implements OnInit, AfterViewInit {
	commentURL: string;
	postComment: any;

	showComments: boolean;
	showPopUpModal: boolean;

	@Input()
	post: any;

	@Input()
	color: string;


	constructor(public http: Http, public userservice: UserService) { 
		this.commentURL = 'http://localhost/final/Database/forum.php';
		this.postComment = [];
		this.showPopUpModal = false;
		this.showComments = false;
	}
	deletePost(){
		console.log("Delete Post");
		this.http.delete(`${this.commentURL}/${this.post.cid}/${this.post.pid}`),{}
	}
	downvote(){
		console.log("downvote");
		this.http
		.put(`${this.commentURL}/${this.post.cid}/${this.post.pid}`,{downvote: true})
		.subscribe((res: Response)=>{
			//need to refresh posts
			this.refresh(false);
		});
	}
	upvote(){
		console.log("upvote");
		this.http.put(`${this.commentURL}/${this.post.cid}/${this.post.pid}`,{
			upvote: true
		}).subscribe((res: Response)=>{
			this.refresh(false);
		}, (err) => console.log(err));
	}
	showCreateCommentModal(id: number){
		$("#createCommentModal-" + id).modal('open');
		$("#createCommentBody").val("");
		
	}
	hideCreateCommentModal(id: number){
		$("#createCommentModal-" + id).modal('close');

	}
	censorship(inputString: string){
		var outPutString = "";
		var replacementPhrases = ["is cool", "your hair is shiny", "your teeth are very hard", "love", "is awesome", "cool","awesome", "you look like you could bear children well","if it came down to you or another person life or death situation I would choose you","is amazing","I love you in spite of your music taste","you could be a part time model","I don't want to vomit when I look at you"];
		//Array of bad words taken from following URL: http://codewithdesign.com/2011/05/20/php-array-of-bad-words/
		var badWords = ["quit", , "horrid","terrible","suck",,"sucks","fuck","shit","ballsack","scroutum","hell",'fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker',
                                'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'asssucker', 'bastard', 'bitch', 'bitchtits',
                                'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick',
                                'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass',
                                'fuckboy', 'fuckbag', 'piss', 'prick', 'pussy',
                                'poontang', 'poonany', 'porchmonkey','porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski',
                                'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'choad', 'clitface'
                                , 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat',
                                'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'whore', 'whorebag', 'whoreface'];
    var inputSplitBySpace = inputString.split(' ');
    for(var x in inputSplitBySpace){
    	for(var y in badWords){
    		if(inputSplitBySpace[x].toUpperCase()===badWords[y].toUpperCase()){
    			//replace with something from replacement phrases
    			var replacementPhraseIndex = Math.floor(Math.random()*(replacementPhrases.length+1));
    			inputSplitBySpace[x]=replacementPhrases[replacementPhraseIndex];
    			break;
    		}
    	}
    }
    var toString = inputSplitBySpace.toString();
    console.log(toString);
    outPutString = toString.replace(/,/g , " ");
    return outPutString;
	}
	addComment(textEntryVal: string){
		textEntryVal = this.censorship(textEntryVal);
		this.userservice.getUser().subscribe((user: UserModel) => {
			this.http.post(`${this.commentURL}/${this.post.cid}/${this.post.pid}`,{
				text:textEntryVal,
				uid: user.UID,
				parentID: ""
			}).subscribe((res: Response)=>{
				this.hideCreateCommentModal(this.post.pid);
				this.refresh(true);
			}, (err) => console.log(err));
		});
	}

	ngOnInit() {
		this.refresh(true);
	}

	refresh(commentsChanged: boolean) {
		this.http.get(`${this.commentURL}/${this.post.cid}/${this.post.pid}`).subscribe((res: Response) => {
			this.post	= res.json();
			if (commentsChanged) this.postComment = this.post.comments;
		});
	}

	setShowComments(val: boolean) {
		this.showComments = val;
	}

	toggleComments() {
		this.showComments = !this.showComments;
	}

  ngAfterViewInit() {
    // document ready
    	$(".modal").modal();

  }
}
