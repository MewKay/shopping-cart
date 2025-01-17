import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import routes from "../../routes";

vi.mock("../home/Home", () => ({
  default: () => <>This is home</>,
}));

describe("ErrorPage component", () => {
  it("renders correctly", () => {
    const { container } = render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });

  it("routes back to Home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/missing-page"],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    const homeLink = screen.getByRole("link", { name: /Go Back Home/i });
    await user.click(homeLink);

    const homeText = await screen.findByText("This is home");
    expect(homeText).toBeInTheDocument();
  });
});
