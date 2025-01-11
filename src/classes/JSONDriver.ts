import { BaseDriver } from "./BaseDriver";
import { join } from "path";
import _ from "lodash";
import fs from "fs";

export class JSONDriver extends BaseDriver {

    constructor(path: string, shards: number = 1, encrypted = false, encryptionKey?: string) {
        super(path, encryptionKey, encrypted, shards);
        this._loadDir()
    }

    private async _loadDir() {
        if(!this.pathExists(join(process.cwd(), this.path))) {
            await fs.promises.mkdir(join(process.cwd(), this.path))
        }
    }

    private _useExtension(name: string) {
        return this.encrypted ? `${name}.txt`: `${name}.json`
    }

    private async assignShardToFiles(dir: string): Promise<void> {
        const files = await fs.promises.readdir(dir)
        for(const file of files) {
            if(((await fs.promises.lstat(join(dir, file))).isDirectory())) return await this.assignShardToFiles(join(dir, file));
            const data = await this.readShard<Record<string, any>>(join(dir, file))
            for(const key of Object.keys(data)) {
                let table = join(dir, file, "..")
                await this.set(key, data[key], table)
            }
            await fs.promises.rm(join(dir, file))
        }
    }
    
    async migrate(table?: string): Promise<void> {
        let dir = table ? join(this.path, table): this.path
        console.log("Starting shards migration...")
        let time = Date.now()
        if(this.style == "json") await this.assignShardToFiles(dir)
        console.log(`Shards migration finished in ${(Date.now() - time) / 1000} seconds.`)
    }

    async set<V = unknown>(key: string, value: V, table: string = "main"): Promise<V> {
        const loc = this.getLocation(table, key);
        const shardPath = join(this.path, this._useExtension(loc));
        let data = await this.readShard(shardPath);
        _.set(data, key, value);
        await this.writeShard(shardPath, data);
        return value
    }

    async get<T = any>(key: string, table: string = "main"): Promise<T | null> {
        const loc = this.getLocation(table, key);
        const shardPath = join(this.path,  this._useExtension(loc));
        const data = await this.readShard(shardPath);
        return _.get(data, key, null);
    }

    async delete(key: string, table: string = "main"): Promise<void> {
        const loc = this.getLocation(table, key);
        const shardPath = join(this.path,  this._useExtension(loc));
        let data = await this.readShard(shardPath);
        _.unset(data, key);
        await this.writeShard(shardPath, data);
    }

    async getTable<V = unknown>(table: string): Promise<Record<string, V>> {
        try {
            const dir = join(this.path, table)
            const files = await fs.promises.readdir(dir).catch(e=>null)
            if(!files) return {}
            let data: Record<string, any> = {}
            for(const file of files) {
                const content = await this.readShard<Record<string, any>>(join(dir, file))
                data = { ...data, ...content }
            }
            return data
        } catch {
            return {}
        }
    }

    async setTable(table: string, data: Record<string, any>): Promise<void> {
        const dir = join(this.path, table)
        if(await this.pathExists(dir)) await fs.promises.rm(dir, { recursive: true })

        for(const key of Object.keys(data)) {
            await this.set(key, data[key], table)
        }
    }
}