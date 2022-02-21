import { element, number, oneOfType, string } from 'prop-types';

export const HeroType = {
  heroImage: string,
  title: oneOfType([string, element]).isRequired,
  subTitle: string,
  titleLevel: number,
};

export default { HeroType };
