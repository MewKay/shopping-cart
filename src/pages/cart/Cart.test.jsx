import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";

//Mock Outlet Context
let itemNumber = 3;
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

vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouterDom = await importOriginal();

  return {
    ...reactRouterDom,
    useOutletContext: vi.fn(() => ({
      itemNumber,
      orderSubtotal,
      cart,
    })),
  };
});

vi.mock("./CartItem", () => ({
  default: ({ cartItem }) => (
    <li>
      <img src={cartItem.productDetails.image} alt="" />
      <p>{cartItem.productDetails.title}</p>
      <p>{cartItem.productDetails.category}</p>
      <p>{cartItem.productDetails.price}</p>
      <p>{cartItem.quantity}</p>
      <p>{cartItem.productDetails.price * cartItem.quantity}</p>
    </li>
  ),
}));

describe("Cart component", () => {
  it("renders correctly", () => {
    const { container } = render(<Cart />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });

  it("adds plural on 'item' text if more than 1", () => {
    render(<Cart />, { wrapper: MemoryRouter });

    const itemText = screen.getByText(/items/);

    expect(itemText).toBeInTheDocument();
  });

  it("does not add plural on 'item' text if 1 or less", () => {
    itemNumber = 1;
    render(<Cart />, { wrapper: MemoryRouter });

    const itemText = screen.getByText(/item(?= |$)/);

    expect(itemText).toBeInTheDocument();
  });
});
