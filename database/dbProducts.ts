import { db } from "database";
import { IProduct } from "interfaces";
import Product from "models/Product";

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

export interface ProductSlug {
  slug: string
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect();

  return slugs
}