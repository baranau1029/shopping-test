import * as React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';
import theme from '../../config/theme.style';

interface Props extends TextProps {
  secondary?: boolean;
  bold?: boolean;
  primaryColor?: boolean;
}

const StyledText: React.FunctionComponent<Props> = ({
  secondary,
  bold,
  style,
  primaryColor,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        style,
        bold && styles.bold,
        primaryColor && styles.primaryColor,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.GRAY_3_COLOR,
  },
  bold: {
    fontWeight: 'bold',
  },
  primaryColor: {
    color: theme.PRIMARY_COLOR,
  },
});

export default StyledText;
