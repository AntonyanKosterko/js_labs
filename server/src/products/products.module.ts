import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FileService } from 'src/file.service';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Product[]>('assets/products.json'),
    },
  ],
})
export class ProductsModule {}
