import React from 'react';
import BuildingDetails from '.';

const Template = (args) => <BuildingDetails {...args} />;

const buildingDetails = (
  <BuildingDetails
    isLoading={false}
    details={{
      pk: '1',
      county: 'Bucuresti',
      locality: 'Sector 6',
      street_name: 'Str. Dambovita',
      street_number: '10',
      schedule: '10:00 - 18:00',
      test_types: [1, 2, 3],
    }}
  />
);
export const Default = Template.bind({});
Default.args = buildingDetails.props;

export default {
  title: 'BuildingDetails',
  component: BuildingDetails,
  argTypes: { onClose: { action: 'clicked' } },
};
