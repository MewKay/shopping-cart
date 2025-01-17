import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductHeader from "./ProductHeader";

// Component props
const searchedProduct = "";
const onSearchChange = vi.fn();

describe("ProductHeader", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ProductHeader
        searchedProduct={searchedProduct}
        onSearchChange={onSearchChange}
      />,
      { wrapper: MemoryRouter }
    );

    expect(container).toMatchSnapshot();
  });
});
