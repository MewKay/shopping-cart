import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchProducts from "../fetchProducts";
import { useNavigate, useParams } from "react-router-dom";
import ActiveProduct from "./ActiveProduct";
import styles from "./Products.module.css";

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
    setActiveProduct(filteredProductList[indexToShow]);
  };

  const handleRemoveActive = () => {
    setActiveProduct(null);
  };

  return (
    <main className={styles["main-container"]}>
      <div className={styles["container"]}>
        {activeProduct && (
          <ActiveProduct
            product={activeProduct}
            onRemoveActiveProduct={handleRemoveActive}
          />
        )}
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
            <p>Failed to load products. Please try again later.</p>
          ) : isThereNoProducts ? (
            <p>
              Sorry, no products match your search. Please try adjusting your
              filters or search terms.
            </p>
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
