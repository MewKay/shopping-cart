import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartModal from "./CartModal";

vi.mock("./CartModalItem", () => ({
  default: ({ image, title, price, quantity }) => (
    <li>
      <img src={image} alt="" />
      <p>{title}</p>
      <p>{price}</p>
      <p>{quantity}</p>
    </li>
  ),
}));

//Component props
const showCartModal = true;
const totalQuantity = 10;
const orderSubtotal = 352.45;
const cart = [
  {
    productDetails: {
      id: 0,
      image: "https://image.placeholder.com/product",
      title: "Product 0",
      price: 49.5,
    },
    quantity: 5,
  },
  {
    productDetails: {
      id: 1,
      image: "https://image.placeholder.com/product",
      title: "Product 1",
      price: 20.99,
    },
    quantity: 5,
  },
];
const handleHideCartModal = vi.fn();

describe("CartModal component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CartModal
        showCartModal={showCartModal}
        totalQuantity={totalQuantity}
        orderSubtotal={orderSubtotal}
        cart={cart}
        handleHideCartModal={handleHideCartModal}
      />,
      { wrapper: MemoryRouter }
    );

    expect(container).toMatchSnapshot();
  });

  it("calls 'handleHideCartModal' when 'Close cart preview' button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartModal
        showCartModal={showCartModal}
        totalQuantity={totalQuantity}
        orderSubtotal={orderSubtotal}
        cart={cart}
        handleHideCartModal={handleHideCartModal}
      />,
      { wrapper: MemoryRouter }
    );

    const closeButton = screen.getByLabelText("Close cart preview");
    await user.click(closeButton);
    expect(handleHideCartModal).toHaveBeenCalledOnce();
  });

  it("adds plural on 'item' text if more than 1", () => {
    render(
      <CartModal
        showCartModal={showCartModal}
        totalQuantity={totalQuantity}
        orderSubtotal={orderSubtotal}
        cart={cart}
        handleHideCartModal={handleHideCartModal}
      />,
      { wrapper: MemoryRouter }
    );

    const itemText = screen.getByText(/items/);

    expect(itemText).toBeInTheDocument();
  });

  it("does not add plural on 'item' text if 1 or less", () => {
    const mockTotalQuantity = 1;
    render(
      <CartModal
        showCartModal={showCartModal}
        totalQuantity={mockTotalQuantity}
        orderSubtotal={orderSubtotal}
        cart={cart}
        handleHideCartModal={handleHideCartModal}
      />,
      { wrapper: MemoryRouter }
    );

    const itemText = screen.getByText(/item(?= |$)/);

    expect(itemText).toBeInTheDocument();
  });
});
