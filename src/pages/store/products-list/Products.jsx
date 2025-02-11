import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { AnimatePresence } from "motion/react";
import ActiveProduct from "./active-product/ActiveProduct";
import ProductHeader from "./product-header/ProductHeader";
import ProductListContent from "./product-list-content/ProductListContent";
import styles from "./Products.module.css";

const Products = () => {
  const { productList, activeProduct, loading, error, setActiveProduct } =
    useFetchProducts();
  const [searchedProduct, setSearchedProduct] = useState("");

  // Escape input to avoid errors as RegExp
  const escapedSearchedProduct = searchedProduct.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  const searchedPattern = new RegExp(escapedSearchedProduct, "i");
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

        <ProductListContent
          loading={loading}
          error={error}
          isThereNoProducts={isThereNoProducts}
          filteredProductList={filteredProductList}
          onCardClick={handleCardClick}
        />
      </div>
    </main>
  );
};

export default Products;
