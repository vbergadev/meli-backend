import * as express from 'express';
import * as cors from 'cors';
import { ProductController } from './presentation/ProductController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/items', (req, res) => ProductController.searchProducts(req, res));
app.get('/api/items/:id', (req, res) =>
  ProductController.getProductById(req, res),
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
