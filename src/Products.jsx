import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchProducts from "./fetchProducts";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState("");
  const searchedPattern = new RegExp(searchedProduct, "i");
  const filteredProductList = productList.filter((product) =>
    searchedPattern.test(product.title)
  );
  const isThereNoProducts = filteredProductList.length <= 0;

  useEffect(() => {
    const updateProductList = async function putFetchedDataToProductList() {
      try {
        const updatedProductList = await fetchProducts(category);
        setProductList(updatedProductList);
      } catch (error) {
        console.error(error);
      }
    };

    updateProductList();
  }, [category]);

  const handleSearchChange = (e) => {
    setSearchedProduct(e.target.value);
  };

  return (
    <div>
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
      {isThereNoProducts ? (
        <p>
          Sorry, no products match your search. Please try adjusting your
          filters or search terms.
        </p>
      ) : (
        <ul>
          {filteredProductList.map((product) => (
            <ProductCard key={product.id} title={product.title} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
