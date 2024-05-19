import { randomUUID } from "crypto";
import { Guid } from "../src/guid";

jest.mock("crypto", () => ({
    randomUUID: jest.fn()
}));

describe('Guid', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new guid instance with a unique identifier', () => {
        // arrange
        const guidValue = '2e405af9-a1e8-4f09-8122-93609a9a589e';
        (randomUUID as jest.Mock).mockReturnValue(guidValue);

        // act
        const guid = Guid.newGuid();

        // assert
        expect(guid).toBeInstanceOf(Guid);
        expect(guid.value).toBe(guidValue)
    });

    it('should create a new guid instance with an empty guid', () => {
        // arrange
        const emptyGuid = '00000000-0000-0000-0000-000000000000';

        // act
        const guid = Guid.empty;

        // assert
        expect(guid).toBeInstanceOf(Guid);
        expect(guid.value).toBe(emptyGuid);
    });

    it('is a valid guid', () => {
        // arrange
        const guidValue = '2e405af9-a1e8-4f09-8122-93609a9a589e';

        // act
        const isValid = Guid.isValid(guidValue);

        // assert
        expect(isValid).toBe(true);
    });

    it('is a invalid guid (not v4)', () => {
        // arrange
        const guidValue = '550e8400-e29b-31d4-a716-446655440000';

        // act
        const isValid = Guid.isValid(guidValue);

        // assert
        expect(isValid).toBe(false);
    });
});