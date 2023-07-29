import { IProduct } from "interfaces";
import { db } from "database";
import { Product } from "models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = { msg: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsBySlug(req, res);

    default:
      return res.status(400).json({ msg: "Bad Request" });
  }
}

async function getProductsBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const { slug } = req.query;

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({
      msg: "Product not found",
    });
  }

  return res.json(product);
}
