import { Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import FullScreenLoading from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";
import type { NextPage } from "next";

const Men: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title="Tesla-Shop - Men"
      pageDescription="Find tesla men products"
    >
      <Typography variant="h1" component="h1">
        Men
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Men products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Men;
