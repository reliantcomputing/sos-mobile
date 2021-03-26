import {Socket} from 'phoenix';
import Store from '../Store';
import Constants from '../../helpers/constants';
import {
  PLACING_ORDER,
  ADD_PENDING_CHATS,
  LOAD_CHANNELS,
  UPDATES,
  UPDATE_ORDER,
  SET_ORDER,
  CREATE_PENDING_CHAT,
  RESET_BASKET,
  CREATE_CHAT,
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
      .get(`${Constants.BASE_URL}api/orders/${payload.id}`)
      .then(res => {
        console.log('Order placed............', res.data.data);
        Store.dispatch({
          type: SET_ORDER,
          payload: res.data.data,
        });
        Store.dispatch({
          type: UPDATES,
          payload: Constants.UPDATE.ORDER_PLACED,
        });
        Store.dispatch({
          type: PLACING_ORDER,
          payload: false,
        });
      })
      .catch(err => console.log('HTTP ERROR..........', JSON.stringify(err)));

    orderChannel.on(`reject:order:${payload.id}`, payload => {
      axios.get(`${Constants.BASE_URL}api/orders/${payload.id}`).then(res => {
        Store.dispatch({
          type: UPDATE_ORDER,
          payload: res.data.data,
        });
        Store.dispatch({
          type: UPDATES,
          payload: Constants.UPDATE.ORDER_REJECTED,
        });
      });
    });

    orderChannel.on(`pay:order:${payload.id}`, payload => {
      axios.get(`${Constants.BASE_URL}api/orders/${payload.id}`).then(res => {
        Store.dispatch({
          type: UPDATE_ORDER,
          payload: {},
        });
        Store.dispatch({
          type: RESET_BASKET,
          payload: {},
        });
        Store.dispatch({
          type: UPDATES,
          payload: Constants.UPDATE.ORDER_PAID,
        });
      });
    });

    orderChannel.on(`approve:order:${payload.id}`, payload => {
      axios.get(`${Constants.BASE_URL}api/orders/${payload.id}`).then(res => {
        Store.dispatch({
          type: UPDATE_ORDER,
          payload: res.data.data,
        });
        Store.dispatch({
          type: UPDATES,
          payload: Constants.UPDATE.ORDER_APPROVED,
        });
      });
    });
  });

  orderChannel.on('add:more:items', payload => {
    axios.get(`${Constants.BASE_URL}api/orders/${payload.id}`).then(res => {
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

  chatChannel.on('create:chat', payload => {
    Store.dispatch({
      type: CREATE_PENDING_CHAT,
      payload: payload,
    });
  });

  chatChannel.on('accept:chat', payload => {
    Store.dispatch({
      type: CREATE_CHAT,
      payload: payload.chat,
    });
    chatChannel.on(`send:message:${payload.chat.id}`, payload => {
      console.log('Payload.....Message', payload);
      Store.dispatch({
        type: ADD_MESSAGE,
        payload,
      });
    });
  });

  chatChannel.join();
  orderChannel.join();

  return {
    type: LOAD_CHANNELS,
    payload: {orderChannel, chatChannel},
  };
};
