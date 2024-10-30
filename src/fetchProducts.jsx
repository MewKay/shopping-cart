const fetchProducts = async function fetchListOfProductsFromAPI(category) {
  const API_URL =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  const response = await fetch(API_URL, { mode: "cors" });
  if (!response.ok) {
    throw new Error(`HTTP Error: Status ${response.status}`);
  }

  return response.json();
};

export default fetchProducts;
