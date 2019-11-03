# Simple DB

A promise-based wrapper for indexeddb with a simplified API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

You will need to download Node.js by visiting their ![downloads](https://nodejs.org/en/) page and following their installaion instructions.

### Installing

Use npm to install the package.

```
npm i simple-db
```

Import functions from package.

```
import { set, get, remove, clear } from 'simple-db';
```

#### Using Promises

Create some data and write to db.

```
const todo = {
  title: 'Learn how to use simple-db',
  description: 'Follow the instructions to learn how to use simple-db',
  isComplete: false
};

// set('db-name', 'key', data)

set('todos', 'learn', todo)
  .then(() => console.log('successfully saved todo in db'));
```

Get todo from db.

```
// get('db-name', 'key')

get('todos', 'learn')
  .then(todo => console.log(todo));
```

Get all todos from db.

```
get('todos')
  .then(todos => console.log(todo));
```

Remove todo from db.

```
// remove('db-name', 'key')

remove('todos', 'learn')
  .then(() => console.log('Removed todo from db'));
```

Remove all todos from db.

```
// clear('db-name')

clear('todos')
  .then(() => console.log('Removed all todos from db'));
```

#### Using Async/Await

Create some data and write to db.

```
const todo = {
  title: 'Learn how to use simple-db',
  description: 'Follow the instructions to learn how to use simple-db',
  isComplete: false
};

// set('db-name', 'key', data)

await set('todos', 'learn', todo);
console.log('successfully saved todo in db');
```

Get todo from db.

```
import { get } from 'simple-db';

// get('db-name', 'key')

const todo = await get('todos', 'learn');
console.log(todo);
```

Get all todos from db.

```
const todos = await get('todos');
console.log(todos);
```

Remove todo from db.

```
// remove('db-name', 'key')

await remove('todos', 'learn')
console.log('Removed todo from db');
```

Remove all todos from db.

```
// clear('db-name')

await clear('todos');
console.log('Removed all todos from db');
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Jon Meyers** - [dijonmusters](https://github.com/dijonmusters)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
