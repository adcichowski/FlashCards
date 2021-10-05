import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import { AuthProvider } from "../../Context/AuthContext";
import { ModalProvider } from "../../Context/ModalContext";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
describe("testing functionality of form component", () => {
  const { container } = render(
    <AuthProvider>
      <ModalProvider>
        <Form type="login" />
      </ModalProvider>
    </AuthProvider>,
    { wrapper: MemoryRouter }
  );
  const { queryAllByRole } = screen;
  test("should render form and inputs must required", async () => {
    //add tests with inputs
  });
});
