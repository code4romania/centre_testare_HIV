import { arrayOf, bool, number, shape, string } from 'prop-types';

export const CenterDetailsTitleType = {
  details: shape({
    countyCode: string,
    lat: string,
    lng: string,
    locality: string,
    name: string,
    streetName: string.isRequired,
    streetNumber: string,
    averageRating: number,
    totalRatings: number,
  }),
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
