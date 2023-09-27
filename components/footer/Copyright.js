import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5";

export default function Copyright({ country }) {
  return (
    <div className={styles.footer_copyright}>
      <section>©2023 SHOPPAY 2023 All Rights Reserved</section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a href="">
              <div className={styles.flex}>
                <IoLocationSharp></IoLocationSharp> {country.name}
              </div>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];
