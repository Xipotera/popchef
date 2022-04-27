import { Product } from '../../products/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product2617378125500 implements MigrationInterface {
  name = 'Product2617378125500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<Product>(Product, {
        name: 'Awesome Concrete Pizza',
        description: 'pizza with ananas',
        price: 675.0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM product`);
  }
}
