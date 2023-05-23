import type { ReactNode } from 'react';
import {Text} from 'react-native';
import theme from '../styles';

type HeaderTextProps = {
  style?: Record<string, string>
  children: ReactNode;
}
export const HeaderText = ({children}: HeaderTextProps) => {
  return (
    <Text style={{
      fontSize: theme.fontSize.md,
      fontWeight: "600",
      paddingVertical: theme.spacing.base,
    }}>{children}</Text>
  )
}
