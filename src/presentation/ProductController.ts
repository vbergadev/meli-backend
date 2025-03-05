import { Request, Response } from 'express';
import { GetProductById } from '../application/use-cases/GetProductById';
import { SearchProducts } from '../application/use-cases/SearchProducts';

export class ProductController {
  static async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const limit = parseInt(req.query.limit as string, 10) || 4;
      const data = await SearchProducts.execute(query, limit);
      res.json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = await GetProductById.execute(id);
      res.json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }
}
