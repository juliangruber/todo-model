var tape  = require('tape');
var Doc  = require('crdt').Doc;

function test (name, fn) {
  tape(name, function (t) {
    fn(t, require('../lib/tasks')(new Doc()));
  });
}

test('Tasks.find()', function (t, Tasks) {
  var tasks = Tasks.find();
  t.deepEqual(tasks, [], 'initially empty');
  Tasks.add('foo');
  t.deepEqual(tasks, [], 'immutable');

  tasks = Tasks.find();
  t.equal(tasks.length, 1, 'one task');
  t.equal(tasks[0].name(), 'foo', 'wrapped');
  
  t.end();
});

test('Tasks.add(name)', function (t, Tasks) {
  Tasks.add('foo');
  tasks = Tasks.find();
  t.equal(tasks.length, 1, 'one task');
  t.equal(tasks[0].name(), 'foo', 'wrapped');
  t.end();
});

test('task.done(bool)', function (t, Tasks) {
  var task = Tasks.add('foo');
  t.equal(task.done(true), task, 'same reference');
  t.ok(task.done(), 'done');
  t.end();
});

test('task.done()', function (t, Tasks) {
  var task = Tasks.add('foo');
  t.notOk(task.done(), 'not done');
  task.done(true);
  t.ok(task.done(), 'done');
  t.end();
});

test('task.deleted(bool)', function (t, Tasks) {
  var task = Tasks.add('foo');
  task.deleted(true);
  t.ok(task.deleted(), 'marked as deleted');
  t.deepEqual(Tasks.find(), [], 'deleted from doc');
  t.end();
});

test('task.deleted()', function (t, Tasks) {
  var task = Tasks.add('foo');
  t.notOk(task.deleted(), 'not deleted');
  task.deleted(true);
  t.ok(task.deleted(), 'deleted');
  t.end();
});

test('task.blockedBy(task)', function (t, Tasks) {
  var task = Tasks.add('foo');
  t.deepEqual(task.blockedBy(), [], 'not blocked');
  task.blockedBy(task);
  t.deepEqual(task.blockedBy()[0]._id, task._id, 'blocked');
  t.end();
});

test('task.blockedBy(id)', function (t, Tasks) {
  var task = Tasks.add('foo');
  task.blockedBy(task._id);
  t.equal(task.blockedBy()[0]._id, task._id, 'blocked');
  task.blockedBy(task._id);
  t.equal(task.blockedBy()[1]._id, task._id, 'blocked');
  t.end();
});

test('task.blockedBy()', function (t, Tasks) {
  var task = Tasks.add('foo');
  t.deepEqual(task.blockedBy(), [], 'not blocked');
  task.blockedBy(task);
  t.equal(task.blockedBy()[0]._id, task._id, 'blocked');
  t.end();
});

test('task.name(name)', function (t, Tasks) {
  var task = Tasks.add('foo');
  task.name('bar');
  t.equal(task.name(), 'bar', 'name set');
  t.end();
});

test('task.name()', function (t, Tasks) {
  t.equal(Tasks.add('foo').name(), 'foo', 'name set');
  t.end();
});
