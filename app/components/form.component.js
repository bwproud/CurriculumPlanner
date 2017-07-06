"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var user_service_1 = require('../services/user.service');
var $ = window.$ || {};
var Materialize = window.Materialize || {};
var FormComponent = (function () {
    function FormComponent(http, userservice) {
        this.http = http;
        this.userservice = userservice;
        this.commentURL = 'http://localhost/final/Database/forum.php';
        this.posts = [];
        this.showPopUpModal = false;
    }
    Object.defineProperty(FormComponent.prototype, "cid", {
        get: function () {
            return this._cid;
        },
        set: function (cid) {
            this._cid = cid;
            if (cid !== null) {
                this.loadPosts();
            }
        },
        enumerable: true,
        configurable: true
    });
    FormComponent.prototype.getCourse = function () {
        return this.course;
    };
    FormComponent.prototype.showCreatePostModal = function () {
        $("#createPostModal").modal('open');
        $("#createPostTitle").val("");
        $("#createPostBody").val("");
    };
    FormComponent.prototype.hideCreatePostModal = function () {
        $("#createPostModal").modal('close');
    };
    FormComponent.prototype.loadPosts = function () {
        var _this = this;
        this.http.get(this.commentURL + "/" + this.cid).subscribe(function (res) {
            _this.posts = res.json();
        });
    };
    FormComponent.prototype.censorship = function (inputString) {
        var outPutString = "";
        var replacementPhrases = ["is cool", "your hair is shiny", "your teeth are very hard", "love", "is awesome", "cool", "awesome", "you look like you could bear children well", "if it came down to you or another person life or death situation I would choose you", "is amazing", "I love you in spite of your music taste", "you could be a part time model", "I don't want to vomit when I look at you"];
        //Array of bad words taken from following URL: http://codewithdesign.com/2011/05/20/php-array-of-bad-words/
        var badWords = ["quit", , "horrid", "terrible", "suck", "sucks", "fuck", "fucking", "motherfuck", "motherfucker", "shit", "ballsack", "scroutum", "hell", 'fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker',
            'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'asssucker', 'bastard', 'bitch', 'bitchtits',
            'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick',
            'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass',
            'fuckboy', 'fuckbag', 'piss', 'prick', 'pussy',
            'poontang', 'poonany', 'porchmonkey', 'porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski',
            'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'choad', 'clitface',
            'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat',
            'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'whore', 'whorebag', 'whoreface'];
        var inputSplitBySpace = inputString.split(' ');
        for (var x in inputSplitBySpace) {
            for (var y in badWords) {
                if (inputSplitBySpace[x].toUpperCase() === badWords[y].toUpperCase()) {
                    //replace with something from replacement phrases
                    var replacementPhraseIndex = Math.floor(Math.random() * (replacementPhrases.length + 1));
                    inputSplitBySpace[x] = replacementPhrases[replacementPhraseIndex];
                    break;
                }
            }
        }
        var toString = inputSplitBySpace.toString();
        console.log(toString);
        outPutString = toString.replace(/,/g, " ");
        return outPutString;
    };
    FormComponent.prototype.postPost = function (pt, te) {
        var _this = this;
        if (pt === "" || te === "") {
        }
        else {
            pt = this.censorship(pt);
            te = this.censorship(te);
            console.log(pt);
            console.log(te);
            this.userservice.getUser().subscribe(function (user) {
                _this.http.post(_this.commentURL + "/" + _this.cid, {
                    uid: user.UID,
                    title: pt,
                    text: te
                }).subscribe(function (res) {
                    console.log(res);
                    _this.hideCreatePostModal();
                    _this.loadPosts();
                }, function (err) { return console.log(err); });
            });
        }
    };
    FormComponent.prototype.ngAfterViewInit = function () {
        $(".modal").modal();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], FormComponent.prototype, "cid", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "course", void 0);
    FormComponent = __decorate([
        core_1.Component({
            selector: 'formPage',
            template: "\n\t<div *ngIf = \"posts.size!==0\" >\n\t\t<div *ngFor=\"let post of posts\" class = \"post-container\" style = \"width: 100%;\" >\n\t\t\t<post [post]=\"post\" [color]=\"'blue lighten-0'\"></post>\n\t\t</div>\n\t</div>\n\t<div *ngIf = \"posts.length==0\">\n\t\t<p>No Posts to Show</p>\n\t</div>\n\t<br>\n  \t<div id=\"createPostModal\" style=\"z-index: 100\" class=\"modal bottom-sheet\">\n\t  \t<div class=\"modal-content\">\n\t \t \t<form class=\"col s12\">\n\t \t \t\t<div class=\"row\">\n\t        \t  \t<div class=\"input-field col s6\">\n\t\t\t          <input #postTitle id=\"createPostTitle\" type=\"text\">\n\t\t\t          <label for=\"createPostTitle\">Post title</label>\n\t\t        \t</div>\n\t\t        </div>\n\t      \t  \t<div class=\"row\">\n\t        \t  \t<div class=\"input-field col s6\">\n\t\t\t          <textarea #textEntry id=\"createPostBody\" class=\"materialize-textarea\"></textarea>\n\t\t\t          <label for=\"createPostBody\">Post body</label>\n\t\t        \t</div>\n\t\t        </div>\n\t      \t</form>\n\t  \t</div>\n\t  \t<div class=\"modal-footer\">\n\t      \t<a (click)=\"hideCreatePostModal()\" class=\"left modal-close waves-effect waves-green btn-flat\">Close</a>\n\t      \t<a (click)=\"postPost(postTitle.value, textEntry.value)\" class=\"left modal-close waves-effect waves-green btn-flat\">Submit</a>\n\t  \t</div>\n\t</div>\n\n\t<div class=\"fixed-action-btn\">\n    \t<a (click)=\"showCreatePostModal()\" class=\"btn-floating btn-large red\">\n      \t\t<i class=\"large material-icons\">mode_edit</i>\n   \t\t</a>\n  </div>\n\n\t"
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map