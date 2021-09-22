import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import { BackButton } from "./BackButton";
describe("test render BackButton component", () => {
  const host = window.location.href.slice(0, -1);
  const fakeUrl = "/fake/path";

  test("After passed prop (pathTo) to component, should render archon element", () => {
    render(<BackButton pathTo={fakeUrl} />, { wrapper: MemoryRouter });
    const backButton = screen.getByRole("link");
    userEvent.click(backButton);
    expect(backButton.closest("a")?.href).toBe(host + fakeUrl);
  });

  test("If the prop will be miss, should generate button with action. The action after click must get user to previous page", () => {
    const browserHistory = createMemoryHistory();
    browserHistory.push(fakeUrl);
    render(<BackButton />, { wrapper: MemoryRouter });
    const backButton = screen.getByRole("button");
    userEvent.click(backButton);
    expect(window.location.pathname).toBe("/");
  });
});
