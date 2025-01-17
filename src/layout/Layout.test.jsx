import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Layout from "./Layout";

vi.mock("./header/Header", () => ({
  default: ({ handleShowCartModal }) => (
    <div>
      This is header<button onClick={handleShowCartModal}>Open Cart</button>
    </div>
  ),
}));
vi.mock("../components/cart-modal/CartModal", () => ({
  default: ({ handleHideCartModal }) => (
    <div>
      This is cart modal
      <button aria-label={"Close cart preview"} onClick={handleHideCartModal}>
        x
      </button>
    </div>
  ),
}));

describe("Layout component", () => {
  it("renders Header", () => {
    render(<Layout />);

    const headerText = screen.getByText("This is header");

    expect(headerText).toBeInTheDocument();
  });

  describe("CartModal child", () => {
    it("should not render CartModal by default", () => {
      render(<Layout />);

      const cartText = screen.queryByText("This is cart modal");

      expect(cartText).not.toBeInTheDocument();
    });

    it("should render on header button click", async () => {
      const user = userEvent.setup();
      render(<Layout />);

      const headerButton = screen.getByText("Open Cart");

      await user.click(headerButton);

      const cartText = screen.getByText("This is cart modal");

      expect(cartText).toBeInTheDocument();
    });

    it("should hide on 'Close cart preview' button click", async () => {
      const user = userEvent.setup();
      render(<Layout />);

      const headerButton = screen.getByText("Open Cart");
      await user.click(headerButton);

      const closeButton = screen.getByLabelText("Close cart preview");
      await user.click(closeButton);
      const cartText = screen.queryByText("This is cart modal");
      expect(cartText).not.toBeInTheDocument();
    });
  });
});
