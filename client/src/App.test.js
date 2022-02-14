import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import * as AppContext from './context';

afterEach(cleanup);

describe('App component', () => {
  it('should render correctly', () => {
    const contextValues = {
      currentLanguage: 'ro',
    };

    jest.spyOn(AppContext, 'useGlobalContext').mockImplementation(() => contextValues);
    const container = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
