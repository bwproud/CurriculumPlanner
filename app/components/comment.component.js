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
var CommentComponent = (function () {
    function CommentComponent(http, userservice) {
        this.http = http;
        this.userservice = userservice;
        this.URL = 'http://localhost/final/Database/forum.php';
        this.replies = [];
        this.showPopUpModal = false;
        //console.log("c: "+ this.comment);
    }
    CommentComponent.prototype.showCreateCommentModal = function (id) {
        $("#createCommentModal-" + id).modal('open');
        $("#createCommentBody").val("");
    };
    CommentComponent.prototype.hideCreateCommentModal = function (id) {
        $("#createCommentModal-" + id).modal('close');
    };
    CommentComponent.prototype.downvote = function () {
        var _this = this;
        console.log("downvote");
        this.http
            .put(this.URL + "/" + this.post.cid + "/" + this.post.pid + "/" + this.comment.coid, { downvote: true })
            .subscribe(function (res) {
            //need to refresh posts
            _this.refresh();
        });
    };
    CommentComponent.prototype.upvote = function () {
        var _this = this;
        console.log(this.comment.coid);
        this.http.put(this.URL + "/" + this.post.cid + "/" + this.post.pid + "/" + this.comment.coid, {
            upvote: true
        }).subscribe(function (res) {
            _this.refresh();
        }, function (err) { return console.log(err); });
    };
    CommentComponent.prototype.addComment = function (textEntryVal) {
        var _this = this;
        textEntryVal = this.censorship(textEntryVal);
        console.log(this.post.cid);
        console.log(this.post.pid);
        console.log(this.comment.coid);
        console.log(this.URL + "/" + this.post.cid + "/" + this.post.pid);
        this.userservice.getUser().subscribe(function (user) {
            _this.http.post(_this.URL + "/" + _this.post.cid + "/" + _this.post.pid + "/", {
                text: textEntryVal,
                uid: user.UID,
                parentID: _this.comment.coid
            }).subscribe(function (res) {
                console.log(res);
                console.log(_this.comment.replies);
                //this.comment.replies.push(res.json());
                console.log(_this.comment.replies);
                _this.hideCreateCommentModal(_this.comment.coid);
                _this.refresh();
            }, function (err) { return console.log(err); });
        });
    };
    CommentComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    CommentComponent.prototype.censorship = function (inputString) {
        var outPutString = "";
        var replacementPhrases = ["is cool", "your hair is shiny", "your teeth are very hard", "love", "is awesome", "cool", "awesome", "you look like you could bear children well", "if it came down to you or another person life or death situation I would choose you",
            "is amazing", "I love you in spite of your music taste", "you could be a part time model", "I don't want to vomit when I look at you",
            "inspires me", "you inspire me", "look great today", "a smart cookie", "a perfect person", "brings honor to family", "I appreciate you *DJ Khaled Voice*"];
        //Array of bad words taken from following URL: http://codewithdesign.com/2011/05/20/php-array-of-bad-words/
        var badWords = ["quit", "horrid", "terrible", "suck", "sucks", "fuck", "shit", "ballsack", "scroutum", "hell", 'fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker',
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
    CommentComponent.prototype.refresh = function () {
        var _this = this;
        //console.log(this.comment.coid);
        this.http.get(this.URL + "/" + this.post.cid + "/" + this.post.pid + "/" + this.comment.coid).subscribe(function (res) {
            //console.log(this.comment.coid);
            //console.log(res);
            _this.comment = res.json();
            //console.log(this.comment);
            //console.log(this.replies);
            _this.replies = _this.comment.replies;
            //console.log(this.replies);
        });
    };
    CommentComponent.prototype.ngAfterViewInit = function () {
        // document ready
        $(".modal").modal();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CommentComponent.prototype, "depth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "comment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "post", void 0);
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'comment',
            template: "\n\t\t<div class=\"container\" [style.padding-left.px]=\"depth*50\">\n\t        <div class=\"card teal darken-2 white-text\">\n\t            <div class=\"card-content\">\n\t                <div class=\"row\">\n\t                    <div class=\"col s1\">\n\t                        <a (click)=\"upvote()\" class=\"white-text upvote\"><i class=\"material-icons\">keyboard_arrow_up</i></a>\n\t                        <div class=\"comment-score\">{{comment.weight}}</div>\n\t                        <a (click)=\"downvote()\" class=\"white-text downvote\"><i class=\"material-icons\">keyboard_arrow_down</i></a>\n\t                    </div>\n\t                    <div class=\"col s11 \">\n\t                        <div class=\"comment-body grey-text text-lighten-2\">\n\t                            {{comment.text}}\n\t                        </div>\n\t                        <div class=\"comment-date right\">{{comment.datetime}}</div>\n\t                        <div class=\"comment-username left\">{{comment.username}}</div>\n\t                    </div>\n\t                </div>\n\t            </div>\n\t            <div class=\"card-action\">\n\t\t\t\t\t<a (click)=\"showCreateCommentModal(comment.coid)\" class=\"blue-text text-lighten-5\">Reply</a>\n\t\t\t\t</div>\n\t        </div>\n\n\t        <div id=\"createCommentModal-{{ comment.coid }}\" style=\"z-index: 100\" class=\"modal bottom-sheet\">\n\t\t  \t<div class=\"modal-content\">\n\t\t \t \t<form class=\"col s12\">\n\t\t      \t  \t<div class=\"row\">\n\t\t        \t  \t<div class=\"input-field col s6\">\n\t\t\t\t          <textarea #textEntry id=\"createCommentBody\" class=\"materialize-textarea\"></textarea>\n\t\t\t\t          <label for=\"createCommentBody\">Comment body</label>\n\t\t\t        \t</div>\n\t\t\t        </div>\n\t\t      \t</form>\n\t\t  \t</div>\n\t\t  \t<div class=\"modal-footer\">\n\t\t      \t<a (click)=\"hideCreateCommentModal(comment.coid)\" class=\"left modal-close waves-effect waves-green btn-flat\">Close</a>\n\t\t      \t<a (click)=\"addComment(textEntry.value)\" class=\"left modal-close waves-effect waves-green btn-flat\">Submit</a>\n\t\t  \t</div>\n\t\t</div>\n\t    </div>\n\n\t    <div *ngIf=\"replies.length>0\"  class=\"postComment\">\n\t\t    <div *ngFor=\"let rep of replies\">\n\t\t\t\t<comment [comment]=\"rep\" [post]=\"post\" [depth]=\"depth+1\"></comment>\n\t\t\t</div>\n\t\t</div>\n\t    \n\t\t\n\t",
            styles: [
                "\n\t.comment-date {\n\t\tfont-size: .8em;\n\t\ttext-align: right;\n\t}\n\t.comment-username {\n\t\tfont-size: .8em;\n\t\ttext-align: left;\n\t}\n\n\t.comment-score {\n\t\ttext-align: center;\n\t\tpadding-right: .7em;\n\t}\n\n\t.card-action a {\n\t\tcursor: pointer;\n\t}\n\n\t.upvote, .downvote {\n\t\tcursor: pointer;\n\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map