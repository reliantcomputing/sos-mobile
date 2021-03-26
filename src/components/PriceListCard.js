import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {RouteNames} from '../helpers/RouteNames';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {BASKET_REMOVE_EXTRA, BASKET_REMOVE_MENU} from '../redux-helpers/Types';

const PriceListCard = ({item, type}) => {
  const navigation = useNavigation();
  const extras = useSelector(state => state.basket.extras);
  const menus = useSelector(state => state.basket.menus);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [price] = useState(
    item.extra ? item.extra.price : item.menu ? item.menu.price : item.price,
  );
  const [title] = useState(
    item.extra ? item.extra.title : item.menu ? item.menu.title : item.title,
  );
  console.log('Item', item);
  console.log('Type', type);
  return (
    <TouchableOpacity
      onLongPress={() => {
        setVisible(true);
      }}
      onPress={() => {
        // console.log(item.image)
        navigation.navigate(RouteNames.MENU_DETAILS, {
          item: item,
          item_type: type,
          title: item.title,
          items: type === 'MENU' ? menus : extras,
        });
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : item.extra
                ? item.extra.image
                : item.menu.image,
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>Qty: {item.qty}</Text>
          <Text style={styles.subtitle}>R{price}</Text>
          <Text style={styles.subtitle}>Cost: R{price * item.qty}</Text>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View
                style={{
                  ...styles.modalView,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Removing?
                </Text>
                <Text style={{...styles.modalText, color: 'black'}}>
                  {item.title
                    ? item.title
                    : item.extra
                    ? item.extra.title
                    : item.menu.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: 'blue',
                    }}
                    onPress={() => {
                      setVisible(!visible);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{...styles.openButton, backgroundColor: 'red'}}
                    onPress={() => {
                      dispatch({
                        type:
                          type === 'MENU'
                            ? BASKET_REMOVE_MENU
                            : BASKET_REMOVE_EXTRA,
                        payload: item.title,
                      });
                      setVisible(!visible);
                    }}>
                    <Text style={styles.textStyle}>Remove</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#303540',
  },
  description: {
    fontSize: 16,
    marginRight: 10,
    color: '#303540',
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 6,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  msg: {
    paddingStart: 14,
  },
  divider: {
    marginStart: 84,
    marginEnd: 12,
  },
  time: {
    fontSize: 12,
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 40,
    backgroundColor: 'red',
  },
  online: {
    color: 'green',
  },
});

export default PriceListCard;
