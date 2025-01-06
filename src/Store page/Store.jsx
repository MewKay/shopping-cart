import { Link } from "react-router-dom";
import styles from "./Store.module.css";

const Store = function createStoreComponent() {
  return (
    <main className={styles["container"]}>
      <div className={styles["links-container"]}>
        <h2 className={styles["heading"]}>View Our Products</h2>
        <div className={styles["category-container"]}>
          <Link to={"men's clothing"} className={styles["category-link"]}>
            Men&apos;s Clothing
          </Link>
          <Link to={"women's clothing"} className={styles["category-link"]}>
            Women&apos;s Clothing
          </Link>
          <Link to={"electronics"} className={styles["category-link"]}>
            Electronics
          </Link>
          <Link to={"jewelery"} className={styles["category-link"]}>
            Jewelery
          </Link>
        </div>
        <Link to={"all"} className={styles["all-link"]}>
          View All
        </Link>
      </div>
    </main>
  );
};

export default Store;
