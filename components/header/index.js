import styles from "./styles.module.scss"; //here we are only importing scss modules for this particular component
import Ad from "./Ad";
import Top from "./Top";
import Main from "./Main";

export default function Header({ country }) {
  return (
    <header className={styles.header}>
      <Ad></Ad>
      <Top country={country}></Top>
      <Main></Main>
    </header>
  );
}
