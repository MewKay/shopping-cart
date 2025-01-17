import { Link } from "react-router-dom";
import styles from "./Store.module.css";
import { CircuitBoard, Gem, Icon, MoveRight, Shirt } from "lucide-react";
import { dress } from "@lucide/lab";

const Store = function createStoreComponent() {
  return (
    <main className={styles["container"]}>
      <div className={styles["links-container"]}>
        <h2 className={styles["heading"]}>View Our Products</h2>
        <div className={styles["category-container"]}>
          <Link to={"men's clothing"} className={styles["category-link"]}>
            <Shirt />
            Men&apos;s Clothing
          </Link>
          <Link to={"women's clothing"} className={styles["category-link"]}>
            <Icon iconNode={dress} />
            Women&apos;s Clothing
          </Link>
          <Link to={"electronics"} className={styles["category-link"]}>
            <CircuitBoard />
            Electronics
          </Link>
          <Link to={"jewelery"} className={styles["category-link"]}>
            <Gem />
            Jewelery
          </Link>
        </div>
        <Link to={"all"} className={styles["all-link"]}>
          <p>
            View All
            <MoveRight />
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Store;
