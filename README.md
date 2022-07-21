# midb
Perfect tables-based database made for you! <3

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

db.start()
```

### Methods
**Set:** `db.set(key: string, value: string: table?: string): Promise<void>`

**Get:** `db.get(key: string, table?: string): Promise<any>`

**Delete:** `db.delete(key: string, table?: string)`

**Has:** `db.has(key: string, table?: string): Promise<boolean>`

**Ping:** `db.ping(): Promise<number>`

**All:** `db.getTable(name: string): Record<string, any> | null`
