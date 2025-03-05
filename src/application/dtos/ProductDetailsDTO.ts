import { ProductDTO } from './ProductDTO';

export interface ProductDetailsDTO {
  author: {
    name: string;
    lastname: string;
  };
  item: ProductDTO & {
    sold_quantity: number;
    description: string;
  };
}
