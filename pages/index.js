import Header from "../components/header";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <h1 className={styles.red}>Welcome</h1>
      <button>click me</button>
    </div>
  );
}
