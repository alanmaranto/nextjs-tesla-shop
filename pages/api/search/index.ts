import { NextApiRequest, NextApiResponse } from "next";

type Data = { msg: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res
    .status(400)
    .json({ msg: "You must specified query search params" });
}
