import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

vi.mock("./fetchProducts", () => ({
  default: vi.fn((category) => {
    const resolvedData = [
      { id: 1, title: "Product 1", category: "men's clothing" },
      { id: 2, title: "Product 2", category: "men's clothing" },
      { id: 3, title: "Product 3", category: "men's clothing" },
      { id: 4, title: "Product 4", category: "women's clothing" },
      { id: 5, title: "Product 5", category: "women's clothing" },
      { id: 6, title: "Product 6", category: "women's clothing" },
      { id: 7, title: "Product 7", category: "women's clothing" },
      { id: 8, title: "Product 8", category: "jewelery" },
      { id: 9, title: "Product 9", category: "jewelery" },
      { id: 10, title: "Product 10", category: "electronics" },
      { id: 11, title: "Product 11", category: "electronics" },
      { id: 12, title: "Product 12", category: "electronics" },
    ];

    return category === "all"
      ? resolvedData
      : resolvedData.filter((data) => data.category === category);
  }),
}));

vi.mock("./ProductCard", () => ({
  default: ({ title }) => <li>{title}</li>,
}));

const assertProductsLength = async function assertProductCardsLengthByCategory(
  user,
  categoryFilter,
  expectedLength
) {
  const filterButton = screen.getByRole("button", {
    name: categoryFilter,
  });
  await user.click(filterButton);
  const productCardList = await screen.findAllByText(/Product \d/i);

  expect(productCardList).toHaveLength(expectedLength);
};

const assertProductsTitle = async function assertProductCardsTitleByCategory(
  user,
  categoryFilter,
  ...expectedTitles
) {
  const filterButton = screen.getByRole("button", {
    name: categoryFilter,
  });
  await user.click(filterButton);

  for (const expectedTitle of expectedTitles) {
    const productCardTitle = await screen.findByText(expectedTitle);
    expect(productCardTitle).toBeInTheDocument();
  }
};

describe("Products Component", () => {
  it("should display a loading message by default", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/store/all"],
    });
    render(<RouterProvider router={router} />);

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  describe("Category filters Product Card lists", () => {
    it.each([
      {
        categoryFilter: "All",
        expectedLength: 12,
        expectedProductsTitles: [
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5",
          "Product 6",
          "Product 7",
          "Product 8",
          "Product 9",
          "Product 10",
          "Product 11",
          "Product 12",
        ],
      },
      {
        categoryFilter: "Men's Clothing",
        expectedLength: 3,
        expectedProductsTitles: ["Product 1", "Product 2", "Product 3"],
      },
      {
        categoryFilter: "Women's Clothing",
        expectedLength: 4,
        expectedProductsTitles: [
          "Product 4",
          "Product 5",
          "Product 6",
          "Product 7",
        ],
      },
      {
        categoryFilter: "Jewelery",
        expectedLength: 2,
        expectedProductsTitles: ["Product 8", "Product 9"],
      },
      {
        categoryFilter: "Electronics",
        expectedLength: 3,
        expectedProductsTitles: ["Product 10", "Product 11", "Product 12"],
      },
    ])(
      "should render filtered on $categoryFilter filter click",
      async ({ categoryFilter, expectedLength, expectedProductsTitles }) => {
        const router = createMemoryRouter(routes, {
          initialEntries: ["/store/all"],
        });
        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        await assertProductsLength(user, categoryFilter, expectedLength);
        await assertProductsTitle(
          user,
          categoryFilter,
          ...expectedProductsTitles
        );
      }
    );
  });

  describe("Search products within the category", () => {
    it.each([
      {
        categoryName: "All",
        categoryRoute: "/store/all",
        expectedOutputProduct: "Product 3",
        notExpectedOutputProduct: "Product 1",
      },
      {
        categoryName: "Men's Clothing",
        categoryRoute: "/store/men's clothing",
        expectedOutputProduct: "Product 1",
        notExpectedOutputProduct: "Product 2",
      },
      {
        categoryName: "Women's Clothing",
        categoryRoute: "/store/women's clothing",
        expectedOutputProduct: "Product 5",
        notExpectedOutputProduct: "Product 7",
      },
      {
        categoryName: "Jewelery",
        categoryRoute: "/store/jewelery",
        expectedOutputProduct: "Product 8",
        notExpectedOutputProduct: "Product 9",
      },
      {
        categoryName: "Electronics",
        categoryRoute: "/store/electronics",
        expectedOutputProduct: "Product 11",
        notExpectedOutputProduct: "Product 12",
      },
    ])(
      "should render $expectedOutputProduct and not $notExpectedOutputProduct if inside $categoryName category",
      async ({
        categoryRoute,
        expectedOutputProduct,
        notExpectedOutputProduct,
      }) => {
        const router = createMemoryRouter(routes, {
          initialEntries: [categoryRoute],
        });
        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const searchBar = screen.getByPlaceholderText(
          "Search for a product..."
        );
        const notToOutputProduct = await screen.findByText(
          notExpectedOutputProduct
        );

        await user.type(searchBar, expectedOutputProduct);

        let outputProduct = await screen.findByText(expectedOutputProduct);

        expect(outputProduct).toBeInTheDocument();
        expect(notToOutputProduct).not.toBeInTheDocument();
      }
    );

    it("should display a no match message when no products'title is available", async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/store/all"],
      });
      const user = userEvent.setup();

      render(<RouterProvider router={router} />);

      const searchBar = screen.getByPlaceholderText("Search for a product...");
      await user.type(searchBar, "Not a Pr0duct 9898");

      const productCardList = screen.queryAllByText(/Product \d/i);
      const noMatchText = screen.getByText(
        "Sorry, no products match your search. Please try adjusting your filters or search terms."
      );

      expect(productCardList).toHaveLength(0);
      expect(noMatchText).toBeInTheDocument();
    });
  });
});
