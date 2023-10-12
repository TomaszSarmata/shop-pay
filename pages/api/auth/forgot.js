import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import resetPasswordEmailTemplate from "../../../emails/resetPasswordEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();

    const { email } = req.body; //so thats coming from the browser or postman. So we gonna try to find the user with that email in our database.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered." });
    }
    const user_id = createResetToken({ id: user._id.toString() });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(
      email,
      url,
      "",
      "Reset Your Password.",
      resetPasswordEmailTemplate
    );
    await db.disconnectDb();
    res.json({
      message: `Success! Please check your email to reset your password. If you don't see the email, please check your spam folder.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
