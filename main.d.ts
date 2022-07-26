import { TypedEmitter } from "tiny-typed-emitter"

export interface DatabaseOptions {
    path?: string
    tables?: string[]
}

export interface Events {
    ready: (db: Database) => any;
}

export class Database extends TypedEmitter<Events> {
    constructor(options?: DatabaseOptions)
    set(key: string, value: any, table?: string): Promise<void>;
    get(key: string, table?: string): Promise<any>
    delete(key: string, table?: string): Promise<void>
    push(key: string, value: any, table?: string): Promise<void>
    remove(key: string, value: any, table?: string): Promise<void>
    add(key: string, value: number, table?: string): Promise<void>
    sub(key: string, value: number, table?: string): Promise<void>
    has(key: string, table?: string): Promise<boolean>
    ping(): Promise<number>
    getTable(name: string): Record<string, any> | null
    private instert(name: string, data: Record<string, any>): void
    private isValidTable(table: string): boolean
    start(): void
}