import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    //below we are going to extract the name, email and password form the user input sent as a request as we want to make sure that none of them are null
    const { name, email, password } = req.body; //we are getting that info from the body of the request
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
