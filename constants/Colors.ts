export interface ColorsType {
  primary: string;
  text: string;
  background: string;
  textBackground: string;
  tint: string;
  card: string;
  hover: string;
  secondaryText: string;
  button: string;
  completedBackground: string;
  completedPrimary: string;
}

const primary = '#463FB0';

const dark: ColorsType = {
  primary,
  text: '#FFFFFF',
  background: '#rgb(24,32,42)',
  textBackground: '#283340',
  tint: primary,
  card: '#192734',
  hover: '#22303C',
  secondaryText: '#8899A6',
  button: '#47A1EB',
  completedBackground: primary,
  completedPrimary: '#FFFFFF',
};

const light: ColorsType = {
  primary,
  text: '#4A5784',
  background: '#F2F2F2',
  textBackground: '#000000',
  tint: primary,
  card: '#000000',
  hover: '#22303C',
  secondaryText: '#4A5784',
  button: '#463FB0',
  completedBackground: primary,
  completedPrimary: '#FFFFFF',
};

// eslint-disable-next-line no-shadow
export const enum varients {
  LIGHT = 'light',
  DARK = 'dark',
}

const theme = new Map([
  [varients.DARK, dark],
  [varients.LIGHT, light],
]);

export default function getColors(): Map<varients, ColorsType> {
  return theme;
}
