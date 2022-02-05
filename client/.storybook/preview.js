import 'antd/dist/antd.css';
import '../src/styles/theme.scss';
import React from 'react';
import { RouterWrapper } from '../src/components/TestUtils';
import { AppContext } from '../src/context';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <AppContext.Provider
      value={{
        searchResults: [
          {
            pk: '1',
            street_name: 'Str. Dambovita',
            street_number: '10',
            county: 'Bucuresti',
            locality: 'Sector 6',
            county_code: 'B'
          },
          {
            pk: '2',
            street_name: 'Str. Dambovita',
            street_number: '12',
            county: 'Bucuresti',
            locality: 'Sector 6',
            county_code: 'B'
          },
          {
            pk: '3',
            street_name: 'Str. Dambovita',
            street_number: '14',
            county: 'Bucuresti',
            locality: 'Sector 6',
            county_code: 'B'
          },
          {
            pk: '4',
            street_name: 'Str. Dambovita',
            street_number: '16',
            county: 'Bucuresti',
            locality: 'Sector 6',
            county_code: 'B'
          },
        ],
      }}
    >
      <RouterWrapper>
        <Story />
      </RouterWrapper>
    </AppContext.Provider>
  ),
];
