import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();

    const { email } = req.body; //so thats coming from the browser or postman. So we gonna try to find the user with that email in our database.
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "This email does not exist." });
    }
    const url = `${process.env.BASE_URL}/auth/reset/${activation_token}`;
    sendEmail(email, url, "", "Activate your account.");
    await db.disconnectDb();
    res.json({
      message: `Success! Please check your email to activate your account. If you don't see the email, please check your spam folder.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
