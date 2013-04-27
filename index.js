var Tasks = require('./lib/tasks');
var Lists = require('./lib/lists');
var Users = require('./lib/users');

module.exports = function (doc) {
  return {
    Tasks : Tasks(doc),
    Lists : Lists(doc),
    Users : Users(doc)
  };
};
