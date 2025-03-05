import axios, { AxiosResponse } from 'axios';
import {
  Product,
  SearchResponse,
  ProductDetails,
} from '../../domain/entities/Product';
import { Description } from '../../domain/entities/Description';
import { ProductRepository } from '../../domain/ports/ProductRepository';

const BASE_URL = 'https://api.mercadolibre.com';

export class MercadoLivreApi implements ProductRepository {
  async findById(id: string): Promise<Product> {
    const response: AxiosResponse<Product> = await axios.get(
      `${BASE_URL}/items/${id}`,
    );
    return response.data;
  }

  async search(query: string, limit: number = 4): Promise<Product[]> {
    const response: AxiosResponse<SearchResponse> = await axios.get(
      `${BASE_URL}/sites/MLA/search`,
      {
        params: { q: query, limit },
      },
    );
    return response.data.results.slice(0, limit); // Garantir que apenas 'limit' itens sejam retornados
  }

  static async searchProducts(
    query: string,
    limit: number = 4,
  ): Promise<SearchResponse> {
    try {
      const response: AxiosResponse<SearchResponse> = await axios.get(
        `${BASE_URL}/sites/MLA/search`,
        {
          params: { q: query, limit },
        },
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'searching products');
    }
  }

  static async getProductById(id: string): Promise<ProductDetails> {
    try {
      const productResponse: AxiosResponse<Product> = await axios.get(
        `${BASE_URL}/items/${id}`,
      );
      const descriptionResponse: AxiosResponse<Description> = await axios.get(
        `${BASE_URL}/items/${id}/description`,
      );
      return {
        product: productResponse.data,
        description: descriptionResponse.data,
      };
    } catch (error: unknown) {
      this.handleError(error, 'getting product by ID');
    }
  }

  private static handleError(error: unknown, context: string): never {
    if (error instanceof Error && axios.isAxiosError(error)) {
      console.error(`Error ${context}:`, error.message);
      throw new Error(`Failed to ${context}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
}
