import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import routes from "../../routes";

vi.mock("../store/Store", () => ({
  default: () => <>This is store</>,
}));

describe("Home component", () => {
  it("renders welcome title, store description and going to store link", () => {
    const { container } = render(<Home />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });

  it("routes to store page when Home Store link is clicked", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    const storeLink = screen.getByRole("link", { name: /go to store/i });
    await userEvent.click(storeLink);

    const storeText = await screen.findByText("This is store");

    expect(storeText).toBeInTheDocument();
  });
});
