var express = require("express");
var router = express.Router();
//let polls = require("../data/polls.json");

router.post("/create", function(req, res, next) {
    var token = req.body['token'];
    res.send(pollCreate(token));
});

router.post("/submit", function(req, res, next) {
    var token = req.body['token'];
    res.send("???"); //make visible
});

router.put("/cancel", function(req, res, next) {
    var token = req.body['token'];
    var pollID = req.body['pollID'];
    res.send("API is working");
});

router.post("/options/add", function(req, res, next) {
    var token = req.body['token'];
    var pollID = req.body['pollID'];
    var option = req.body['option'];
    res.send(pollAddOption(token, pollID, option));
});

router.delete("/options/remove", function(req, res, next) {
    var token = req.body['token'];
    var pollID = req.body['pollID'];
    var option = req.body['option'];
    res.send(pollRemoveOption(token, pollID, option));
});

router.get("/get/:token", function(req, res, next) {
    var token = req.params['token'];
    console.log(token);
    res.send(pollGet(token));
});

router.get("/feedback", function(req, res, next) {
    res.send("???");
});



//checks whether the user can create a poll
function pollCreate(token) {
    //check if user is authorised
    var user = findUser(token);
    if (user == null) {
        return -1;
    }
    console.log(user);

    let polls = require('../data/polls.json');
    var pollID = polls.length;

    poll = {
        "pollID": pollID,
        "userID": user['userID'],
        "visible": false,
        "question": "",
        "multipleChoice": true,
        "correct": 0,
        "options": [],
        "answers": [],
        "detailedAnswers": []
    }

    polls.push(poll);

    return pollID;
}

//pollCreate('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu');

function pollAddOption(token, pollID, option) {
    //check if user is authorised for poll
    var poll = findPoll(pollID);
    if (pollID == {}) {
        return false;
    }

    var options = pollGetParam(token, pollID, 'options')
    options.push(option);

    return true;
}

function pollRemoveOption(token, pollID, option) {
    //check if user is authorised for poll
    var poll = findPoll(pollID);
    if (pollID == {}) {
        return false;
    }

    var options = pollGetParam(token, pollID, 'options')
    const target = options.indexOf(option);
    if (target > -1) {
        options.splice(target, 1);
    } else {
        return false;
    }

    return true;
}


//general setter/getter

function pollSetParam(token, pollID, param, value) {
    //check if user is authorised for poll
    var poll = findPoll(pollID);
    if (pollID == {}) {
        return false;
    }

    poll[param] = value;
    return true;
}

function pollGetParam(token, pollID, param) {
    //check if user is authorised for poll
    var poll = findPoll(pollID);
    if (pollID == {}) {
        return false;
    }

    return poll[param];
}


function pollAnswer(token, pollID, response) {
    //
}

function revealAnswer(token, pollID) {
    var user = getUser(token);
    if (user == null) {
        return false;
    }

    var poll = getPoll(pollID);
    if (poll == null) {
        return false;
    }

    if (poll['userID'] != user['userID']) {
        return false;
    }

    poll['revealed'] = true;
    return true;
}

function pollGet(token) {
    var user = findUser(token);
    if (user == null) {
        return "";
    }

    return require('../data/polls.json');
}



//helper
function findPoll(pollID) {
    let polls = require('../data/polls.json');

    for (var poll in polls) {
        if(polls[poll]['pollID'] === pollID) {
            return polls[poll];
        }
    }

    return null;
}


function findUser(token) {
    let users = require('../data/users.json');

    for (var user in users) {
        if(users[user]['token'] === token) {
            return users[user];
        }
    }

    return null;
}

function findUserByPhone(phone) {
    let users = require('../data/users.json');

    for (var user in users) {
        if(users[user]['phone'] === phone) {
            return users[user];
        }
    }

    return null;
}


/*

var pollID = pollCreate('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu');
pollSetParam('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, 'question', "Uganda?");
pollAddOption('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, "Uganda");
pollAddOption('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, "gheuiowq");
pollAddOption('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, "Ugrhui");

pollRemoveOption('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, "gheuiowq");

//submit
pollSetParam('fheuiwbfuyiob2iuyovbn j4k3;wnuidpbu', pollID, 'visible', true);


console.log(findPoll(pollID));
*/

module.exports = router;