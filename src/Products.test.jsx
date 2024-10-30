import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

vi.mock("./fetchProducts", () => ({
  default: vi.fn((category) => {
    const resolvedData = [
      { id: 1, title: "Product 1", category: "men's clothing" },
      { id: 2, title: "Product 2", category: "women's clothing" },
      { id: 3, title: "Product 3", category: "jewelery" },
      { id: 4, title: "Product 4", category: "electronics" },
      { id: 5, title: "Product 5", category: "electronics" },
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
  describe("Category filters Product Card lists", () => {
    it.each([
      {
        categoryFilter: "All",
        expectedLength: 5,
        expectedProductsTitles: [
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5",
        ],
      },
      {
        categoryFilter: "Men's Clothing",
        expectedLength: 1,
        expectedProductsTitles: ["Product 1"],
      },
      {
        categoryFilter: "Women's Clothing",
        expectedLength: 1,
        expectedProductsTitles: ["Product 2"],
      },
      {
        categoryFilter: "Jewelery",
        expectedLength: 1,
        expectedProductsTitles: ["Product 3"],
      },
      {
        categoryFilter: "Electronics",
        expectedLength: 2,
        expectedProductsTitles: ["Product 4", "Product 5"],
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
});
