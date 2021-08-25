import firestore from '@react-native-firebase/firestore';
import {isLive} from '../config/appConfig';
import {ShoppingCountersInterface, ShoppingDataInterface} from './database';
import * as GlobalService from './GlobalService';

export default class FirebaseService {
  kShoppingListsCollectionName = 'shopping_lists';
  kShoppingCountersCollectionName = 'shopping_counters';

  firestore;

  public static sharedInstance?: FirebaseService = undefined;

  public static getInstance(): FirebaseService {
    if (this.sharedInstance === undefined) {
      this.sharedInstance = new FirebaseService();
    }
    return this.sharedInstance;
  }

  shoppingListsListener: any = null;
  shoppingCounterListener: any = null;

  constructor() {
    this.firestore = firestore();
  }

  getCollection(collectionName: string) {
    if (isLive) {
      return this.firestore.collection(`live_${collectionName}`);
    } else {
      return this.firestore.collection(`test_${collectionName}`);
    }
  }

  shoppingListsCollection() {
    return this.getCollection(this.kShoppingListsCollectionName);
  }

  shoppingCountersCollection() {
    return this.getCollection(this.kShoppingCountersCollectionName);
  }

  shoppingListsObserveRemove() {
    if (this.shoppingListsListener) {
      this.shoppingListsListener();
      this.shoppingListsListener = null;
    }
  }

  shoppingCountersObserveRemove() {
    if (this.shoppingCounterListener) {
      this.shoppingCounterListener();
      this.shoppingCounterListener = null;
    }
  }

  addShopping(data: ShoppingDataInterface) {
    const ref = this.shoppingListsCollection().doc();
    data.created_at = firestore.FieldValue.serverTimestamp();
    return new Promise((resolve, reject) => {
      ref.set(data).then(() => {
        this.updateShoppingCount(true);
        resolve(ref.id);
      });
    });
  }

  deleteShopping(id: string | undefined) {
    const ref = this.shoppingListsCollection().doc(id);
    return new Promise((resolve, reject) => {
      ref.delete().then(snapshot => {
        this.updateShoppingCount(false);
        resolve(id);
      });
    });
  }

  fetchShoppingLists(onChange: (value: any) => void) {
    let ref = this.shoppingListsCollection().orderBy('created_at', 'desc');
    return (this.shoppingListsListener = ref.onSnapshot(value => {
      const result: any = [];
      value.forEach(snapshot => {
        const data = snapshot.data();
        if (data) {
          data.document_id = snapshot.id;
        }
        result.push(data);
      });

      onChange(result);
    }));
  }

  fetchShoppingCount(onChange: (value: any) => void) {
    let ref = this.shoppingCountersCollection();
    return (this.shoppingCounterListener = ref.onSnapshot(value => {
      const result: any = [];
      value.forEach(snapshot => {
        const data = snapshot.data();
        if (data) {
          data.document_id = snapshot.id;
        }
        result.push(data);
      });

      onChange(result);
    }));
  }

  updateShoppingCount(type: boolean) {
    const {getNotNULLNumber} = GlobalService;
    return this.firestore
      .runTransaction(transaction => {
        const ref = this.shoppingCountersCollection().doc(
          this.kShoppingCountersCollectionName,
        );
        return transaction.get(ref).then(
          snapshot => {
            const data: ShoppingCountersInterface = snapshot.data();
            const shopping_count =
              getNotNULLNumber(data.shopping_count) + (type ? 1 : -1);

            const values: ShoppingCountersInterface = {
              shopping_count,
              updated_at: firestore.FieldValue.serverTimestamp(),
            };
            transaction.update(ref, values);

            return Promise.resolve();
          },
          error => {
            return Promise.reject(error);
          },
        );
      })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  }
}
