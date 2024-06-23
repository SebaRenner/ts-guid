import { Guid } from "./guid-base";

declare module "./guid-base" {
    interface Guid {
        toString(): string;
    }

    namespace Guid {
        function fromString(uuid: string): Guid;
    }
}

Guid.prototype.toString = function(): string {
    return this.value;
}

Guid.fromString = function(uuid: string): Guid {
    return Guid.parse(uuid);
}