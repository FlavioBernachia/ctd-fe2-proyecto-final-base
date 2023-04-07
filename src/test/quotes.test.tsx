
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Cita from "../features/quote/Cita";
import citaSlice from "../features/quote/citaSlice";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event"
import { configureStore } from "@reduxjs/toolkit";
import { handlers } from "../Mock/handler";

const server = setupServer(...handlers);

const store = configureStore({
    reducer: {
        cita: citaSlice,
    },
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita component", () => {
    it("Should renders a quote from the API", async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        );

        const input = screen.getByLabelText("Author Cita");
        fireEvent.change(input, { target: { value: "Nelson" } });
        const button = screen.getByLabelText("Obtener Cita");
        fireEvent.click(button);

        const quoteElement = await screen.findByText(
            "Shoplifting is a victimless crime, like punching someone in the dark."
        );
        expect(quoteElement).toBeInTheDocument();
        expect(screen.getByText("Nelson Muntz")).toBeInTheDocument();
    });

    it("Should display quote for valid author", async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        );

        const input = screen.getByLabelText("Author Cita");
        fireEvent.change(input, { target: { value: "Homer Simpson" } });
        const button = screen.getByLabelText("Obtener Cita");
        fireEvent.click(button);

        const quoteElement = await screen.findByText(
            "Gah, stupid sexy Flanders!",
        );
        expect(quoteElement).toBeInTheDocument();
        expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
    });
    it("Should render a error message", async () => {
      render(          

      <Provider store={store}>
        <Cita />
    </Provider>);
    
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      userEvent.type(input, "123");
      const button = await screen.findByText("Obtener Cita");;
      fireEvent.click(button);
      expect(
        await screen.findByText("Por favor ingrese un nombre válido")
      ).toBeInTheDocument();
    });
  });