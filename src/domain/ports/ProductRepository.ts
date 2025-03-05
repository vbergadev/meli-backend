import { Product } from '../entities/Product';

export interface ProductRepository {
  findById(id: string): Promise<Product>;
  search(query: string, limit: number): Promise<Product[]>;
}
