import * as React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import theme from '../../config/theme.style';
import StyledText from '../StyledText';

const {width, height} = Dimensions.get('window');

interface Props {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: any;
  outlined?: boolean;
  onPress?: () => any | null | undefined;
  disabled?: boolean;
  noShadow?: boolean;
  small?: boolean;
  large?: boolean;
  numberOfLines?: number;
}

const StyledButton: React.FC<Props> = ({
  title,
  titleStyle,
  containerStyle,
  onPress,
  disabled,
  outlined,
  icon,
  noShadow,
  small,
  large,
  numberOfLines,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        outlined && styles.outlinedContainer,
        disabled &&
          (outlined
            ? styles.disabledOutlinedContainer
            : styles.disabledContainer),
        containerStyle,
        !disabled && !noShadow && {...theme.DEFAULT_SHADOW},
        small && styles.small,
        large && styles.large,
      ]}
      onPress={onPress}>
      {icon && icon}
      {title ? (
        <StyledText
          bold
          numberOfLines={numberOfLines ? numberOfLines : 0}
          style={[
            styles.text,
            outlined && styles.outlinedText,
            outlined && disabled && styles.disabledOutlinedText,
            titleStyle,
            large && {fontSize: theme.FONT_SIZE_LARGE},
          ]}>
          {title}
        </StyledText>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    minWidth: theme.DEFAULT_HEIGHT / 1.5,
    minHeight: theme.DEFAULT_HEIGHT / 2,
    borderRadius: theme.DEFAULT_HEIGHT / 4,
    padding: theme.DEFAULT_MARGIN / 2,
    flexDirection: 'row',
  },
  small: {
    minHeight: (theme.DEFAULT_HEIGHT * 2) / 3,
    paddingHorizontal: (theme.DEFAULT_MARGIN * 2) / 3,
    paddingVertical: theme.DEFAULT_MARGIN / 3,
  },
  large: {
    borderRadius: theme.DEFAULT_BORDER_RADIUS * 1.5,
    paddingVertical: theme.DEFAULT_MARGIN,
  },
  outlinedContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
  },
  disabledContainer: {
    backgroundColor: theme.GRAY_1_COLOR,
  },
  disabledOutlinedContainer: {
    borderColor: theme.GRAY_1_COLOR,
  },
  text: {
    color: 'white',
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign: 'center',
  },
  disabledOutlinedText: {
    color: theme.GRAY_1_COLOR,
  },
  outlinedText: {
    color: theme.PRIMARY_COLOR,
  },
  icon: {
    position: 'absolute',
  },
});

export default StyledButton;
