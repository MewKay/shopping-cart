import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Cart from "./Cart";

//Mock Outlet Context
const itemNumber = 3;

vi.mock("react-router-dom", () => {
  const reactRouterDom = vi.importActual("react-router-dom");

  return {
    ...reactRouterDom,
    useOutletContext: vi.fn(() => ({
      itemNumber,
    })),
  };
});

describe("Cart component", () => {
  it("renders correctly", () => {
    const { container } = render(<Cart />);

    expect(container).toMatchSnapshot();
  });
});
