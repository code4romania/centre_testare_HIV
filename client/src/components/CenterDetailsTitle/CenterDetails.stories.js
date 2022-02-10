import React from 'react';
import { CenterDetailsTitle } from './index';

export default {
  title: 'CenterDetailsTitle',
  component: CenterDetailsTitle,
};

const Template = (args) => <CenterDetailsTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  streetName: 'Nicolina',
};

export const WithStreetNumber = Template.bind({});
WithStreetNumber.args = {
  ...Default.args,
  streetNumber: '30',
};

export const WithLocality = Template.bind({});
WithLocality.args = {
  ...Default.args,
  locality: 'Iasi',
};

export const WithCountyCode = Template.bind({});
WithCountyCode.args = {
  ...Default.args,
  countyCode: 'IS',
};

export const FullAddress = Template.bind({});
FullAddress.args = {
  ...Default.args,
  ...WithStreetNumber.args,
  ...WithLocality.args,
  ...WithCountyCode.args,
};
