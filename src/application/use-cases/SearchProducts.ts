import { MercadoLivreApi } from '../../infrastructure/http/MercadoLivreApi';
import { SearchResponseDTO } from '../dtos/SearchResponseDTO';
import {
  SearchResponse,
  Filter,
  Category,
} from '../../domain/entities/Product';

export class SearchProducts {
  static async execute(
    query: string,
    limit: number = 4,
  ): Promise<SearchResponseDTO> {
    const data: SearchResponse = await MercadoLivreApi.searchProducts(
      query,
      limit,
    );

    const categories: string[] =
      data.filters
        .find((filter: Filter) => filter.id === 'category')
        ?.values[0]?.path_from_root.map(
          (category: Category) => category.name,
        ) || [];

    const items = data.results.slice(0, limit).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Math.round((item.price % 1) * 100),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    return {
      author: {
        name: 'Victor',
        lastname: 'Bergamini',
      },
      categories,
      items,
    };
  }
}
