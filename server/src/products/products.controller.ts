import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Query } from '@nestjs/common';
import { Header } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /*
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
    */

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  findAll(@Query('title') title?: string): Product[] {
    return this.productsService.findAll(title);
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Header('Access-Control-Allow-Origin', '*')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Header('Access-Control-Allow-Origin', '*')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
