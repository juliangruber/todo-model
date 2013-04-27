var debug = require('debug')('task');

module.exports = Tasks;

/**
 * Tasks Manager.
 */

function Tasks (doc) {
  if (!(this instanceof Tasks)) return new Tasks(doc);
  this.set = doc.createSet('type', 'task');
  this.doc = doc;
}

/**
 * Get all tasks.
 *
 * @return {Array[Task]}
 */

Tasks.prototype.find = function () {
  var self = this;
  return self.set.asArray().map(function (row) {
    return Task(row, self.set);
  });
}

/**
 * Add a task.
 *
 * @param {String} name
 * @return {Task}
 */

Tasks.prototype.add = function (name) {
  debug('add: %s', name);

  return Task(this.doc.add({
    type : 'task',
    name : name
  }), this.set);
}

/**
 * Task model.
 *
 * @param {Object} row
 * @param {Set} set
 * @return {Task}
 */

function Task (row, set) {
  if (!(this instanceof Task)) return new Task(row, set);
  if (row._row) return row; // already Task

  this._row = row;
  this._set = set;
  this._id = row.id;
}

/**
 * Get/Set name.
 *
 * @param {String=} name
 * @return {Task|String} name
 */

Task.prototype.name = function (name) {
  if (!arguments.length) return this._row.get('name');
  this._row.set('name', name);
  return this;
};

/**
 * Get/Set done state.
 *
 * @param {Boolean=} done
 * @return {Boolean|Task}
 */

Task.prototype.done = function (done) {
  if (!arguments.length) return this._row.get('done');

  debug('done: %s', this._row.get('name'));
  this._row.set('done', true);
  return this;
}

/**
 * Get/Set blocking tasks.
 *
 * @param {Task=} task
 * @return {Array[Task]|Task}
 */

Task.prototype.blockedBy = function (task) {
  var self = this;

  if (!task) return (self._row.get('blocked-by') || []).map(function (id) {
    return Task(self._set.get(id), self._set);
  });

  var blockedBy = this._row.get('blocked-by') || [];
  blockedBy.push(task._id || task);
  this._row.set('blocked-by', blockedBy);
  return this;
};

/**
 * Get/Set deleted state.
 *
 * @param {Boolean=} deleted
 * @return {Task|Boolean}
 */

Task.prototype.deleted = function (deleted) {
  if (!arguments.length) return this._row.get('deleted');

  debug('delete: %s', this._row.get('name'));
  this._row.set('deleted', true);
  this._set.remove(this._row);
  return this;
};
