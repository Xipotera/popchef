import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from '../../../products/product.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Product)().createMany(5);
  }
}
