import { UUID, randomUUID } from "crypto";

export class Guid {
    private readonly _value: UUID;

    private constructor(uuid: UUID) {
        this._value = uuid;
    }

    public get value(): UUID {
        return this._value;
    }

    public static newGuid(): Guid {
        return new Guid(randomUUID()); 
    }

    public static get empty(): Guid {
        return new Guid('00000000-0000-0000-0000-000000000000')
    }

    public static parse(uuid: string): Guid {
        if (!this.isValid(uuid)) {
            throw new Error('Invalid UUID format');
        }
        return new Guid(uuid as UUID);
    }

    public static tryParse(uuid: string): Guid | null {
        if (this.isValid(uuid)) {
            return new Guid(uuid as UUID);
        }
        return null;
    }

    public static isValid(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

    public equals(other: Guid): boolean {
        return this.value === other.value;
    }

    public clone(): Guid {
        return new Guid(this._value);
    }
}