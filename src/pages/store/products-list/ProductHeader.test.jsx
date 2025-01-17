import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductHeader from "./ProductHeader";

describe("ProductHeader", () => {
  it("renders correctly", () => {
    const { container } = render(<ProductHeader />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });
});
