import { SearchProducts } from './SearchProducts';
import { MercadoLivreApi } from '../../infrastructure/http/MercadoLivreApi';
import { SearchResponseDTO } from '../dtos/SearchResponseDTO';

jest.mock('../../infrastructure/http/MercadoLivreApi');

describe('SearchProducts', () => {
  it('should return search results in the correct format', async () => {
    const mockResponse = {
      filters: [
        {
          id: 'category',
          values: [
            {
              path_from_root: [{ name: 'Category1' }, { name: 'Category2' }],
            },
          ],
        },
      ],
      results: [
        {
          id: '1',
          title: 'Product 1',
          price: 100.5,
          currency_id: 'USD',
          thumbnail: 'http://example.com/product1.jpg',
          condition: 'new',
          shipping: {
            free_shipping: true,
          },
        },
      ],
    };

    (MercadoLivreApi.searchProducts as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const query = 'test';
    const limit = 4;
    const result: SearchResponseDTO = await SearchProducts.execute(
      query,
      limit,
    );

    expect(result).toEqual({
      author: {
        name: 'Victor',
        lastname: 'Bergamini',
      },
      categories: ['Category1', 'Category2'],
      items: [
        {
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
        },
      ],
    });
  });

  it('should handle errors', async () => {
    const query = 'test';
    const limit = 4;
    const error = new Error('Something went wrong');
    (MercadoLivreApi.searchProducts as jest.Mock).mockRejectedValue(error);

    await expect(SearchProducts.execute(query, limit)).rejects.toThrow(
      'Something went wrong',
    );
  });
});
