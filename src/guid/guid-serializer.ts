import { Guid } from "./guid-base";

declare module "./guid-base" {
    interface Guid {
        toString(): string;
        toJSON(): string;
    }

    namespace Guid {
        function fromString(uuid: string): Guid;
        function fromJSON(json: string): Guid;
    }
}

Guid.prototype.toString = function(): string {
    return this.value;
}

Guid.prototype.toJSON = function(): string {
    return JSON.stringify({ value: this.value })
}

Guid.fromString = function(uuid: string): Guid {
    return Guid.parse(uuid);
}

Guid.fromJSON = function(json: string): Guid {
    const obj = JSON.parse(json);
    if (!obj.value) {
        throw new Error('');
    }
    return Guid.parse(obj.value)
}