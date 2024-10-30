import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchProducts from "./fetchProducts";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

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
      </div>
      <ul>
        {productList.map((product) => (
          <ProductCard key={product.id} title={product.title} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
