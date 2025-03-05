import { Module } from '@nestjs/common';
import { ProductController } from './presentation/ProductController';
import { MercadoLivreApi } from './infrastructure/http/MercadoLivreApi';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MercadoLivreApi,
    },
  ],
})
export class AppModule {}
