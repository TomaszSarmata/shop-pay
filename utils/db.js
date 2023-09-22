import mongoose from "mongoose"; //first install both npm i mongodb mongoose and enter. then import. Then create our connection object like below.
const connection = {};

//export async function

export async function connectDb() {
  //first we gonna check if already connected
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return; //as we don't want to do anything
  }
  //and here second scenario if the first block of code gets skipped
  if (mongoose.connection.lenght > 0) {
    //so here we are using our mongoose to create the connection the first time I believe and using the first element in the array to pass it to connection object as isConnected
    connection.isConnected = mongoose.connections[0].readyState;
    //and another scenario inside
    if (connection.isConnected === 1) {
      console.log("Use prvious connection to the database.");
      return;
    }
    //and disconnect at the end
    await mongoose.disconnect();
  }
  //and here we are going to simply connect and instead of using our sensitive key we are going to use process.env.mongodb_url
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database."); //so this is what happens if we connect to the db for the very first time
  connection.isConnected = db.connections[0].readyState;
}
