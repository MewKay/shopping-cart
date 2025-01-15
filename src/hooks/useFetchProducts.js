import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchProducts from "../services/fetchProducts";

const useFetchProducts = () => {
  const { category } = useParams();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const updateProductList = async function putFetchedDataToProductList() {
      setLoading(true);

      try {
        const updatedProductList = await fetchProducts(category, signal);
        setProductList(updatedProductList);
        setError(null);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          // Keep loading while category is switched
          setLoading(true);
          return;
        }

        setError(error.message);
        setProductList([]);
        setLoading(false);
      }
    };

    updateProductList();

    return () => controller.abort();
  }, [category]);

  return {
    productList,
    loading,
    error,
  };
};

export default useFetchProducts;
