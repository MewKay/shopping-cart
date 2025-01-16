import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import fetchProducts from "../fetchProducts";
import ActiveProduct from "./ActiveProduct";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";
import { AlertTriangle } from "lucide-react";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchedPattern = new RegExp(searchedProduct, "i");
  const filteredProductList = productList.filter((product) =>
    searchedPattern.test(product.title)
  );
  const isThereNoProducts = filteredProductList.length <= 0;

  const allFilterActive = category === "all" ? styles["active"] : "";
  const menClothingFilterActive =
    category === "men's clothing" ? styles["active"] : "";
  const womenClothingFilterActive =
    category === "women's clothing" ? styles["active"] : "";
  const jeweleryFilterActive = category === "jewelery" ? styles["active"] : "";
  const electronicsFilterActive =
    category === "electronics" ? styles["active"] : "";

  useEffect(() => {
    const updateProductList = async function putFetchedDataToProductList() {
      setActiveProduct(null);
      setLoading(true);
      try {
        const updatedProductList = await fetchProducts(category);
        setProductList(updatedProductList);
        setError(null);
      } catch (error) {
        setError(error.message);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };

    updateProductList();
  }, [category]);

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
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  const handleRemoveActive = () => {
    setActiveProduct(null);
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
        <div className={styles["products-list-header"]}>
          <ul className={styles["category-filter"]}>
            <li>
              <button
                onClick={() => navigate("../all", { relative: "path" })}
                className={allFilterActive}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  navigate("../men's clothing", { relative: "path" })
                }
                className={menClothingFilterActive}
              >
                Men&apos;s Clothing
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  navigate("../women's clothing", { relative: "path" })
                }
                className={womenClothingFilterActive}
              >
                Women&apos;s Clothing
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("../jewelery", { relative: "path" })}
                className={jeweleryFilterActive}
              >
                Jewelery
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("../electronics", { relative: "path" })}
                className={electronicsFilterActive}
              >
                Electronics
              </button>
            </li>
          </ul>
          <input
            className={styles["search-product"]}
            type="text"
            placeholder="Search for a product..."
            value={searchedProduct}
            onChange={handleSearchChange}
          />
        </div>
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
