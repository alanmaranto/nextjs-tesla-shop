import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { initialData } from "database/products";
import type { NextPage } from "next";

initialData;

const Home: NextPage = () => {
  return (
    <ShopLayout title="Tesla-Shop - Home" pageDescription="Find tesla products">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;
