
# Todo Model

## Usage

```js
var Doc = require('crdt').Doc;
var doc = new Doc();

var ToDo = require('todo-model')(doc);

var Tasks = ToDo.Tasks;

Tasks.add('get milk');

Tasks.find().forEach(function (task) {
  console.log(task.name());
});

var Lists = ToDo.Lists;
var Users = ToDo.Users;
```

## Tasks

### Tasks#find()

Returns an `Array` of all tasks currently in the document.

### Tasks#findStream()

Returns a readable `Stream` that emits already stored and newly added tasks.

### Tasks#add(name)

Add a task named `name`. Returns the task object.

### Task#name([name])

Get or set a task's `name`.

### Task#done([done])

Get or set a task's `done` state.

### Task#blockedBy([task])

Get an `Array` of tasks that block `Task` or mark `Task` as being blocked by `[task]`.

### Task#deleted([deleted])

Get or set a task's `deleted` state.

### Task#ts()

Get the timestamp of when the task was inserted.

## Lists

## Users

# License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
