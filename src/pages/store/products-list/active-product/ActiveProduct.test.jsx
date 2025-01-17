import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ActiveProduct from "./ActiveProduct";
import userEvent from "@testing-library/user-event";

//Mock Outlet Context
const cart = [
  {
    productDetails: {
      id: 0,
    },
    quantity: 3,
  },
  {
    productDetails: {
      id: 1,
    },
    quantity: 2,
  },
  {
    productDetails: {
      id: 2,
    },
    quantity: 9,
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

// Mock browser API
window.scrollTo = vi.fn();

//Component props
const product = {
  id: 3,
  title: "Product 0",
  image: "https://image.placeholder.com/product",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus magnam asperiores minus dolores cumque corporis vel dolorem atque non reiciendis.",
  price: 50,
};
const onRemoveActiveProduct = vi.fn();

describe("ActiveProduct component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ActiveProduct
        product={product}
        onRemoveActiveProduct={onRemoveActiveProduct}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls 'onRemoveActiveProduct' when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ActiveProduct
        product={product}
        onRemoveActiveProduct={onRemoveActiveProduct}
      />
    );

    const closeActiveProductButton = screen.getByLabelText(
      "Close selected product"
    );
    await user.click(closeActiveProductButton);

    expect(onRemoveActiveProduct).toHaveBeenCalled();
  });

  describe("Product quantity", () => {
    it("should have 1 as a default value", async () => {
      render(
        <ActiveProduct
          product={product}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

      const quantityInput = screen.getByLabelText("Quantity value");

      expect(quantityInput).toHaveValue(1);
    });

    it("increase the value by one when 'Increase quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <ActiveProduct
          product={product}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

      const quantityInput = screen.getByLabelText("Quantity value");
      const quantityInputInitialValue = Number.parseInt(quantityInput.value);
      const increaseQuantityButton = screen.getByLabelText("Increase quantity");

      await user.click(increaseQuantityButton);

      expect(quantityInput).toHaveValue(quantityInputInitialValue + 1);
    });

    it("decrease the value by one but not under 1 when 'Decrease quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <ActiveProduct
          product={product}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

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

  it("calls setToCart with the right arguments when clicked", async () => {
    const user = userEvent.setup();
    render(
      <ActiveProduct
        product={product}
        onRemoveActiveProduct={onRemoveActiveProduct}
      />
    );

    const currentQuantity = Number.parseInt(
      screen.getByLabelText("Quantity value").value
    );
    const addToCartButton = screen.getByRole("button", {
      name: "Add to cart",
    });
    await user.click(addToCartButton);

    expect(setCart).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          productDetails: product,
          quantity: currentQuantity,
        },
      ])
    );
  });
});
