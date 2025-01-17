import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { AlertTriangle } from "lucide-react";
import { AnimatePresence } from "motion/react";
import ActiveProduct from "./ActiveProduct";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";
import ProductHeader from "./ProductHeader";

const Products = () => {
  const { productList, activeProduct, loading, error, setActiveProduct } =
    useFetchProducts();
  const [searchedProduct, setSearchedProduct] = useState("");

  const searchedPattern = new RegExp(searchedProduct, "i");
  const filteredProductList = productList.filter((product) =>
    searchedPattern.test(product.title)
  );
  const isThereNoProducts =
    searchedProduct !== "" && filteredProductList.length <= 0;

  const handleRemoveActive = () => {
    setActiveProduct(null);
  };

  const handleSearchChange = (e) => {
    setSearchedProduct(e.target.value);
  };

  const handleCardClick = (indexToShow) => {
    setActiveProduct(null);

    //Delay ActiveProduct render to give time for animation
    setTimeout(() => {
      setActiveProduct(filteredProductList[indexToShow]);
    }, 300);

    //Delay scrolling to wait for ActiveProduct rendering
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <main className={styles["main-container"]}>
      <div className={styles["container"]}>
        <AnimatePresence>
          {activeProduct && (
            <ActiveProduct
              product={activeProduct}
              onRemoveActiveProduct={handleRemoveActive}
            />
          )}
        </AnimatePresence>

        <ProductHeader
          searchedProduct={searchedProduct}
          onSearchChange={handleSearchChange}
        />

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
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Products;
