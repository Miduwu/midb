# midb
Perfect tables-based database made for you! <3

- [**Methods:**](#methods)
* [Set](#set)
* [Get](#get)
* [Push](#push)
* [Remove](#remove)
* [Add](#add)
* [Sub](#sub)
* [Has](#has)
* [Delete](#delete)
* [Ping](#ping)
* [Get table](#get-table)
* [Start](#start)

## Install:
```
npm i midb
```

## Setup:
```js
import { Database } from "midb";

const db = new Database({
    path: './database',
    tables: ['main']
})

db.on('ready', () => {
    console.log('Database is connected.')
})

db.start() // let's start the class
```

## Methods

### Set
Add or re-set something to the database.

- **Usage:** `<Database>.set(key: string, value: any, table?: string): Promise<void>`

- **Example:**
```js
// ...
(async() => {
    await db.set('foo', 'bar')
    await db.set('collection.admin', 'Mid', 'Users') // add 'Users' table to the constructor
})()
// ...
```

### Get
Get something from the database.

- **Usage:** `<Database>.get(key: string, table?: string): Promise<any>`

- **Example:**
```js
// ...
(async() => {
    db.get('foo').then(console.log) // 'bar'
    db.get('collection', 'Users').then(console.log()) // { "admin": "Mid" }
})()
// ...
```

### Push
Add a new element to an array in the database.

- **Usage:** `<Database>.push(key: string, value: any, table?: string): Promise<void>`

- **Example:**
```js
// ...
(async() => {
    await db.push('foods', 'apple')
    await db.push('foods', 'banana')
    // lets get all:
    db.get('foods').then(console.log) // ['apple', 'banana']
})()
// ...
```

### Remove
Remove an element from an array in the database.

- **Usage:** `<Database>.remove(key: string, value: any, table?: string): Promise<void>`

- **Example:**
```js
// ...
(async() => {
    // before:
    db.get('foods').then(console.log) // ['apple', 'banana']
    // lets remove apple:
    await db.remove('foods', 'apple')
    // after:
    db.get('foods').then(console.log) // ['banana']
})()
// ...
```

### Add
Add some amount to a number in the database.

- **Usage:** `<Database>.add(key: string, value: number, table?: string): Promise<void>`

- **Example:**
```js
(async() => {
    await db.add('participants', 5, 'Polls') // add 'Polls' table to the constructor
    db.get('participants', 'Polls').then(console.log) // 5
    await db.add('participants', 10, 'Polls')
    db.get('participants', 'Polls').then(console.log) // 15
})()
```

### Sub
Sub some amount from a number in the database.

- **Usage:** `<Database>.sub(key: string, value: number, table?: string): Promise<void>`

- **Example:**
```js
(async() => {
    db.get('participants', 'Polls').then(console.log) // 15
    await db.sub('participants', 5, 'Polls')
    db.get('participants', 'Polls').then(console.log) // 10
})()
```

### Has
Check if the database has a key value.

- **Usage:** `<Database>.has(key: string, table?: string): Promise<boolean>`

- **Example:**
```js
(async() => {
    await db.set('myobject', { "a": 1, "b": 2 })
    db.has('myobject.b').then(console.log) // true
    db.has('myobject.c').then(console.log) // false
})()
```

### Delete
Delete something from the database.

- **Usage:** `<Database>.delete(key: string, table?: string): Promise<void>`

- **Example:**
```js
(async() => {
    await db.set('test', { "foo" true, "bar": "sup" })
    db.get('test').then(console.log) // { "foo": true, "bar": "sup" }
    await db.delete('test.bar')
    db.get('test').then(console.log) // { "foo": true }
})()
```

### Ping
Check the database latency (miliseconds).

- **Usage:** `<Database>.ping(): Promise<number>`

- **Example:**
```js
(async() => {
    let ping = await db.ping()
    console.log(ping) // 5, so 5 miliseconds
})()
```

### Get table
Get a table object (like all).

- **Usage:** `<Database>.getTable(name: string): Record<string, any> | null`

- **Example:**
```js
(async() => {
    let all = db.getTable('main')
    console.log(all) // { full Object }
})()
```

### Start
Starts the database (very important).

- **Usage:** `<Database>.start()`

- **Exmaple:**
```js
import { Database } from "midb";

const db = new Database()

db.start() // now we can use our midb database :)
```