import styles from "./styles.module.scss";
import Link from "next/link";

export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay!</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://www.seekpng.com/png/detail/115-1150622_avatar-demo2x-man-avatar-icon-png.png"
            alt="avatar"
            className={styles.menu_img}
          />
          <div className={styles.col}>
            <span>Welcome Back</span>
            <h3>Tomas</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button>Register</button>
          <button>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
          <Link href="/orders">My Orders</Link>
          <Link href="/profile/messages">Message Center</Link>
          <Link href="/profile/address">Address</Link>
          <Link href="/profile/whishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}