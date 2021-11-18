import { renderHook } from '@testing-library/react-hooks';
import { getThemeColor } from '../getTheme';

describe('useThemeColor', () => {
  it('returns dark theme when not specified', () => {
    const { result } = renderHook(() => getThemeColor('background'));

    expect(result.current).toBe('#rgb(24,32,42)');
  });
});
