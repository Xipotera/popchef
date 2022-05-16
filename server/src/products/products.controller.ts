import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post('/')
  createProduct(@Body() body: CreateProductDto) {
    this.productsService.create(body.name, body.description, body.price);
  }

  @Get('/:id')
  async findProduct(@Param('id') id: string) {
    const user = await this.productsService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('product not found');
    }
    return user;
  }

  @Get()
  findAllProduct() {
    return this.productsService.findAll();
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    this.productsService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(parseInt(id), body);
  }
}
