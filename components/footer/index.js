import styles from "./styles.module.scss";
import Links from "./Links";
import Socials from "./Socials";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <Links></Links>
        <Socials></Socials>
      </div>
    </footer>
  );
}
