import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  //here we are sinply adding a page to the nextauth settings with the route /signin
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt", //we are changing the strategy to use json web tokens. Web token will hold encrypted info about the user. To decrypt it we will also need 'secret' as below
  },
  secret: process.env.JWT_SECRET, //JWT_SECRET is set up in the .env file
});
