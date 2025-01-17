import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("../pages/home/Home", () => ({ default: () => <>This is home</> }));
vi.mock("../pages/store/Store", () => ({ default: () => <>This is store</> }));
vi.mock("../pages/cart/Cart", () => ({ default: () => <>This is cart</> }));

describe("App component", () => {
  it("should render Home by default", () => {
    render(<App />);

    const homeText = screen.getByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("should routes to Store page when Header Store link is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const storeLink = screen.getByRole("link", { name: "Store" });
    await user.click(storeLink);

    const storeText = await screen.findByText("This is store");
    const homeText = screen.queryByText("This is home");

    expect(storeText).toBeInTheDocument();
    expect(homeText).not.toBeInTheDocument();
  });

  it("should routes to Cart page when CartModal link is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const cartButton = screen.getByRole("button", { name: /Cart/i });
    await user.click(cartButton);

    const cartLink = await screen.findByRole("link", {
      name: /View or Edit Your Cart/i,
    });
    await user.click(cartLink);

    const cartText = await screen.findByText("This is cart");
    const homeText = screen.queryByText("This is home");

    expect(cartText).toBeInTheDocument();
    expect(homeText).not.toBeInTheDocument();
  });
});
