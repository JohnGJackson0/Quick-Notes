export interface ColorsType {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  text: string;
  textSecondary: string;
  hover: string;
  secondaryText: string;
  button: string;
}

export const DARK: ColorsType = {
  primary: '#F54B64',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#B00020',
  text: '#E1E1E1',
  textSecondary: '#808080',
  hover: '#22303C',
  secondaryText: '#8899A6',
  button: '#47A1EB',
};

export const LIGHT: ColorsType = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#4A5784',
  textSecondary: '#808080',
  hover: '#22303C',
  secondaryText: '#4A5784',
  button: '#463FB0',
};
