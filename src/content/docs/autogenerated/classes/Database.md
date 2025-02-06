---
title: Database
description: No description provided
---


## Database extends TypedEmitter\<DatabaseEvents>


```typescript
new Database(options)
```
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| options | DatabaseOptions | ❌ |


## Properties
### public static defaultMaxListeners: any


## Methods
### public addListener(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public assign(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | Record\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | any> | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L128)
### public delete(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L70)
### public div(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L93)
### public emit(event, args): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| args | Parameters\<DatabaseEvents\[ | U | ]> | ❌ |
### public eventNames(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<U>

### public get(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<null | T>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L66)
### public getMaxListeners(): [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### public listenerCount(type): [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| type | 'expires' | ❌ |
### public listeners(type): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DatabaseEvents\[ | U | ]>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| type | U | ❌ |
### public multi(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L87)
### public off(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public on(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public once(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public pop(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L107)
### public prependListener(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public prependOnceListener(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public push(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | any | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L100)
### public rawListeners(type): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DatabaseEvents\[ | U | ]>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| type | U | ❌ |
### public removeAllListeners(event?): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | 'expires' | ✅ |
### public removeListener(event, listener): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| event | U | ❌ |
| listener | DatabaseEvents\[ | U | ] | ❌ |
### public removeTimeout(timeout): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<Record\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Timeout](https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout)>>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| timeout | [Timeout](https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L158)
### public set(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<V>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | unknown | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L62)
### public setMaxListeners(n): this
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| n | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | ❌ |
### public shift(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L114)
### public start(): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L170)
### public sub(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L81)
### public sum(key, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L75)
### public timeout(key, value, options): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | unknown | ❌ |
| options | TimeoutOptions | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L140)
### public unset(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L134)
### public without(key, value, table): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| key | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |
| value | any | ❌ |
| table | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌ |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L121)