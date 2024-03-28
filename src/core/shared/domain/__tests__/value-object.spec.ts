import { ValueObject } from "../value-object";


class StringValueObject extends ValueObject{
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject{
  constructor(readonly value: string, readonly prop2:number) {
    super();
  }
}

describe("Value Object unit test", () => {
  test("should be equals", () => {
    const valueObj = new StringValueObject('test');
    const valueObj2 = new StringValueObject('test');
    expect(valueObj.equals(valueObj2)).toBe(true);

    const complexValueObj = new ComplexValueObject("test", 1);
    const complexValueObj2 = new ComplexValueObject("test", 1);
    expect(complexValueObj.equals(complexValueObj2)).toBe(true);
    expect(complexValueObj.equals(undefined as any)).toBe(false);
    expect(complexValueObj.equals(null as any)).toBe(false);
  });

  test("should not be equals", () => {
    const valueObj = new StringValueObject('test');
    const valueObj2 = new StringValueObject('test02');
    expect(valueObj.equals(valueObj2)).toBe(false);

    const complexValueObj = new ComplexValueObject("test", 1);
    const complexValueObj2 = new ComplexValueObject("test", 2);
    expect(complexValueObj.equals(complexValueObj2)).toBe(false);
  });
});

