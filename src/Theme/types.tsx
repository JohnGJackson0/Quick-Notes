import { ColorsType } from '../../constants/Colors';

export interface ThemeContext {
  colors: ColorsType;
  setColor: (colors: ColorsType) => void;
}
