import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./Home", () => ({ default: () => <>This is home</> }));
vi.mock("./Store", () => ({ default: () => <>This is store</> }));

describe("App component", () => {
  it("should render Home by default", () => {
    render(<App />);

    const homeText = screen.getByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("should routes to Store page when Header Store link is clicked", async () => {
    render(<App />);

    const storeLink = screen.getByRole("link", { name: "Store" });
    await userEvent.click(storeLink);

    const storeText = await screen.findByText("This is store");
    const homeText = screen.queryByText("This is home");

    expect(storeText).toBeInTheDocument();
    expect(homeText).not.toBeInTheDocument();
  });
});
