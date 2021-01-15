import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../store";
import { CoreComponent } from "../Core";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <CoreComponent />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
