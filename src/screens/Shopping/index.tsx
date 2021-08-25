import {View, FlatList, StyleSheet} from 'react-native';
import * as React from 'react';
import theme from '../../config/theme.style';
import StyledText from '../../components/StyledText';
import StyledButton from '../../components/StyledButton';
import FirebaseService from '../../services/FirebaseService';
import {
  ShoppingCountersInterface,
  ShoppingDataInterface,
} from '../../services/database';
import AddModal from './AddModal';
import ShoppingCard from './ShoppingCard';

const Shopping = () => {
  const firebaseService = FirebaseService.getInstance();

  const [loading, setLoading] = React.useState(false);
  const [shoppingCount, setShoppingCount] = React.useState<number>(0);
  const [allShoppingList, setAllShoppingLists] = React.useState<
    Array<ShoppingDataInterface>
  >([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [shoppingData, setShoppingData] = React.useState<ShoppingDataInterface>(
    {},
  );

  React.useEffect(() => {
    getShoppingCount();
    fetchShoppingLists();
    return () => {
      firebaseService.shoppingListsObserveRemove();
      firebaseService.shoppingCountersObserveRemove();
    };
  }, []);

  const fetchShoppingLists = () => {
    setLoading(true);
    firebaseService.fetchShoppingLists((info: Array<ShoppingDataInterface>) => {
      setLoading(false);
      setAllShoppingLists(info);
    });
  };

  const getShoppingCount = () => {
    firebaseService.fetchShoppingCount(
      (info: Array<ShoppingCountersInterface>) => {
        if (info.length) {
          setShoppingCount(info[0].shopping_count);
        }
      },
    );
  };

  const openModalForShopping = () => {
    setShoppingData({});
    setOpenModal(true);
  };

  const setShoppingValue = (value: ShoppingDataInterface) => {
    setShoppingData(value);
  };

  const onConfirmPress = () => {
    if (shoppingData.item_name && shoppingData.item_price) {
      setLoading(true);
      firebaseService.addShopping(shoppingData).then(() => {
        setOpenModal(false);
        setLoading(false);
      });
    }
  };

  const onCancelPress = () => {
    setOpenModal(false);
  };

  const deleteShopping = (item: ShoppingDataInterface) => {
    firebaseService.deleteShopping(item.document_id);
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <StyledText>
          Shopping List&nbsp;&nbsp;&nbsp;
          <StyledText bold primaryColor>
            {shoppingCount}
          </StyledText>
        </StyledText>
        <StyledButton title="+" onPress={openModalForShopping} />
      </View>
      <FlatList
        data={allShoppingList}
        renderItem={({item}) => {
          return <ShoppingCard item={item} onPress={deleteShopping} />;
        }}
        ListFooterComponent={() => {
          return <View style={{height: theme.DEFAULT_MARGIN}} />;
        }}
        keyExtractor={(item: any) => `${item.document_id}`}
      />
      <AddModal
        visible={openModal}
        onConfirmPress={onConfirmPress}
        onCancelPress={onCancelPress}
        value={shoppingData}
        setValue={setShoppingValue}
        btnDisable={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.DEFAULT_MARGIN,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Shopping;
