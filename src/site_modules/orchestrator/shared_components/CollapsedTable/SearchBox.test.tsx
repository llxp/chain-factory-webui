/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from '@testing-library/react';
import SearchBox from './SearchBox';

afterEach(cleanup)

const SearchBoxMock = () => {
    const handleOnChangeEvent = (text) => {};
    const handleOnFocusEvent = (text) => {};
    return <SearchBox onChange={handleOnChangeEvent} onFocus={handleOnFocusEvent}/>;
};


it('button click changes props', () => {
  const { getByText } = render(<SearchBoxMock/>)

  console.log(getByText("123"));

  expect(getByText(/Moe/i).textContent).toBe("Moe")

  fireEvent.click(getByText("Change Name"))

  expect(getByText(/Steve/i).textContent).toBe("Steve")
})