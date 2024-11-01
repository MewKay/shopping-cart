import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ActiveProduct from "./ActiveProduct";
import userEvent from "@testing-library/user-event";

//Component props
const product = {
  id: 0,
  title: "Product 0",
  image: "https://image.placeholder.com/product",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus magnam asperiores minus dolores cumque corporis vel dolorem atque non reiciendis.",
  price: 50,
};
const onAddToCart = vi.fn();
const onRemoveActiveProduct = vi.fn();

describe("ActiveProduct component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ActiveProduct
        product={product}
        onAddToCart={onAddToCart}
        onRemoveActiveProduct={onRemoveActiveProduct}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls 'onAddToCart' when the Add to cart button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ActiveProduct
        product={product}
        onAddToCart={onAddToCart}
        onRemoveActiveProduct={onRemoveActiveProduct}
      />
    );

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    await user.click(addToCartButton);

    expect(onAddToCart).toHaveBeenCalled();
  });

  it("calls 'onRemoveActiveProduct' when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ActiveProduct
        product={product}
        onAddToCart={onAddToCart}
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
    it("should have 0 as a default value", async () => {
      render(
        <ActiveProduct
          product={product}
          onAddToCart={onAddToCart}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

      const quantityInput = screen.getByLabelText("Quantity value");

      expect(quantityInput).toHaveValue(0);
    });

    it("increase the value by one when 'Increase quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <ActiveProduct
          product={product}
          onAddToCart={onAddToCart}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

      const quantityInput = screen.getByLabelText("Quantity value");
      const quantityInputInitialValue = Number.parseInt(quantityInput.value);
      const increaseQuantityButton = screen.getByLabelText("Increase quantity");

      await user.click(increaseQuantityButton);

      expect(quantityInput).toHaveValue(quantityInputInitialValue + 1);
    });

    it("decrease the value by one when 'Decrease quantity' button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <ActiveProduct
          product={product}
          onAddToCart={onAddToCart}
          onRemoveActiveProduct={onRemoveActiveProduct}
        />
      );

      const quantityInput = screen.getByLabelText("Quantity value");
      await user.type(quantityInput, "10");
      const quantityInputInitialValue = Number.parseInt(quantityInput.value);
      const decreaseQuantityButton = screen.getByLabelText("Decrease quantity");

      await user.click(decreaseQuantityButton);

      expect(quantityInput).toHaveValue(quantityInputInitialValue - 1);
    });
  });
});
