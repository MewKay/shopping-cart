import { Link } from "react-router-dom";

const Home = function createHomeComponent() {
  return (
    <>
      <h2>Welcome to our store!</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus autem
        itaque corporis vitae id vero quaerat possimus nisi neque alias?
      </p>
      <Link to={"store"}>Go to store</Link>
    </>
  );
};

export default Home;
