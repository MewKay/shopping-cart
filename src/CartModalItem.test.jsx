import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CartModalItem from "./CartModalItem";

//Component props
const image = "https://image.placeholder.com/product";
const title = "Product 0";
const price = 49.5;
const quantity = 5;

describe("CartModalItem component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CartModalItem
        image={image}
        title={title}
        price={price}
        quantity={quantity}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
