import getColors, { ColorsType, varients } from '../../constants/Colors';

//active should be changed in app using redux themeSlice
const active = varients.DARK;

export function getThemeColors(): ColorsType {
  return getColors().get(active) as ColorsType;
}

export function getThemeColor(colorName: keyof ColorsType): string {
  return getThemeColors()[colorName];
}
