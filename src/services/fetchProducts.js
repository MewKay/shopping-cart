const fetchProducts = async function fetchListOfProductsFromAPI(
  category,
  signal = null
) {
  const API_URL =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  const response = await fetch(API_URL, { mode: "cors", signal });

  if (!response.ok) {
    throw new Error(`HTTP Error: Status ${response.status}`);
  }

  return response.json();
};

export default fetchProducts;
