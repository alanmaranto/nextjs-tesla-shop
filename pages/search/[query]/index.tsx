import { Box, Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { dbProducts } from "database";
import { IProduct } from "interfaces";
import type { GetServerSideProps, NextPage } from "next";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const Search: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Tesla-Shop - Search"
      pageDescription="Find tesla products"
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Term: {query}
        </Typography>
      ) : (
        <Box display="flex" gap={1}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            We can't found the product
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts()
  } 

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default Search;
