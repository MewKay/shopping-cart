import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

//Component props
const imgURL = "https://image.placeholder.com/product";
const title = "Product 0";
const price = 50;
const indexToShow = 0;
const onClick = vi.fn();

describe("ProductCard component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ProductCard
        imgURL={imgURL}
        title={title}
        price={price}
        indexToShow={indexToShow}
        onClick={onClick}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls onClick function when clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProductCard
        imgURL={imgURL}
        title={title}
        price={price}
        indexToShow={indexToShow}
        onClick={onClick}
      />
    );

    const productCard = screen.getByRole("button", { name: /Product 0/ });
    await user.click(productCard);

    expect(onClick).toHaveBeenCalledWith(indexToShow);
  });
});
