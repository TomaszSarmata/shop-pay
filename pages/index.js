import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import axios from "axios";

export default function Home({ country }) {
  console.log(country);
  return (
    <div>
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}

//Here we are creating a server side function that will get the info about the user location through ipregistry
export async function getServerSideProps() {
  //here we are going to do everything we need from the server side and then we are going to return it and catch it from the props on the client side
  // let data = await fetch(``) this is how we would do but we are going to use axios instead of fetch. axios will help us make requests to the apis
  let data = await axios
    .get("https://api.ipregistry.co/?key=xryaufppu560u98b")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  //here we need to return our props for them to be available on the client side
  return {
    props: {
      country: data, //now we can catch country in the props of the Home component at the top of this filw
    },
  };
}
