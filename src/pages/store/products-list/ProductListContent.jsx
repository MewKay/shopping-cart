import PropTypes from "prop-types";
import { AlertTriangle } from "lucide-react";
import ProductCard from "./ProductCard";
import styles from "./ProductListContent.module.css";

const ProductListContent = ({
  loading,
  error,
  isThereNoProducts,
  filteredProductList,
  onCardClick,
}) => {
  return (
    <div className={styles["list-content"]}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className={styles["alert-message"]}>
          <AlertTriangle />
          <p>Failed to load products. Please try again later.</p>
        </div>
      ) : isThereNoProducts ? (
        <div className={styles["alert-message"]}>
          <AlertTriangle />
          <p>
            Sorry, no products match your search. Please try adjusting your
            filters or search terms.
          </p>
        </div>
      ) : (
        <div className={styles["products-list"]}>
          {filteredProductList.map((product, index) => (
            <ProductCard
              key={product.id}
              imgURL={product.image}
              title={product.title}
              price={product.price}
              indexToShow={index}
              onClick={onCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProductListContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  isThereNoProducts: PropTypes.bool.isRequired,
  filteredProductList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  onCardClick: PropTypes.func.isRequired,
};

export default ProductListContent;
