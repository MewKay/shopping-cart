import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart component", () => {
  it("renders correctly", () => {
    const { container } = render(<Cart />);

    expect(container).toMatchSnapshot();
  });
});
