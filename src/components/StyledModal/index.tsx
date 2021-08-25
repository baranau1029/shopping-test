import {View, StyleSheet, Modal, Dimensions} from 'react-native';
import * as React from 'react';

import StyledButton from '../../components/StyledButton';
import StyledText from '../../components/StyledText';
import theme from '../../config/theme.style';
import {getRGBAfterOpacity} from '../../services/ColorUtils';
const {width, height} = Dimensions.get('window');

interface Props {
  title?: string;
  text?: string;
  confirmBtnText: string;
  cancelBtnText?: string;
  onConfirmPress: () => any;
  onCancelPress?: any;
  children?: any;
  visible: boolean;
  btnDisable?: boolean;
  position?: string;
}

const StyledModal: React.FC<Props> = ({
  title,
  text,
  confirmBtnText,
  cancelBtnText,
  onConfirmPress,
  onCancelPress,
  children,
  visible,
  btnDisable,
  position,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={[
          styles.centeredView,
          position === 'top' && {justifyContent: 'flex-start'},
        ]}>
        <View
          style={[
            styles.modalView,
            position === 'top' && {marginTop: theme.DEFAULT_MARGIN * 7},
          ]}>
          {title && (
            <StyledText
              bold
              style={{
                fontSize: theme.FONT_SIZE_X_LARGE,
                marginTop: theme.DEFAULT_MARGIN / 2,
              }}>
              {title}
            </StyledText>
          )}
          {text && (
            <StyledText style={{marginVertical: theme.DEFAULT_MARGIN / 2}}>
              {text}
            </StyledText>
          )}
          {children}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: theme.DEFAULT_MARGIN,
              marginBottom: theme.DEFAULT_MARGIN / 2,
            }}>
            <StyledButton
              onPress={() => onConfirmPress()}
              title={confirmBtnText}
              disabled={btnDisable}
              containerStyle={{width: (width - theme.DEFAULT_MARGIN * 4) / 2}}
              numberOfLines={1}
            />
            {cancelBtnText && (
              <StyledButton
                onPress={() => onCancelPress()}
                title={cancelBtnText}
                disabled={false}
                outlined={true}
                containerStyle={{
                  width: (width - theme.DEFAULT_MARGIN * 4) / 2,
                  marginLeft: theme.DEFAULT_MARGIN / 2,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getRGBAfterOpacity(theme.GRAY_4_COLOR, 0.75),
  },
  modalView: {
    width: width - theme.DEFAULT_MARGIN * 2,
    margin: theme.DEFAULT_MARGIN,
    backgroundColor: 'white',
    borderRadius: theme.DEFAULT_BORDER_RADIUS / 2,
    padding: theme.DEFAULT_MARGIN,
    ...theme.DEFAULT_SHADOW,
  },
});

export default StyledModal;
