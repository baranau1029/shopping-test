import * as React from 'react';
import {ViewProps} from 'react-native';
import theme from '../../config/theme.style';
import StyledModal from '../../components/StyledModal';
import InputBox from '../../components/InputBox';
import {ShoppingDataInterface} from '../../services/database';

interface Props extends ViewProps {
  visible: boolean;
  onConfirmPress: () => void;
  onCancelPress: () => void;
  value: ShoppingDataInterface;
  setValue: (value: ShoppingDataInterface) => void;
  btnDisable?: boolean;
}

const AddModal: React.FC<Props> = ({
  visible,
  onConfirmPress,
  onCancelPress,
  value,
  setValue,
  btnDisable,
  ...props
}) => {
  return (
    <StyledModal
      visible={visible}
      title={'Add a shopping cart.'}
      confirmBtnText={'Okay'}
      cancelBtnText={'Cancel'}
      onConfirmPress={() => onConfirmPress()}
      onCancelPress={() => onCancelPress()}
      btnDisable={btnDisable}>
      <InputBox
        placeholder="Item Name"
        value={value.item_name}
        meta={{error: undefined, touched: true}}
        onChangeText={text => setValue({...value, item_name: text})}
        containerStyle={{marginTop: (theme.DEFAULT_MARGIN * 2) / 3}}
      />
      <InputBox
        placeholder="Item Price"
        value={value.item_price}
        meta={{error: undefined, touched: true}}
        onChangeText={text => setValue({...value, item_price: text})}
        keyboardType={'numeric'}
        containerStyle={{marginTop: (theme.DEFAULT_MARGIN * 2) / 3}}
        returnKeyType="done"
      />
    </StyledModal>
  );
};

export default AddModal;
