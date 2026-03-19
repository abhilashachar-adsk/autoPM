import { useEffect, useRef, useState } from 'react';
import {
  createTheme,
  densities,
  getTheme,
  Theme,
  themes
} from '@weave-mui/material';

type ThemeKey = keyof typeof themes;
type ThemeValue = typeof themes[ThemeKey];

type DensityKey = keyof typeof densities;
type DensityValue = typeof densities[DensityKey];

const useWeaveTheme = (
  theme: ThemeValue,
  density: DensityValue
): [Theme, boolean] => {
  const muiTheme = createTheme();
  const mergedTheme = useRef<Theme>(muiTheme);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTokens() {
      const weaveTheme = await getTheme(theme, density);
      mergedTheme.current = createTheme(mergedTheme.current, weaveTheme);
      setInitialized(true);
    }
    fetchTokens();
  }, [theme, density]);

  return [mergedTheme.current, initialized];
};

export default useWeaveTheme;
