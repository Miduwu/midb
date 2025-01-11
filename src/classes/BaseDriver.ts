import { BinaryLike, CipherKey } from "node:crypto";
import { join } from "path";
import crypto from "crypto";
import fs from "node:fs";
import _ from "lodash";

export abstract class BaseDriver {
    protected shards: number = 1;
    protected style: "json" | "sqlite" = "json";
    protected encrypted: boolean;

    constructor(protected path: string = "./database", private encryptionKey: string | undefined = undefined, encrypted = false, shardSize: number = 1) {
        this.shards = shardSize;
        this.encrypted = encrypted
    }

    private getValidKey(): Buffer {
        if(!this.encryptionKey) throw new Error("Encryption key is not set.");
        return crypto.createHash('sha256').update(this.encryptionKey).digest();
    }

    protected encrypt(data: string): string {
        if(!this.encryptionKey) return data;
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-ccm', this.getValidKey() as CipherKey, iv as BinaryLike, { authTagLength: 16 });
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return `ENC_${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
      }

      protected decrypt(data: string): string {
        if(!this.encryptionKey || !data.startsWith('ENC_')) return data;
        const parts = data.slice(4).split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        const decipher = crypto.createDecipheriv('aes-256-ccm', this.getValidKey() as CipherKey, iv as BinaryLike, { authTagLength: 16 });
        decipher.setAuthTag(authTag as any);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      }

    protected getHash(key: string): number {
        return parseInt(crypto.createHash('sha1').update(key).digest('hex').slice(0, 8), 16);
    }

    protected getShard(key: string): number {
        const hash = this.getHash(key);
        return hash % this.shards;
    }

    protected async readShard<R = any>(path: string): Promise<Record<string, R>> {
        if(!await this.pathExists(path)) return {};
        const content = this.encrypted ? this.decrypt(await fs.promises.readFile(path, "utf8")): await fs.promises.readFile(path, "utf8");
        return JSON.parse(content);
    }

    protected async writeShard(path: string, data: Record<string, any>): Promise<void> {
        const dirPath = join(path, "..")
        if(!(await this.pathExists(dirPath))) await fs.promises.mkdir(dirPath, { recursive: true })
        await fs.promises.writeFile(path, this.encrypted ? this.encrypt(JSON.stringify(data)): JSON.stringify(data), "utf8");
    }

    protected getLocation(table: string, key: string): string {
        const physicalShard = this.getShard(key);
        return join(table, "shard", physicalShard.toString());
    }

    async set(key: string, value: any, table: string = "main"): Promise<void> {}

    protected async pathExists(path: string): Promise<boolean> {
        try {
            await fs.promises.access(path);
            return true;
        } catch {
            return false;
        }
    }
}