import { Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import FullScreenLoading from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout title="Tesla-Shop - Home" pageDescription="Find tesla products">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
