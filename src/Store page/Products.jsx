import { useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import ActiveProduct from "./ActiveProduct";
import useFetchProducts from "../hooks/useFetchProducts";

const Products = () => {
  const { productList, loading, error } = useFetchProducts();
  const navigate = useNavigate();
  const [searchedProduct, setSearchedProduct] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);

  const searchedPattern = new RegExp(searchedProduct, "i");
  const filteredProductList = productList.filter((product) =>
    searchedPattern.test(product.title)
  );
  const isThereNoProducts =
    searchedProduct !== "" && filteredProductList.length <= 0;

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
    <div>
      {activeProduct && (
        <ActiveProduct
          product={activeProduct}
          onRemoveActiveProduct={handleRemoveActive}
        />
      )}
      <div className="product-list-header">
        <ul className="product-category-filter">
          <li>
            <button onClick={() => navigate("../all", { relative: "path" })}>
              All
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                navigate("../men's clothing", { relative: "path" })
              }
            >
              Men&apos;s Clothing
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                navigate("../women's clothing", { relative: "path" })
              }
            >
              Women&apos;s Clothing
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("../jewelery", { relative: "path" })}
            >
              Jewelery
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("../electronics", { relative: "path" })}
            >
              Electronics
            </button>
          </li>
        </ul>
        <input
          id="search-product"
          type="text"
          placeholder="Search for a product..."
          value={searchedProduct}
          onChange={handleSearchChange}
        />
      </div>
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
        <ul>
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
        </ul>
      )}
    </div>
  );
};

export default Products;
