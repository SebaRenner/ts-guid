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
        const mockUUID = "123e4567-e89b-12d3-a456-426614174000";
        (randomUUID as jest.MockedFunction<typeof randomUUID>).mockReturnValue(mockUUID);

        // act
        const guid = Guid.newGuid();

        // assert
        expect(guid).toBeInstanceOf(Guid);
    });
});