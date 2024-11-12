import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CartItem from "./CartItem";

//Component props
const cartItem = {
  productDetails: {
    id: 0,
    title: "Product 0",
    image: "https://image.placeholder.com/product",
    category: "jewelery",
    price: 50,
  },
  quantity: 4,
};

describe("CartItem component", () => {
  it("renders correctly", () => {
    const { container } = render(<CartItem cartItem={cartItem} />);

    expect(container).toMatchSnapshot();
  });
});
