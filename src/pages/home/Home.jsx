import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { ArrowRight } from "lucide-react";

const Home = function createHomeComponent() {
  return (
    <main className={styles["main-container"]}>
      <h2 className={styles["hero-head"]}>Welcome to our store!</h2>
      <p className={styles["hero-intro"]}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus autem
        itaque corporis vitae id vero quaerat possimus nisi neque alias?
      </p>
      <Link to={"store"} className={styles["store-link"]}>
        <p className={styles["link-text"]}>Go to store</p>
        <ArrowRight size={28} className={styles["link-icon"]} />
      </Link>
    </main>
  );
};

export default Home;
