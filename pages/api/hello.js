// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../utils/db";

export default function handler(req, res) {
  db.connectDb(); //here and below we are simply testing if it works and the message should be seen in VS terminal
  db.disconnectDb();
  res.status(200).json({ name: "John Doe" });
}
