// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "database";
import { IProduct } from "interfaces";
import Product from "models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { msg: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({ msg: "Bad Request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  const products = await Product.find()
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}