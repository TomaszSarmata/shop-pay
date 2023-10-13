import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import resetPasswordEmailTemplate from "../../../emails/resetPasswordEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { user_id, password } = req.body; //thats coming from our frontend
    const user = await User.findById(user_id); //here we are checking if the user exists in our database
    if (!user) {
      return response
        .status(400)
        .json({ message: "This account does not exist." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12); //here we are hashing the password
    await User.updateOne({
      password: cryptedPassword,
    });
    res.json({ email: user.email });

    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
