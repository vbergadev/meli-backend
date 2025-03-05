import { Request, Response } from 'express';
import { ProductController } from './ProductController';
import { SearchProducts } from '../application/use-cases/SearchProducts';
import { GetProductById } from '../application/use-cases/GetProductById';

jest.mock('../application/use-cases/SearchProducts');
jest.mock('../application/use-cases/GetProductById');

describe('ProductController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  describe('searchProducts', () => {
    it('should return search results', async () => {
      req.query = { q: 'iphone', limit: '4' };
      const mockData = {
        items: [],
        categories: [],
        author: { name: 'Victor', lastname: 'Bergamini' },
      };
      (SearchProducts.execute as jest.Mock).mockResolvedValue(mockData);

      await ProductController.searchProducts(req as Request, res as Response);

      expect(SearchProducts.execute).toHaveBeenCalledWith('iphone', 4);
      expect(jsonMock).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors', async () => {
      req.query = { q: 'iphone', limit: '4' };
      const error = new Error('Something went wrong');
      (SearchProducts.execute as jest.Mock).mockRejectedValue(error);

      await ProductController.searchProducts(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getProductById', () => {
    it('should return product details', async () => {
      req.params = { id: '123' };
      const mockData = {
        item: {},
        author: { name: 'Victor', lastname: 'Bergamini' },
      };
      (GetProductById.execute as jest.Mock).mockResolvedValue(mockData);

      await ProductController.getProductById(req as Request, res as Response);

      expect(GetProductById.execute).toHaveBeenCalledWith('123');
      expect(jsonMock).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors', async () => {
      req.params = { id: '123' };
      const error = new Error('Something went wrong');
      (GetProductById.execute as jest.Mock).mockRejectedValue(error);

      await ProductController.getProductById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
