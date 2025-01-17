import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import CartItem from "./CartItem";
import userEvent from "@testing-library/user-event";

//Mock Outlet Context
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
const setCart = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouterDom = await importOriginal();

  return {
    ...reactRouterDom,
    useOutletContext: vi.fn(() => ({
      cart,
      setCart,
    })),
  };
});

//Component props
const cartItem = {
  productDetails: {
    id: 0,
    title: "Product 0",
    image: "https://image.placeholder.com/product",
    category: "jewelery",
    price: 50,
  },
  quantity: 4,
};
const cartItemIndex = 0;

describe("CartItem component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />
    );

    expect(container).toMatchSnapshot();
  });

  describe("Cart updates", () => {
    it("update cart on quantity types", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const quantityInput = screen.getByLabelText("Quantity value");
      await user.type(quantityInput, "10");
      expect(setCart).toHaveBeenCalled();
    });

    it("update cart on 'Increase quantity' button click", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const increaseQuantityButton = screen.getByLabelText("Increase quantity");
      await user.click(increaseQuantityButton);
      expect(setCart).toHaveBeenCalled();
    });

    it("update cart on 'Decrease quantity' button click", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const decreaseQuantityButton = screen.getByLabelText("Decrease quantity");
      await user.click(decreaseQuantityButton);
      expect(setCart).toHaveBeenCalled();
    });

    it("update cart on 'Remove item from cart' button click", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const removeItem = screen.getByLabelText("Remove item from cart");
      await user.click(removeItem);
      expect(setCart).toHaveBeenCalled();
    });
  });

  describe("Product Quantity", () => {
    it("increase the value by one when 'Increase quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const quantityInput = screen.getByLabelText("Quantity value");
      const quantityInputInitialValue = Number.parseInt(quantityInput.value);
      const increaseQuantityButton = screen.getByLabelText("Increase quantity");

      await user.click(increaseQuantityButton);

      expect(quantityInput).toHaveValue(quantityInputInitialValue + 1);
    });

    it("decrease the value by one but not under 1 when 'Decrease quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(<CartItem cartItem={cartItem} cartItemIndex={cartItemIndex} />);

      const quantityInput = screen.getByLabelText("Quantity value");
      await user.clear(quantityInput);
      await user.type(quantityInput, "10");
      const quantityInputInitialValue = Number.parseInt(quantityInput.value);
      const decreaseQuantityButton = screen.getByLabelText("Decrease quantity");

      await user.click(decreaseQuantityButton);

      expect(quantityInput).toHaveValue(quantityInputInitialValue - 1);

      await user.clear(quantityInput);
      await user.type(quantityInput, "1");

      await user.click(decreaseQuantityButton);
      await user.click(decreaseQuantityButton);

      expect(quantityInput).toHaveValue(1);
    });
  });
});
