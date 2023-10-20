import styles from "./styles.module.scss";
import Link from "next/link";
export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Store</Link>
        </li>
        <li>
          <Link href="">Electronics</Link>
        </li>
        <li>
          <Link href="">Special Offers</Link>
        </li>
        <li>
          <Link href="">Beauty</Link>
        </li>
        <li>
          <Link href="">Ebooks</Link>
        </li>
        <li>
          <Link href="">Fitness</Link>
        </li>
        <li>
          <Link href="">Health</Link>
        </li>
      </ul>
    </div>
  );
}
