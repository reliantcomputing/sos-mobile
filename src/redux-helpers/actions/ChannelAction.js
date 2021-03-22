import {Socket} from 'phoenix';
import Store from '../Store';
import Constants from '../../helpers/constants';
import {
  ADD_ORDER,
  ADD_PENDING_CHATS,
  LOAD_CHANNELS,
  UPDATE_ORDER,
} from '../Types';

const url = Constants.SOCKET_URL;

const axios = require('axios');

export const joinChannels = () => {
  let socket = new Socket(url, {params: {}});
  socket.connect();
  const orderChannel = socket.channel('order', {});

  const chatChannel = socket.channel('chat', {});

  orderChannel.on('place:order', payload => {
    console.log('Order placed');
    axios
      .get(`${Constants.BASE_URL}orders/${payload.id}`)
      .then(res => {
        console.log('Order placed............');
        Store.dispatch({
          type: SET_ORDER,
          payload: res.data.data,
        });
        orderChannel.on(`reject:order:${payload.id}`, payload => {
          axios.get(`${Constants.BASE_URL}orders/${payload.id}`).then(res => {
            Store.dispatch({
              type: UPDATE_ORDER,
              payload: res.data.data,
            });
          });
        });
        orderChannel.on(`approve:order:${res.payload.id}`, payload => {
          axios.get(`${Constants.BASE_URL}orders/${payload.id}`).then(res => {
            Store.dispatch({
              type: UPDATE_ORDER,
              payload: res.data.data,
            });
          });
        });
      })
      .catch(err => console.log(JSON.stringify(err)));
  });

  orderChannel.on('add:more:items', payload => {
    axios.get(`${Constants.BASE_URL}orders/${payload.id}`).then(res => {
      Store.dispatch({
        type: UPDATE_ORDER,
        payload: res.data.data,
      });
    });
  });

  // orders.forEach(_order => {
  //   orderChannel.on(`reject:order:${_order.id}`, payload => {
  //     axios.get(`${Constants.BASE_URL}/api/orders/${payload.id}`).then(res => {
  //       Store.dispatch({
  //         type: UPDATE_ORDER,
  //         payload: res.data.data,
  //       });
  //     });
  //   });
  //   orderChannel.on(`approve:order:${_order.id}`, payload => {
  //     axios.get(`${Constants.BASE_URL}/api/orders/${payload.id}`).then(res => {
  //       Store.dispatch({
  //         type: UPDATE_ORDER,
  //         payload: res.data.data,
  //       });
  //     });
  //   });
  // });

  chatChannel.on('', payload => {
    if (user.id === payload.userId) {
      Store.dispatch({
        type: ADD_PENDING_CHATS,
        payload: payload,
      });
    }
  });

  chatChannel.join();
  orderChannel.join();

  console.log(orderChannel);

  return {
    type: LOAD_CHANNELS,
    payload: {orderChannel, chatChannel},
  };
};
