import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import db from "../../../utils/db";
db.connectDb();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        //here we are going to go to our database and find the user with the email and password that was entered. If it exists we will return the user object if it doesnt we will advise the user to check their details and perhaps sign up.
        const user = await User.findOne({ email });

        if (user) {
          return SignInUser({ password, user }); //we get the user from User.findOne and the password is from the credentials object
        } else {
          throw new Error("This email is not registered");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // OAuth authentication providers...
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET, //added clientId and clientSecret in .env file
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  callbacks: {
    //first extracting session and token from our session
    async session({ session, token }) {
      let user = await User.findById(token.sub); //here we are getting the user from the database using the user model (sub is the id of the user that we have and is the info on the token)
      //now we can take the session and add some stuff to it
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      return session;
    },
  },
  //here we are sinply adding a page to the nextauth settings with the route /signin
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt", //we are changing the strategy to use json web tokens. Web token will hold encrypted info about the user. To decrypt it we will also need 'secret' as below
  },
  secret: process.env.JWT_SECRET, //JWT_SECRET is set up in the .env file
});

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password");
  }
  //here we are going to compare the password that was entered with the password that is stored in the database. But as we have it encrypted we need to decrypt it first.
  const testPassword = await bcrypt.compare(password, user.password); //if it matches it will return true if not it will return false
  if (!testPassword) {
    throw new Error("Wrong email or password");
  }
  return user;
};
