import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../../utils/tokens";

//here we are creating our api endpoin that will handle the user imput from the signup option. We have to grab / extract the user name, email and password and put in place validation and sanitation checks to make sure our database is filled with the right data.

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    //below we are going to extract the name, email and password form the user input sent as a request as we want to make sure that none of them are null
    const { name, email, password } = req.body; //we are getting that info from the body of the request
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //here we are going to validate if the email is correct using the function we have created in our utils/validation.js file
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    //here we are going to check our db to see if the email already exists and if so we are going to send an email to the user informing them the email is already taken. To do that we will have to use User model so need to import that
    const user = await User.findOne({ email: email }); //so that will somehow run through our db and search for the same email
    if (user) {
      return res.status(400).json({
        message:
          "This email is already linked to another user. If you think you have registered previously, try logging in using third party provider (i.e. Google, Twitter, Github)",
      });
    }
    //next we are going to check if the password is at the right length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Your password must be at least 6 characters long",
      });
    }
    //now we have to make sure that every password that gets through this api and is passed to our db gets encrypted. We are going to use bcrypt package
    const cryptedPassword = await bcrypt.hash(password, 12); //12 stands for the round of encryption

    //now we can define our user again with all sanitised and encrypted info and send it to our db
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save(); //save() is a function from mongoose that will register all this new data of the newUser in our db
    //now as the next step in our workflow, we are going to send an email to our user after successfull registration in our db. The email will contain a link that the user will have to click to activate the account. The link will be encrypted and will contain the user id. We are going to use the user id info to determine whether or not the link was used and if so we are going to toggle verified email to true. To convert user id into a link we need to install json token.
    //we are going to write a function that will do the whole work for us. We need to go to the utils folder and create a helper function called createActivationToken
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    //here we are going to create an actual url link for the user
    const url = `${process.env.BASE_URL}/activate/${activation_token}`; //BASE_URL will change in the production environment so we have to just go to .env and create it there
    sendEmail(email, url, "", "Activate your account.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
