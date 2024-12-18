// utils/cn.ts (or any other file you prefer)
import { Platform } from 'react-native';

// A utility function for combining class names conditionally, similar to classnames
export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
