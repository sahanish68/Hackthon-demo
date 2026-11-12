import { Platform } from 'react-native';

export const colors = {
  background: '#FCFBF7',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F0E8',
  surfaceGreen: '#E8F4EE',
  text: '#1C2823',
  textMuted: '#68736D',
  textSoft: '#8D9791',
  primary: '#176B52',
  primaryDark: '#0E4E3B',
  primarySoft: '#DDEFE6',
  border: '#E2E5E0',
  danger: '#C94D47',
  dangerSoft: '#FBE8E5',
  warning: '#9A6A1E',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radii = {
  sm: 12,
  md: 18,
  lg: 26,
  pill: 999,
} as const;

export const typography = {
  eyebrow: 12,
  body: 16,
  bodyLarge: 19,
  title: 32,
  section: 22,
  button: 17,
} as const;

export const shadow = Platform.select({
  ios: {
    shadowColor: '#15382A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  android: {
    elevation: 3,
  },
  default: {},
});
