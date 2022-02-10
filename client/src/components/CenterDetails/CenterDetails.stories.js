import React from 'react';
import { CenterDetails } from './index';

export default {
  title: 'CenterDetails',
  component: CenterDetails,
  argTypes: { onClose: { action: 'clicked' } },
};

const Template = (args) => <CenterDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  details: {
    pk: '1',
    county: 'Bucuresti',
    locality: 'Sector 6',
    streetName: 'Str. Dambovita',
    streetNumber: '10',
    schedule: '10:00 - 18:00',
    testTypes: [1, 2, 3],
    website: 'https://www.google.ro/maps/',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  isLoading: false,
  details: {
    pk: '1',
    county: 'Bucuresti',
    locality: 'Sector 6',
    streetName: 'Str. Dambovita',
    streetNumber: '10',
  },
};
