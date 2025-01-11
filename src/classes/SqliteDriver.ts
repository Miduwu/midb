import * as fs from "fs";
import { dirname } from "path";
import { BaseDriver } from "./BaseDriver";
import sqlite3 from "better-sqlite3";

interface Row {
    key: string
    value: string;
}


export class SqliteDriver extends BaseDriver {
    private db: sqlite3.Database;
    protected override style: "json" | "sqlite" = "sqlite";

    constructor(path: string, encrypted = false, encryptionKey?: string) {
        super(path, encryptionKey, encrypted);
        const dir = dirname(path);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        this.db = new sqlite3(path);
        this.setupTables();
    }

    private setupTables() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS kv (
                key TEXT PRIMARY KEY,
                value TEXT,
                table_name TEXT
            );
        `);
    }

    async set<V = unknown>(key: string, value: V, table: string = "main"): Promise<V> {
        const valueStr = this.encrypted ? this.encrypt(JSON.stringify(value)): JSON.stringify(value)
        const stmt = this.db.prepare(`
            INSERT OR REPLACE INTO kv (key, value, table_name)
            VALUES (?, ?, ?);
        `);
        stmt.run(key, valueStr, table);
        return value
    }

    async get<T = unknown>(key: string, table: string = "main"): Promise<T | null> {
        const stmt = this.db.prepare(`
            SELECT value FROM kv
            WHERE key = ? AND table_name = ?;
        `);
        const row = stmt.get(key, table) as Row | undefined;
        return row ? JSON.parse(this.encrypted ? this.decrypt(row.value): row.value): null
    }

    async delete(key: string, table: string = "main"): Promise<void> {
        const stmt = this.db.prepare(`
            DELETE FROM kv
            WHERE key = ? AND table_name = ?;
        `);
        stmt.run(key, table);
    }

    async getTable<V = unknown>(table: string): Promise<Record<string, V>> {
        const stmt = this.db.prepare(`
            SELECT key, value FROM kv
            WHERE table_name = ?;
        `);
        const rows = stmt.all(table) as Row[];
        const data: Record<string, any> = {};
        for (const row of rows) {
            data[row.key] = JSON.parse(this.encrypted ? this.decrypt(row.value): row.value);
        }
        return data;
    }

    async setTable(table: string, data: Record<string, any>): Promise<void> {
        const stmt = this.db.prepare(`
            INSERT OR REPLACE INTO kv (key, value, table_name)
            VALUES (?, ?, ?);
        `);
        for(const key of Object.keys(data)) {
            const valueStr = this.encrypted ? this.encrypt(JSON.stringify(data[key])): JSON.stringify(data[key]);
            stmt.run(key, valueStr, table);
        }
    }
}
