function findUser(token) {
    let users = require('../data/users.json');

    for (var user in users) {
        if(users[user]['token'] == token) {
            return users[user];
        }
    }

    return {};
}

function findUserByEmail(email) {
    let users = require('../data/users.json');

    for (var user in users) {
        if(users[user]['email'] == email) {
            return users[user];
        }
    }

    return null;
}

function findPoll(pollID) {
    let polls = require('../data/polls.json');

    for (var poll in polls) {
        if(polls[poll]['pollID'] == pollID) {
            return polls[poll];
        }
    }

    return {};
}