import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from 'uuid'


describe("uuid unit tests", () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');
  test('should throw error qhen uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('37ce7afa-b3dd-4002-9414-b4154c502e1e');
    expect(uuid.id).toBe('37ce7afa-b3dd-4002-9414-b4154c502e1e');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
});