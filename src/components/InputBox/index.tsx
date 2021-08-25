import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
  Text,
} from 'react-native';
import * as React from 'react';

import InputWrapper from '../InputWrapper';
import StyledText from '../StyledText';
import theme from '../../config/theme.style';

const multilinePaddingTop = 12;
const multilinePaddingBottom = 24;

interface Props {
  title?: string;
  description?: string;
  value?: string;
  onChangeText?: (val?: any) => any;
  meta?: {
    error?: string;
    warning?: string;
    touched?: boolean;
    active?: boolean;
  };
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  showMaxLength?: boolean;
  numberOfVisibleLines?: number;
  onBlur?: (args?: any) => any;
  onFocus?: (args?: any) => any;
  maxLength?: number;
  hideError?: boolean;
  editable?: boolean;
  placeholder?: string;
  keyboardType?: any;
  returnKeyType?: any;
  blurOnSubmit?: any;
  inputRef?: any;
  prefix?: any;
}

const InputBox: React.FC<Props> = ({
  maxLength,
  titleStyle,
  containerStyle,
  textInputStyle,
  title,
  value,
  onChangeText,
  meta,
  showMaxLength,
  description,
  numberOfVisibleLines = 1,
  hideError,
  editable = true,
  placeholder,
  keyboardType,
  returnKeyType,
  blurOnSubmit,
  inputRef,
  prefix,
  ...inputProps
}) => {
  const renderErrorAndInfo = () => {
    let elementsColor: any;
    if (meta?.touched) {
      if (meta?.warning) {
        elementsColor = theme.GRAY_1_COLOR;
      }
      if (meta?.error) {
        elementsColor = theme.ERROR_COLOR;
      }
    }

    const isShowingError = meta?.touched && (meta?.error || meta?.warning);

    return (
      <View style={styles.errorContainer}>
        {isShowingError && (
          <StyledText
            style={{
              color: elementsColor,
              fontSize: 11,
            }}>
            {meta?.error || meta?.warning}
          </StyledText>
        )}
        {!isShowingError && <View />}
        {maxLength && showMaxLength && (
          <StyledText
            style={[
              {
                color: elementsColor,
                fontSize: 11,
              },
              isShowingError ? {marginLeft: 10} : undefined,
            ]}>
            {value.length}/{maxLength}
          </StyledText>
        )}
      </View>
    );
  };

  const multiline = numberOfVisibleLines > 1;
  const showDirty = !meta?.active && value !== '';
  const dirtyStyle = multiline ? styles.dirtyTextMultiline : styles.dirtyText;

  return (
    <InputWrapper
      title={title}
      description={description}
      containerStyle={containerStyle}>
      {prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        style={[
          styles.textInput,
          textInputStyle,
          multiline && {
            paddingTop: multilinePaddingTop,
            paddingBottom: multilinePaddingBottom,
            // fontFamily: theme.PRIMARY_FONT_FAMILY,
            textAlignVertical: 'top',
            height:
              multilinePaddingTop +
              multilinePaddingBottom +
              24 * numberOfVisibleLines,
          },
          showDirty ? dirtyStyle : {},
          !editable ? styles.disabledText : {},
          prefix ? {paddingLeft: 26} : {},
        ]}
        placeholderTextColor={
          editable ? theme.GRAY_1_COLOR : theme.GRAY_2_COLOR
        }
        value={value}
        onBlur={inputProps.onBlur}
        onFocus={inputProps.onFocus}
        onChangeText={onChangeText}
        multiline={numberOfVisibleLines > 1}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        allowFontScaling={false}
        ref={c => {
          inputRef && inputRef(c);
        }}
        placeholder={editable ? placeholder : ''}
        editable={editable}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        blurOnSubmit={blurOnSubmit}
        {...inputProps}
      />
      {!hideError && renderErrorAndInfo()}
    </InputWrapper>
  );
};

export const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 3,
    marginLeft: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 14,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: theme.DEFAULT_BORDER_RADIUS / 2,
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
    // lineHeight: 24,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.GRAY_4_COLOR,
    alignSelf: 'stretch',
    // textAlignVertical: 'top',
    height: theme.DEFAULT_HEIGHT,
    // fontFamily: theme.PRIMARY_FONT_FAMILY,
  },
  dirtyText: {
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
    backgroundColor: 'white',
  },
  dirtyTextMultiline: {
    borderColor: theme.GRAY_1_COLOR,
  },
  disabledText: {
    borderColor: 'transparent',
    color: theme.GRAY_2_COLOR,
    backgroundColor: theme.GRAY_1_COLOR,
  },
  prefix: {
    position: 'absolute',
    left: 0,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.GRAY_4_COLOR,
    zIndex: 99,
    marginTop: theme.DEFAULT_HEIGHT / 2.45,
    marginLeft: 16,
  },
});

export default InputBox;
