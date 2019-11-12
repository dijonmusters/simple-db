# Simpled DB

A promise-based wrapper for indexeddb with a simplified API. Think localStorage but for object storage!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

You will need to download Node.js by visiting their ![downloads](https://nodejs.org/en/) page and following their installaion instructions.

### Installing

Use npm to install the package.

```
npm i simpled-db
```

Import package in ES6 project.

```
import db from 'simpled-db';
```

#### Using Promises

**Write data to db**

```
set('db-name', 'key', data)
```

Example

```
const todo = {
  title: 'Learn how to use simple-db',
  description: 'Follow the instructions to learn how to use simple-db',
  isComplete: false
};

db.set('todos', 'learn', todo)
  .then(() => console.log('successfully saved todo in db'));
```

**Get todo from db**

```
get('db-name', 'key')
```

Example

```
db.get('todos', 'learn')
  .then(todo => console.log(todo));
```

**Get all todos from db**

```
get('db-name')
```

Example

```
db.get('todos')
  .then(todos => console.log(todos));
```

**Remove todo from db**

```
remove('db-name', 'key')
```

Example

```
db.remove('todos', 'learn')
  .then(() => console.log('Removed todo from db'));
```

**Remove all todos from db**

```
clear('db-name')
```

Example

```
db.clear('todos')
  .then(() => console.log('Removed all todos from db'));
```

#### Using Async/Await

**Write data to db**

```
set('db-name', 'key', data)
```

Example

```
const todo = {
  title: 'Learn how to use simple-db',
  description: 'Follow the instructions to learn how to use simple-db',
  isComplete: false
};

await db.set('todos', 'learn', todo);
console.log('successfully saved todo in db');
```

**Get todo from db**

```
get('db-name', 'key')
```

Example

```
const todo = await db.get('todos', 'learn');
console.log(todo);
```

**Get all todos from db**

```
get('db-name')
```

Example

```
const todos = await db.get('todos');
console.log(todos);
```

**Remove todo from db**

```
remove('db-name', 'key')
```

Example

```
await db.remove('todos', 'learn')
console.log('Removed todo from db');
```

**Remove all todos from db**

```
clear('db-name')
```

Example

```
await db.clear('todos');
console.log('Removed all todos from db');
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

**Jon Meyers** - [dijonmusters](https://github.com/dijonmusters)

## License

This project is licensed under the MIT License.
