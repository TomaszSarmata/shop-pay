import mongoose from "mongoose";

//we are going to create the schema and define the properties of the user. Effectively we are creating a user model profile that will feed to our database

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter you full name",
    },
    email: {
      type: String,
      required: "Please enter your email address.",
      trim: true, //gets rid off the spaces between characters
      unique: true, //has to be unique so no 2 users will have the same email
    },
    password: {
      type: String,
      required: "Please enter a password",
    },
    role: {
      type: String,
      default: "user", //as default anyone that registers will be classified as a user
    },
    image: {
      type: String, //as that will be the url / path
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png", //default image for each user
    },
    emailVerified: {
      type: Boolean, //true or false
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      //this one is an array as many addresses
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
