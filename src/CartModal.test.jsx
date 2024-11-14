import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CartModal from "./CartModal";
import { MemoryRouter } from "react-router-dom";

describe("CartModal component", () => {
  it("renders correctly", () => {
    const { container } = render(<CartModal />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });
});
