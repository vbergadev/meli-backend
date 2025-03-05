export interface Product {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  sold_quantity: number;
  pictures: { url: string }[];
}

export interface SearchResponse {
  filters: Filter[];
  results: Product[];
}

export interface Filter {
  id: string;
  values: {
    path_from_root: Category[];
  }[];
}

export interface Category {
  name: string;
}

export interface ProductDetails {
  product: Product;
  description: Description;
}

export interface Description {
  plain_text: string;
}
