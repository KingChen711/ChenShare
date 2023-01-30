import {
  DirectionsCar,
  FitnessCenter,
  Park,
  ColorLens,
  Tour,
  FormatQuote,
  Pets,
  Restaurant,
  SportsEsports,
  Theaters,
  Work,
  Face,
} from '@mui/icons-material';

export const URL_API = 'https://chen-share-api.up.railway.app';
// export const URL_API = 'https://zany-rose-whale-gear.cyclic.app';
// export const URL_API = 'http://localhost:5000';

export const categories = [
  {
    value: 'cars',
    icon: <DirectionsCar />,
  },
  {
    value: 'fitness',
    icon: <FitnessCenter />,
  },
  {
    value: 'nature',
    icon: <Park />,
  },
  {
    value: 'art',
    icon: <ColorLens />,
  },
  {
    value: 'travel',
    icon: <Tour />,
  },
  {
    value: 'quotes',
    icon: <FormatQuote />,
  },
  {
    value: 'pet',
    icon: <Pets />,
  },
  {
    value: 'food',
    icon: <Restaurant />,
  },
  {
    value: 'game',
    icon: <SportsEsports />,
  },
  {
    value: 'films',
    icon: <Theaters />,
  },
  {
    value: 'work',
    icon: <Work />,
  },
  {
    value: 'selfie',
    icon: <Face />,
  },
];
