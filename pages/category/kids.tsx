import { Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import FullScreenLoading from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";
import type { NextPage } from "next";

const Kids: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout title="Tesla-Shop - Kids" pageDescription="Find tesla kids products">
      <Typography variant="h1" component="h1">
        Kids
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Kids products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Kids;
