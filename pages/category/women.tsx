import { Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import FullScreenLoading from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";
import type { NextPage } from "next";

const Women: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");
  return (
    <ShopLayout
      title="Tesla-Shop - Women"
      pageDescription="Find tesla women products"
    >
      <Typography variant="h1" component="h1">
        Women
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Women products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Women;
