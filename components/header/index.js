import styles from "./styles.module.scss"; //here we are only importing scss modules for this particular component
import Ad from "./Ad";

export default function Header() {
  return (
    <header className={styles.header}>
      <Ad></Ad>
    </header>
  );
}
