import { Type } from "class-transformer";
import * as crypto from "crypto";

export class HBEntry {
    key: string;
    value: string;
}
export class HBBucket {
    hashedKey: string;
    
    @Type(() => HBEntry)
    entries: HBEntry[];
}
export class HBHashMap {

    @Type(() => HBBucket)
    private data: HBBucket[] = [];

    constructor() {
        this.data = [];
    }

    private hashKey(key) {
        return crypto.createHmac("sha256", key).digest("hex");
    }

    public put(key, value) {
        const entry: HBEntry = { key: key, value: value };
        const keyhash = this.hashKey(entry.key);
        /* check for existing hashed key */
        const existingBucket = this.data.find(
            (bucket: HBBucket) => bucket.hashedKey == keyhash
        );
        if (existingBucket) {
            /* safetly update bucket, handle key collision */
            const oldEntries = existingBucket?.entries.filter(
                (e: HBEntry) => e.key != entry.key
            );
            const entries = [entry,...oldEntries];
            for (const bucket of this.data) {
                if (bucket.hashedKey === keyhash) {
                    bucket.entries = entries;
                    break;
                }
            }
        } else {
            /* add new bucket */
            let newBucket: HBBucket = {
                hashedKey: keyhash,
                entries: [entry],
            };
            this.data.push(newBucket);
        }
    }

    public get(keyToFind) {
        const keyhash = this.hashKey(keyToFind);
        const bucket: HBBucket = this.data.find(
            (bucket: HBBucket) => bucket.hashedKey === keyhash
        );
        const entry: HBEntry = bucket?.entries.find(
            (entry: HBEntry) => entry.key == keyToFind
        );
        return entry?.value; //return value or undefined
    }

    public remove(keyToRemove) {
        const keyhash = this.hashKey(keyToRemove);
        const bucket: HBBucket = this.data.find(
            (bucket: HBBucket) => bucket.hashedKey === keyhash
        );
        const updatedEntries = bucket?.entries.filter(
            (entry: HBEntry) => entry.key != keyToRemove
        );
        if (!updatedEntries?.length) {
            //no more elements, delete bucket
            this.data = this.data.filter(
                (bucket: HBBucket) => bucket.hashedKey != keyhash
            );
        } else {
            for (const bucket of this.data) {
                if (bucket.hashedKey === keyhash) {
                    bucket.entries = updatedEntries;
                    break;
                }
            }
        }
    }

    public clear() {
        this.data = [];
    }
}
