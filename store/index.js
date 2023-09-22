import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";

// we are starting with defining our reducers

const reducers = combineReducers({ cart }); //so that we can have a lot of reducers (like cart, user etc) at the same time accessible through 'reducers'

// here we are going to config our reducers
const config = {
  key: "root",
  storage, //storage is very important as it persist info even on refresh of the page
};

//here we are going to create our reducer
const reducer = persistReducer(config, reducers); //takes two parameters, our config and our reducers

//now we are going to create the store itself
const store = configureStore({
  reducer: reducer, //the reducer from line 18 that persists info
  devTools: process.env.NODE_ENV !== "production", //that will be available only in the development mode. so the line above will equate to true if in a dev mode
  middleware: [thunk],
});

export default store; //the store is fully set up
