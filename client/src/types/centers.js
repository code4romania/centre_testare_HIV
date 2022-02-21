import { arrayOf, bool, number, shape, string } from 'prop-types';

export const CenterDetailsTitleType = {
  countyCode: string,
  lat: string,
  lng: string,
  locality: string,
  streetName: string.isRequired,
  streetNumber: string,
  ratings: arrayOf(shape({})),
};

export const CenterDetailsType = {
  isLoading: bool.isRequired,
  details: shape({
    ...CenterDetailsTitleType,
    schedule: string,
    testTypes: arrayOf(number),
  }),
};

export default { CenterDetailsTitleType };
