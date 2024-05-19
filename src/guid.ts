import { UUID, randomUUID } from "crypto";

export class Guid {
    private _value: UUID;

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
}