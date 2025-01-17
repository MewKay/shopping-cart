import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductListContent from "./ProductListContent";

//Components props
const loading = false;
const error = null;
const isThereNoProducts = false;
const filteredProductList = [
  {
    id: 0,
    image: "https://image.placeholder.com/product",
    title: "Product 0",
    price: 49.5,
  },
  {
    id: 1,
    image: "https://image.placeholder.com/product",
    title: "Product 1",
    price: 22.5,
  },
  {
    id: 2,
    image: "https://image.placeholder.com/product",
    title: "Product 2",
    price: 10.99,
  },
];
const onCardClick = vi.fn();

describe("ProductListContent", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ProductListContent
        loading={loading}
        error={error}
        isThereNoProducts={isThereNoProducts}
        filteredProductList={filteredProductList}
        onCardClick={onCardClick}
      />,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(container).toMatchSnapshot();
  });
});
