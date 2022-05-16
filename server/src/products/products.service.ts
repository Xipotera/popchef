import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(name: string, description: string, price: number) {
    const product = this.repo.create({ name, description, price });

    return this.repo.save(product);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<Product>) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    Object.assign(product, attrs);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return this.repo.remove(product);
  }
}
