import {StyleSheet, View} from 'react-native';
import React from 'react';

import StyledText from '../../components/StyledText';
import theme from '../../config/theme.style';
import * as GlobalService from '../../services/GlobalService';
import {ShoppingDataInterface} from '../../services/database';
import StyledButton from '../../components/StyledButton';

interface Props {
  item: ShoppingDataInterface;
  onPress: (item: ShoppingDataInterface) => void;
}

const ShoppingCard: React.FC<Props> = ({item, onPress}) => {
  return (
    <View style={styles.content}>
      <View style={styles.textContent}>
        <StyledText bold style={styles.textStyle}>
          {item.item_name}
        </StyledText>
        <StyledText bold primaryColor style={styles.textStyle}>
          ${GlobalService.formatedNumber(item.item_price)}
        </StyledText>
      </View>
      <StyledButton title="-" onPress={() => onPress(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: theme.DEFAULT_BORDER_RADIUS / 2,
    marginTop: theme.DEFAULT_MARGIN,
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
    paddingRight: theme.DEFAULT_MARGIN,
  },
  textContent: {
    width: '85%',
    flexDirection: 'column',
    paddingHorizontal: theme.DEFAULT_MARGIN,
    paddingVertical: theme.DEFAULT_MARGIN,
  },
  textStyle: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
});

export default ShoppingCard;
