import { Entity } from "../../../../domain/entity";
import { Uuid } from "../../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";
type stubEntityConstructorProps = {
  entity_id?:Uuid;
  name:string;
  price:number;
}

class StubEntity extends Entity{
  entity_id:Uuid;
  name:string;
  price:number;

  constructor(props:stubEntityConstructorProps){
    super();
    this.entity_id = props.entity_id ?? new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id,
      name: this.name,
      price: this.price,
    }
  }

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid>{
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }

}

describe("InMemoryRepository Unit Tests", () => {
  let repo: StubInMemoryRepository;
  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test('should insert a new entity', async() => {
    const entity = new StubEntity({
      name:'Test',
      price:100
    });
    await repo.insert(entity);
    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  test('should bulkk insert entities', async() => {
    const entities = 
    [
      new StubEntity({
      name:'Test',
      price:100
    }),
      new StubEntity({
      name:'Test 02',
      price:200
    })]
    await repo.bulkInsert(entities);
    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0]);
    expect(repo.items[1]).toBe(entities[1]);

  });
});