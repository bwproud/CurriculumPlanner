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
var PostComponent = (function () {
    function PostComponent(http, userservice) {
        this.http = http;
        this.userservice = userservice;
        this.commentURL = 'http://localhost/final/Database/forum.php';
        this.postComment = [];
        this.showPopUpModal = false;
        this.showComments = false;
    }
    PostComponent.prototype.deletePost = function () {
        console.log("Delete Post");
        this.http.delete(this.commentURL + "/" + this.post.cid + "/" + this.post.pid), {};
    };
    PostComponent.prototype.downvote = function () {
        var _this = this;
        console.log("downvote");
        this.http
            .put(this.commentURL + "/" + this.post.cid + "/" + this.post.pid, { downvote: true })
            .subscribe(function (res) {
            //need to refresh posts
            _this.refresh(false);
        });
    };
    PostComponent.prototype.upvote = function () {
        var _this = this;
        console.log("upvote");
        this.http.put(this.commentURL + "/" + this.post.cid + "/" + this.post.pid, {
            upvote: true
        }).subscribe(function (res) {
            _this.refresh(false);
        }, function (err) { return console.log(err); });
    };
    PostComponent.prototype.showCreateCommentModal = function (id) {
        $("#createCommentModal-" + id).modal('open');
        $("#createCommentBody").val("");
    };
    PostComponent.prototype.hideCreateCommentModal = function (id) {
        $("#createCommentModal-" + id).modal('close');
    };
    PostComponent.prototype.censorship = function (inputString) {
        var outPutString = "";
        var replacementPhrases = ["is cool", "your hair is shiny", "your teeth are very hard", "love", "is awesome", "cool", "awesome", "you look like you could bear children well", "if it came down to you or another person life or death situation I would choose you", "is amazing", "I love you in spite of your music taste", "you could be a part time model", "I don't want to vomit when I look at you"];
        //Array of bad words taken from following URL: http://codewithdesign.com/2011/05/20/php-array-of-bad-words/
        var badWords = ["quit", , "horrid", "terrible", "suck", , "sucks", "fuck", "shit", "ballsack", "scroutum", "hell", 'fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker',
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
    PostComponent.prototype.addComment = function (textEntryVal) {
        var _this = this;
        textEntryVal = this.censorship(textEntryVal);
        this.userservice.getUser().subscribe(function (user) {
            _this.http.post(_this.commentURL + "/" + _this.post.cid + "/" + _this.post.pid, {
                text: textEntryVal,
                uid: user.UID,
                parentID: ""
            }).subscribe(function (res) {
                _this.hideCreateCommentModal(_this.post.pid);
                _this.refresh(true);
            }, function (err) { return console.log(err); });
        });
    };
    PostComponent.prototype.ngOnInit = function () {
        this.refresh(true);
    };
    PostComponent.prototype.refresh = function (commentsChanged) {
        var _this = this;
        this.http.get(this.commentURL + "/" + this.post.cid + "/" + this.post.pid).subscribe(function (res) {
            _this.post = res.json();
            if (commentsChanged)
                _this.postComment = _this.post.comments;
        });
    };
    PostComponent.prototype.setShowComments = function (val) {
        this.showComments = val;
    };
    PostComponent.prototype.toggleComments = function () {
        this.showComments = !this.showComments;
    };
    PostComponent.prototype.ngAfterViewInit = function () {
        // document ready
        $(".modal").modal();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PostComponent.prototype, "post", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PostComponent.prototype, "color", void 0);
    PostComponent = __decorate([
        core_1.Component({
            selector: 'post',
            template: "\n\t\t<div class=\"container\">\n\t\t\t<div class=\"card {{color}}\">\n\t\t\t\t<div class=\"card-content white-text\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t    <div class=\"col s1 post-voting\">\n\t\t\t\t\t\t\t<a (click)=\"upvote()\" class=\"white-text upvote\"><i class=\"small material-icons\">keyboard_arrow_up</i></a>\n\t\t\t\t            <div class=\"post-score\">{{post.weight}}</div>\n\t\t\t\t            <a (click)=\"downvote()\" class=\"white-text downvote\"><i class=\"material-icons\">keyboard_arrow_down</i></a>\n\t\t\t\t\t    </div>\n\t\t\t\t\t    <div class=\"col s11\">\n\t\t\t\t\t        <div class=\"card-title post-info\">\n\t\t\t\t\t            <div class=\"post-title\">{{post.title}}</div>\n\t\t\t\t\t            <div class=\"post-date\">{{post.datetime}}</div>\n\t\t\t\t\t            <div class=\"post-username\">{{post.username}}</div>\n\t\t\t\t\t        </div>\n\t\t\t\t\t        <p class=\"grey-text text-lighten-2 post-body\">{{post.text}}</p>\n\t\t\t\t\t    </div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-action\">\n\t\t\t\t\t<a *ngIf=\"postComment.length>0\" (click)=\"toggleComments()\" class=\"blue-text text-lighten-5\">{{showComments ? \"Hide\" : \"Show\"}} comments</a>\n\t\t\t\t\t<a (click)=\"showCreateCommentModal(post.pid)\" class=\"blue-text text-lighten-5\">Add comment</a>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div id=\"createCommentModal-{{ post.pid }}\" style=\"z-index: 100\" class=\"modal bottom-sheet\">\n\t\t  \t<div class=\"modal-content\">\n\t\t \t \t<form class=\"col s12\">\n\t\t      \t  \t<div class=\"row\">\n\t\t        \t  \t<div class=\"input-field col s6\">\n\t\t\t\t          <textarea #textEntry id=\"createCommentBody\" class=\"materialize-textarea\"></textarea>\n\t\t\t\t          <label for=\"createCommentBody\">Comment body</label>\n\t\t\t        \t</div>\n\t\t\t        </div>\n\t\t      \t</form>\n\t\t  \t</div>\n\t\t  \t<div class=\"modal-footer\">\n\t\t      \t<a (click)=\"hideCreateCommentModal(post.pid)\" class=\"left modal-close waves-effect waves-green btn-flat\">Close</a>\n\t\t      \t<a (click)=\"addComment(textEntry.value)\" class=\"left modal-close waves-effect waves-green btn-flat\">Submit</a>\n\t\t  \t</div>\n\t\t</div>\n\t\t\t\n\t\t</div>\n        \n\t\t<div *ngIf=\"postComment.length>0 && showComments\"  class=\"postComment\">\n        \t<div *ngFor=\"let pc of postComment\">\n\t\t\t\t\t<comment [comment]=\"pc\" [post]=\"post\" [depth]=\"1\"></comment>\n\t\t\t</div>\n\t\t</div>\n\n\t    \n\t",
            styles: [
                "\n\t.post-title {\n\t    margin-bottom: 0;\n\t    font-weight: bold;\n\t}\n\n\t.post-date {\n\t    margin-top: -2.2em;\n\t    font-size: 50%;\n\t}\n\t.post-username{\n\t\tmargin-top: -2.2em;\n\t  font-size: 50%;\n\t}\n\t.card a {\n\t\tcursor: pointer;\n\t}\n\t.post-body {\n\t    font-weight: 300;\n\t}\n\t.post-voting a {\n\t\tdisplay: block;\n\t}\n\t.post-voting i {\n\t\tfont-size: 2rem;\n\t}\n\t\n\t.card-action a {\n\t\tcursor: pointer;\n\t}\n\t.post-score {\n\t\tmargin-left: .7em;\n\t\tdisplay: inline-block;\n\t\tmargin-top: 0;\n\t\tmargin-bottom: 0;\n\t}\n\n\t.upvote, .downvote {\n\t\tcursor: pointer;\n\t}\n\t"
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
//# sourceMappingURL=post.component.js.map