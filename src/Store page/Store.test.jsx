import { render, screen } from "@testing-library/react";
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Store from "./Store";
import routes from "../routes";
import userEvent from "@testing-library/user-event";

vi.mock("./Products", () => ({
  default: function MockProducts() {
    const { category } = useParams();

    switch (category) {
      case "men's clothing":
        return <>This is men clothing</>;
      case "women's clothing":
        return <>This is women clothing</>;
      case "electronics":
        return <>This is electronics</>;
      case "jewelery":
        return <>This is jewelery</>;
      default:
        return <>This is all</>;
    }
  },
}));

describe("Store component", () => {
  it("renders correctly", () => {
    const { container } = render(<Store />, { wrapper: BrowserRouter });

    expect(container).toMatchSnapshot();
  });

  describe("routes to the right Products category when corresponding link is clicked", () => {
    it("routes to men's clothing", async () => {
      const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
      render(<RouterProvider router={router} />);

      const menClothLink = screen.getByRole("link", { name: "Men's Clothing" });
      await userEvent.click(menClothLink);

      const menClothText = await screen.findByText("This is men clothing");

      expect(menClothText).toBeInTheDocument();
    });

    it("routes to women's clothing", async () => {
      const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
      render(<RouterProvider router={router} />);

      const womenClothLink = screen.getByRole("link", {
        name: "Women's Clothing",
      });
      await userEvent.click(womenClothLink);

      const womenClothText = await screen.findByText("This is women clothing");

      expect(womenClothText).toBeInTheDocument();
    });

    it("routes to electronics", async () => {
      const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
      render(<RouterProvider router={router} />);

      const electronicsLink = screen.getByRole("link", { name: "Electronics" });
      await userEvent.click(electronicsLink);

      const electronicsText = await screen.findByText("This is electronics");

      expect(electronicsText).toBeInTheDocument();
    });

    it("routes to jewelery", async () => {
      const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
      render(<RouterProvider router={router} />);

      const jeweleryLink = screen.getByRole("link", { name: "Jewelery" });
      await userEvent.click(jeweleryLink);

      const jeweleryText = await screen.findByText("This is jewelery");

      expect(jeweleryText).toBeInTheDocument();
    });

    it("routes to show all products", async () => {
      const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
      render(<RouterProvider router={router} />);

      const viewAllLink = screen.getByRole("link", { name: "View All" });
      await userEvent.click(viewAllLink);

      const allText = await screen.findByText("This is all");

      expect(allText).toBeInTheDocument();
    });
  });
});
