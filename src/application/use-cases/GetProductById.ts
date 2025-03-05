import { MercadoLivreApi } from '../../infrastructure/http/MercadoLivreApi';
import { ProductDetailsDTO } from '../dtos/ProductDetailsDTO';

export class GetProductById {
  static async execute(id: string): Promise<ProductDetailsDTO> {
    const { product, description } = await MercadoLivreApi.getProductById(id);
    return {
      author: {
        name: 'Victor',
        lastname: 'Bergamini',
      },
      item: {
        id: product.id,
        title: product.title,
        price: {
          currency: product.currency_id,
          amount: Math.floor(product.price),
          decimals: Math.round((product.price % 1) * 100),
        },
        picture: product.pictures[0]?.url,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping,
        sold_quantity: product.sold_quantity,
        description: description.plain_text,
      },
    };
  }
}
