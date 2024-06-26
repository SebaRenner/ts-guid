import { Guid } from "../../src/index";

describe('Guid Serializer', () => {
    describe('to string', () => {
        it('should return the Guid value as string', () => {
            // arrange
            var guid = Guid.newGuid();
            var expected = guid.value;

            // act
            var result = guid.toString();

            // assert
            expect(result).toBe(expected);
            expect(typeof result).toBe('string')
        });
    });

    describe('fromString', () => {
        it('should create a Guid instance from a valid string', () => {
            // arrange
            const value = '2e405af9-a1e8-4f09-8122-93609a9a589e';

            // act
            var guid = Guid.fromString(value);

            // assert
            expect(guid.value).toBe(value);
            expect(guid).toBeInstanceOf(Guid)
        });

        it('should throw an error in case an invalid string is passed', () => {
            // arrange
            const someString = 'test123';

            // act & assert
            expect(() => {
                Guid.parse(someString);
            }).toThrow('Invalid UUID format');
        });
    });

    describe('toJSON', () => {
        it('should return a json string with a value key', () => {
            // arrange
            const value = '2e405af9-a1e8-4f09-8122-93609a9a589e';
            const guid = Guid.parse(value);

            // act
            var json = guid.toJSON();

            // assert
            expect(typeof json).toBe('string');
            expect(json).toBe(`{"value":"${value}"}`);           
        });

        it('should return a parsable JSON string', () => {
            // arrange
            const value = '2e405af9-a1e8-4f09-8122-93609a9a589e';
            const guid = Guid.parse(value);

            // act
            var json = guid.toJSON();

            // assert
            expect(() => {
                JSON.parse(json);
            }).not.toThrow();

            const obj = JSON.parse(json);
            expect(obj).toHaveProperty('value');
            expect(obj.value).toBe(value);       
        });
    });

    describe('fromJSON', () => {
        it('should create a guid instance from a valid json string', () => {
            // arrange
            const value = "2e405af9-a1e8-4f09-8122-93609a9a589e"
            const json = `{"value":"${value}"}`;

            // act
            const guid = Guid.fromJSON(json);

            // assert
            expect(guid).toBeInstanceOf(Guid);
            expect(guid.value).toBe(value);
        });

        it('should throw an error if json doesn\'t contain value key', () => {
            // arrange
            const value = "2e405af9-a1e8-4f09-8122-93609a9a589e"
            const json = `{"key":"${value}"}`;

            // act & assert
            expect(() => {
                Guid.fromJSON(json);
            }).toThrow('JSON does not contain value key');
        });

        it('should throw an error if value isn\'t a valid uuid', () => {
            // arrange
            const someString = "test123"
            const json = `{"value":"${someString}"}`;

            // act & assert
            expect(() => {
                Guid.fromJSON(json);
            }).toThrow('Invalid UUID format');
        });
    });
});