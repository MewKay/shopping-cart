import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductHeader.module.css";

const ProductHeader = ({ searchedProduct, onSearchChange }) => {
  const { category } = useParams();

  const allFilterActive = category === "all" ? styles["active"] : "";
  const menClothingFilterActive =
    category === "men's clothing" ? styles["active"] : "";
  const womenClothingFilterActive =
    category === "women's clothing" ? styles["active"] : "";
  const jeweleryFilterActive = category === "jewelery" ? styles["active"] : "";
  const electronicsFilterActive =
    category === "electronics" ? styles["active"] : "";

  return (
    <div className={styles["products-list-header"]}>
      <ul className={styles["category-filter"]}>
        <li>
          <Link to={"/store/all"} className={allFilterActive}>
            All
          </Link>
        </li>
        <li>
          <Link
            to={"/store/men's clothing"}
            className={menClothingFilterActive}
          >
            Men&apos;s Clothing
          </Link>
        </li>
        <li>
          <Link
            to={"/store/women's clothing"}
            className={womenClothingFilterActive}
          >
            Women&apos;s Clothing
          </Link>
        </li>
        <li>
          <Link to={"/store/jewelery"} className={jeweleryFilterActive}>
            Jewelery
          </Link>
        </li>
        <li>
          <Link to={"/store/electronics"} className={electronicsFilterActive}>
            Electronics
          </Link>
        </li>
      </ul>
      <input
        className={styles["search-product"]}
        type="text"
        placeholder="Search for a product..."
        value={searchedProduct}
        onChange={onSearchChange}
      />
    </div>
  );
};

ProductHeader.propTypes = {
  searchedProduct: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default ProductHeader;
