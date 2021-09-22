import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import { BackButton } from "./BackButton";
describe("render button to back your location URL after clicked", () => {
  const host = window.location.href.slice(0, -1);
  const fakeUrl = "/fake/path";

  test("if you pass the prop pathTo, will be rendered archon with href", () => {
    render(<BackButton pathTo={fakeUrl} />, { wrapper: MemoryRouter });
    const backButton = screen.getByRole("link");
    userEvent.click(backButton);
    expect(backButton.closest("a")?.href).toBe(host + fakeUrl);
  });

  test("if you do not pass the prop pathTo, will be rendered button with onClick to back your URL by click", () => {
    const browserHistory = createMemoryHistory();
    browserHistory.push(fakeUrl);
    render(<BackButton />, { wrapper: MemoryRouter });
    const backButton = screen.getByRole("button");
    userEvent.click(backButton);
    expect(window.location.pathname).toBe("/");
  });
});
