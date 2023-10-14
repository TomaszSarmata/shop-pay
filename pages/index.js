import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log("here session", session);
  return (
    <>
      <Header country={country}></Header>
      <div className={styles.home}></div>
      <Footer country={country}></Footer>
    </>
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
      // country: {
      //   name: data.name,
      //   code: data.code,
      //   flag: data.flag.emojitwo,
      // }, //now we can catch country in the props of the Home component at the top of this filw

      //uncomment the above object while going to production. In development use static data to save on tokens with ipregistry
      country: {
        name: "UK",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/255px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png",
        code: "GB",
      }, //remember to uncomment the real data before going to production
    },
  };
}
