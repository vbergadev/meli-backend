import { GetProductById } from './GetProductById';
import { MercadoLivreApi } from '../../infrastructure/http/MercadoLivreApi';
import { ProductDetailsDTO } from '../dtos/ProductDetailsDTO';

jest.mock('../../infrastructure/http/MercadoLivreApi');

describe('GetProductById', () => {
  it('should return product details in the correct format', async () => {
    const mockResponse = {
      product: {
        id: '1',
        title: 'Product 1',
        price: 100.5,
        currency_id: 'USD',
        pictures: [{ url: 'http://example.com/product1.jpg' }],
        condition: 'new',
        shipping: {
          free_shipping: true,
        },
        sold_quantity: 10,
      },
      description: {
        plain_text: 'Product description',
      },
    };

    (MercadoLivreApi.getProductById as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const id = '1';
    const result: ProductDetailsDTO = await GetProductById.execute(id);

    expect(result).toEqual({
      author: {
        name: 'Victor',
        lastname: 'Bergamini',
      },
      item: {
        id: '1',
        title: 'Product 1',
        price: {
          currency: 'USD',
          amount: 100,
          decimals: 50,
        },
        picture: 'http://example.com/product1.jpg',
        condition: 'new',
        free_shipping: true,
        sold_quantity: 10,
        description: 'Product description',
      },
    });
  });

  it('should handle errors', async () => {
    const id = '1';
    const error = new Error('Something went wrong');
    (MercadoLivreApi.getProductById as jest.Mock).mockRejectedValue(error);

    await expect(GetProductById.execute(id)).rejects.toThrow(
      'Something went wrong',
    );
  });
});
