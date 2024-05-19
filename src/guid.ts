import { UUID, randomUUID } from "crypto";

class Guid {
    private _value: UUID;

    private constructor(uuid: UUID) {
        this._value = uuid;
    }

    public static newGuid(): Guid {
        return new Guid(randomUUID()); 
    }
}