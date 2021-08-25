import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

import StyledText from '../StyledText';

import theme from '../../config/theme.style';

interface Props {
  title?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

const InputWrapper: React.FC<Props> = ({
  title,
  titleStyle,
  description,
  descriptionStyle,
  containerStyle,
  children,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!!title && (
        <StyledText bold style={[styles.title, titleStyle]}>
          {title}
        </StyledText>
      )}
      {!!description && <StyledText style={[styles.description, descriptionStyle]}>{description}</StyledText>}
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  title: {
    fontSize: theme.FONT_SIZE_SMALL,
    lineHeight: 21,
    marginBottom: 8,
  },
  description: {
    marginBottom: 6,
    lineHeight: 21,
  },
});

export default InputWrapper;
