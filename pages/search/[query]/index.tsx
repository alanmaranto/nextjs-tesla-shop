import { Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { dbProducts } from "database";
import { IProduct } from "interfaces";
import type { GetServerSideProps, NextPage } from "next";

interface Props {
  products: IProduct[];
}

const Search: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout
      title="Tesla-Shop - Search"
      pageDescription="Find tesla products"
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC 123
      </Typography>
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

  //TODO: return others products in case we don't have them

  return {
    props: {
      products,
    },
  };
};

export default Search;
