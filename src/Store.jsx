import { Link } from "react-router-dom";

const Store = function createStoreComponent() {
  return (
    <div>
      <h2>View Our Products</h2>
      <div>
        <Link to={"men's clothing"}>Men&apos;s Clothing</Link>
        <Link to={"women's clothing"}>Women&apos;s Clothing</Link>
        <Link to={"electronics"}>Electronics</Link>
        <Link to={"jewelery"}>Jewelery</Link>
      </div>
      <Link to={"all"}>View All</Link>
    </div>
  );
};

export default Store;
