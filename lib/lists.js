var debug = require('debug')('Lists');

module.exports = Lists;

function Lists (doc) {
  this.set = doc.createSet('type', 'list');
  this.doc = doc;
}

Lists.prototype.find = function () {
  return this.set.asArray().map(List);
}

Lists.prototype.add = function (name) {
  debug('add', name);

  return list(this.set)(this.doc.add({
    type : 'list',
    name : name
  }));
}

function List (row) {
  if (!(this instanceof List)) return new List(row);
  this.row = row;
}

List.prototype.delete = function () {
  debug('delete: %s', this.row.get('name'));
  this.row.set('deleted', true);
  this.set.remove(row);
  return row;
}
