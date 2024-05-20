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

    describe('parse', () => {
        it('should create a guid instance from a valid uuid string', () => {
            // arrange
            const guidString = '2e405af9-a1e8-4f09-8122-93609a9a589e';

            // act
            const guid = Guid.parse(guidString);

            // assert
            expect(guid).toBeInstanceOf(Guid);
            expect(guid.value).toBe(guidString);
        });

        it('should throw an error in case a invalid string is passed', () => {
            // arrange
            const someString = 'test123';

            // act & assert
            expect(() => {
                Guid.parse(someString);
            }).toThrow('Invalid UUID format');
        });
    })

    describe('isValid', () => {
        it('is a valid guid (all lowercase)', () => {
            // arrange
            const guidValue = '2e405af9-a1e8-4f09-8122-93609a9a589e';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(true);
        });

        it('is a valid guid (all uppercase)', () => {
            // arrange
            const guidValue = '2E405AF9-A1E8-4F09-8122-93609A9A589E';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(true);
        });

        it('is a valid guid (mixed case)', () => {
            // arrange
            const guidValue = '2e405AF9-a1E8-4F09-8122-93609a9a589E';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(true);
        });
    
        it('is not a valid guid (version check, 13th character needs to be \'4\')', () => {
            // arrange
            const guidValue = '2e405af9-a1e8-3f09-8122-93609a9a589e';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });

        it('is not a valid guid (variant check, 17th character needs be within range of \'8-b\')', () => {
            // arrange
            const guidValue = '2e405af9-a1e8-4f09-7122-93609a9a589e';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });

        it('is not a valid guid (too short)', () => {
            // arrange
            const guidValue = '2e405af9-a1e8-4f09-8122-93609a9a589';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });

        it('is not a valid guid (too long)', () => {
            // arrange
            const guidValue = '2e405af9-a1e8-4f09-8122-93609a9a589ef';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });

        it('is not a valid guid (non-hex character)', () => {
            // arrange
            const guidValue = '2e4X5af9-a1e8-4f09-8122-93609a9a589e';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });

        it('is not a valid guid (hyphen misplacment)', () => {
            // arrange
            const guidValue = '2e405af-a1e8-4f09-8122-993609a9a589e';
    
            // act
            const isValid = Guid.isValid(guidValue);
    
            // assert
            expect(isValid).toBe(false);
        });
    });
});