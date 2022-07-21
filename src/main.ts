import { DatabaseOptions, Events } from "main";
import _ from "lodash"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { TypedEmitter } from "tiny-typed-emitter"

class Database extends TypedEmitter<Events> {
    private path: string
    tables: string[]
    constructor(options?: DatabaseOptions) {
        super()
        this.path = options?.path || '/database'
        this.tables = options?.tables ? options?.tables.concat('main'): ['main']
    }
    async set(key: string, value: any, table: string = 'main'): Promise<void> {
        if(!this.isValidTable(table)) throw new SyntaxError('MIDB: Invalid table provided in: <Database>.set()')
        let content = this.getTable(table)
        if(!content) content = {}
        _.set(content, key, value)
        this.insert(table, content)
    }
    async get(key: string, table: string = 'main'): Promise<any> {
        if(!this.isValidTable(table)) throw new SyntaxError('MIDB: Invalid table provided in: <Database>.get()')
        let content = this.getTable(table)
        if(!content) return null
        return _.get(content, key)
    }
    async delete(key: string, table: string = 'main'): Promise<void> {
        if(!this.isValidTable(table)) throw new SyntaxError('MIDB: Invalid table provided in: <Database>.delete()')
        let content = this.getTable(table)
        if(!content) return
        _.unset(content, key)
        this.insert(table, content)
    }
    async has(key: string, table: string = 'main'): Promise<boolean> {
        if(!this.isValidTable(table)) throw new SyntaxError('MIDB: Invalid table provided in: <Database>.has()')
        let v = await this.get(key, table)
        return v ? true: false
    }
    async ping(): Promise<number> {
        let before = Date.now()
        await this.get('hi')
        return Date.now() - before
    }
    getTable(name: string): Record<string, any> | null {
        if(!this.isValidTable(name)) throw new SyntaxError('MIDB: Invalid table provided in: <Database>.getTable()')
        try {
            let content = readFileSync(join(process.cwd(), this.path, 'tables', name+'.json'))
            if(!content) return null
            let parsed = JSON.parse(content.toString())
            return parsed
        } catch {
            return null
        }
    }
    private insert(name: string, data: Record<string, any>): void {
        if(!existsSync(join(process.cwd(), this.path, 'tables', name))) {
            writeFileSync(join(process.cwd(), this.path, 'tables', name +'.json'), JSON.stringify({}))
        }
        writeFileSync(join(process.cwd(), this.path, 'tables', name+'.json'), JSON.stringify(data))
    }
    private isValidTable(table: string): boolean {
        return this.tables.includes(table)
    }
    start(): void {
        if(!existsSync(join(process.cwd(), this.path))) {
            mkdirSync(join(process.cwd(), this.path))
        }
        if(!existsSync(join(process.cwd(), this.path, 'tables'))) {
            mkdirSync(join(process.cwd(), this.path, 'tables'))
        }
        // @ts-ignore
        this.emit('ready', this)
    }
}

export { Database }
export default { Database, version: require('../package.json').version }