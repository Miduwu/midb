---
title: DatabaseOptions
description: No description provided
---

## DatabaseOptions

| Property | Type | Value | Description |
| ----------- | ----------- | ----------- | ----------- |
| encrypt | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A | If the data have to be encrypted (you have to set an encryption key) |
| encryptionKey | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A | The permanent encryption key (you can't change it after you start to use the database) |
| format | DatabaseFormat | N/A | The database format (json or sqlite) |
| path | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A | The directory where the data will be saved |
| shards | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | N/A | The shards number (Unavailable in SQL format) |


- [Source](https://github.com/Miduwu/midb/blob/d89b7d0a8f618ac2307fcf705b94c24b1766e1ce/src/main.ts#L8)