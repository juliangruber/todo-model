var debug = require('debug')('Task');

module.exports = function (doc) {
  return new Task(doc);
};

function Task (doc) {
  this.doc = doc;
  this.set = doc.createSet('type', 'task');
}

Task.prototype.find = function () {
  return this.set.asArray().map(this.wrap.bind(this));
}

Task.prototype.add = function (name) {
  debug('add', name);

  return this.wrap(this.doc.add({
    type : 'task',
    name : name
  }));
}

Task.prototype.wrap = function (row) {
  var set = this.set;
  var wrap = this.wrap.bind(this);

  if (row.row) return row;
  if (typeof row == 'number' || typeof row == 'string') {
    row = set.get(row);
  }

  var task = {};

  task.done = function () {
    debug('done', row.get('name'));
    row.set('done', true);
    return task;
  };

  task.isDone = row.get.bind(row, 'done');

  task.delete = function () {
    debug('delete', row.get('name'));
    row.set('deleted', true);
    set.remove(row);
    return task;
  };

  task.isDeleted = row.get.bind(row, 'deleted');

  task.isBlocked = function () {
    return !! task.blockedBy().length;
  }

  task.blockedBy = function (_task) {
    if (!_task) return (row.get('blocked-by') || []).map(wrap);

    var blockedBy = row.get('blocked-by') || [];
    blockedBy.push(task.id || task);
    row.set('blocked-by', blockedBy);
    return task;
  };

  task.name = row.get.bind(row, 'name');

  task.row = row;
  task.id = row.id;

  return task;
}

