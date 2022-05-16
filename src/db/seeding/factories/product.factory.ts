import { define } from 'typeorm-seeding';

import { Product } from '../../../products/product.entity';
import { faker } from '@faker-js/faker';

define(Product, () => {
  const product = new Product();

  product.name = faker.commerce.product();
  product.description = faker.commerce.productDescription();
  product.price = parseInt(faker.commerce.price(1, 600, 0));

  return product;
});
