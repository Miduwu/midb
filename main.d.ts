import { TypedEmitter } from "tiny-typed-emitter"

export interface DatabaseOptions {
    path?: string
    tables?: string[]
}

export interface Events {
    ready: (db: Database) => any;
}

export class Database extends TypedEmitter<Events> {
    constructor(options: DatabaseOptions)
    async set(key: string, value: any, table?: string): Promise<void>;
    async get(key: string, table?: string): Promise<any>
    async delete(key: string, table?: string): Promise<void>
    async has(key: string, table?: string): Promise<boolean>
    async ping(): Promise<number>
    getTable(name: string): Record<string, any> | null
    private instert(name: string, data: Record<string, any>): void
    private isValidTable(table: string): boolean
    start(): void
}