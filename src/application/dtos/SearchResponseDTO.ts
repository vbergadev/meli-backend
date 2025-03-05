import { ProductDTO } from './ProductDTO';

export interface SearchResponseDTO {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: ProductDTO[];
}
