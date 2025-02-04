import { SqliteDriver } from "./classes/SqliteDriver";
import { JSONDriver } from "./classes/JSONDriver";
import { TypedEmitter } from "tiny-typed-emitter";
import _ from "lodash";

export type DatabaseFormat = "sqlite" | "json"

export interface DatabaseOptions {
    /**
     * The directory where the data will be saved
     */
    path: string
    /**
     * The shards number (Unavailable in SQL format)
     */
    shards?: number;
    /**
     * The database format (json or sqlite)
     */
    format: DatabaseFormat
    /**
     * If the data have to be encrypted (you have to set an encryption key)
     */
    encrypt?: boolean;
    /**
     * The permanent encryption key (you can't change it after you start to use the database)
     */
    encryptionKey?: string;
}

export interface TimeoutOptions {
    time: number
    id?: string
    restore?: boolean
}

export interface Timeout {
    key: string
    restore: boolean
    value: any
    idUsed: string
    expiresAt: number
}

export interface DatabaseEvents {
    expires: (timeout: Timeout) => void
}

export class Database extends TypedEmitter<DatabaseEvents> {
    private driver: SqliteDriver | JSONDriver;
    constructor(options: DatabaseOptions) {
        super()
        if(!options) throw new SyntaxError("MIDB: You must provide the database options")
        if(typeof options.path !== "string") throw new SyntaxError("MIDB: You must provide a valid path option")
        if(options.encrypt && !options.encryptionKey) throw new SyntaxError("MIDB: To use encryption mode, you must provide an encryption key")
        if(options.shards && typeof options.shards !== "number") throw new SyntaxError("MIDB: You must provide a valid shards number")
        if(options.format === "json") this.driver = new JSONDriver(options.path, options.shards, options.encrypt, options.encryptionKey)
        else if(options.format === "sqlite") this.driver = new SqliteDriver(options.path, options.encrypt, options.encryptionKey)
        else throw new SyntaxError("MIDB: Invalid database format")
    }

    async set<V = unknown>(key: string, value: unknown, table: string = "main"): Promise<V> {
        return await this.driver.set(key, value, table) as V;
    }

    async get<T = unknown>(key: string, table: string = "main"): Promise<T | null> {
        return await this.driver.get(key, table).catch(e=>null) as T
    }

    async delete(key: string, table: string = "main"): Promise<void> {
        return await this.driver.delete(key, table)
    }

    // numbers
    async sum(key: string, table: string = "main"): Promise<void> {
        let data = await this.get<number>(key, table) || 0
        if(isNaN(data)) throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, data + 1, table)
    }

    async sub(key: string, table: string = "main"): Promise<void> {
        let data = await this.get<number>(key, table) || 0
        if(isNaN(data)) throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, data - 1, table)
    }

    async multi(key: string, value: number, table: string = "main"): Promise<void> {
        let data = await this.get<number>(key, table) || 0
        if(isNaN(data)) throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, data * value, table)
    }

    async div(key: string, value: number, table: string = "main"): Promise<void> {
        let data = await this.get<number>(key, table) || 0
        if(isNaN(data)) throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, data / value, table)
    }

    // arrays
    async push(key: string, value: any, table: string = "main"): Promise<void> {
        let data = await this.get<any[]>(key, table) || []
        if(!Array.isArray(data)) throw new SyntaxError("MIDB: Invalid data type")
        data.push(value)
        return await this.set(key, data, table)
    }

    async pop(key: string, table: string = "main"): Promise<void> {
        let data = await this.get<any[]>(key, table) || []
        if(!Array.isArray(data)) throw new SyntaxError("MIDB: Invalid data type")
        data.pop()
        return await this.set(key, data, table)
    }

    async shift(key: string, table: string = "main"): Promise<void> {
        let data = await this.get<any[]>(key, table) || []
        if(!Array.isArray(data)) throw new SyntaxError("MIDB: Invalid data type")
        data.shift()
        return await this.set(key, data, table)
    }

    async without(key: string, value: any, table: string = "main"): Promise<void> {
        let data = await this.get<any[]>(key, table) || []
        if(!Array.isArray(data)) throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, _.without(data, value), table)
    }

    // objects
    async assign(key: string, value: Record<string, any>, table: string = "main"): Promise<void> {
        let data = await this.get<Record<string, any>>(key, table) || {}
        if(typeof data !== "object") throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, {...data, ...value}, table)
    }

    async unset(key: string, value: string, table: string = "main"): Promise<void> {
        let data = await this.get<Record<string, any>>(key, table) || {}
        if(typeof data !== "object") throw new SyntaxError("MIDB: Invalid data type")
        return await this.set(key, _.omit(data, value), table)
    }

    async timeout(key: string, value: unknown, options: TimeoutOptions): Promise<string> {
        let timeouts = await this.driver.getTable<Timeout>("timeouts")
        if(!timeouts) timeouts = {}
        const uniqueId = Date.now().toString(16) + Math.floor(Math.random() * 999999).toString(16)
        timeouts[uniqueId] = {
            key,
            expiresAt: Date.now() + options.time,
            restore: options.restore || true,
            value,
            idUsed: uniqueId, 
        }
        await this.driver.setTable("timeouts", timeouts)
        setTimeout(async() => {
            await this.expireNow(timeouts[uniqueId])
        }, options.time)
        return uniqueId
    }

    async removeTimeout(timeout: Timeout) {
        let timeouts = await this.driver.getTable<Timeout>("timeouts")
        timeouts = _.omit(timeouts, timeout.idUsed)
        await this.driver.setTable("timeouts", timeouts)
        return timeouts
    }

    private async expireNow(timeout: Timeout, cancelEmit = false) {
        await this.removeTimeout(timeout)
        if(!cancelEmit) this.emit("expires", timeout)
    }

    async start() {
        let timeouts = await this.driver.getTable<Timeout>("timeouts")
        for(const timeout of Object.keys(timeouts)) {
            let data = timeouts[timeout]
            if(data.expiresAt <= Date.now()) {
                await this.expireNow(data, !data.restore)
            } else {
                setTimeout(async () => {
                    await this.expireNow(data)
                }, data.expiresAt - Date.now())
            }
        }
    }
}