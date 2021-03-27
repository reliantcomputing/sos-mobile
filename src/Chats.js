import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Button, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {useSelector} from 'react-redux';

export const Chats = () => {
  const [messages, setMessages] = useState([]);
  const chat = useSelector(state => state.chat);
  const [chatId, setChatId] = useState(null);
  const chatChannel = useSelector(state => state.channels.chatChannel);
  const sit_number = useSelector(state => state.sit_number);
  const [text, setText] = useState('');

  console.log('Outside ..........', chat);

  const onSend = useCallback(
    message => {
      console.log('kkkkkkkkk', chat);
      chatChannel.push(`send:message:${chat.id}`, {
        seen: false,
        user_id: sit_number,
        text: message[0].text,
        message_from: 'CUSTOMER',
      });
    },
    [chat],
  );

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{
          text: chat.id ? `${chat.waiter.name}` : 'Chat Area',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        backgroundColor="orange"
        containerStyle={{
          backgroundColor: 'orange',
          justifyContent: 'space-around',
        }}
      />
      {chat.id ? (
        <GiftedChat
          inverted={false}
          messages={chat.messages}
          text={text}
          onInputTextChanged={text => setText(text)}
          onSend={message => onSend(message)}
          user={{
            _id: 0,
          }}
        />
      ) : chat.waiting ? (
        <View style={{marginHorizontal: 50, marginVertical: 50}}>
          <Text style={{alignSelf: 'center'}}>
            Please wait, one of our assistants will attend asap.
          </Text>
        </View>
      ) : (
        <View style={{marginHorizontal: 50, marginVertical: 50}}>
          <Button
            style={{borderRadius: 50}}
            onPress={() => {
              let payload = {
                sit_number: '1',
              };
              chatChannel.push('create:chat', payload);
            }}
            title="Start Chat"
            color="orange"
          />
        </View>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   headerButtonContainer: {
//     marginRight: 10,
//   },
//   itemContainer: {
//     marginBottom: 20,
//     marginHorizontal: 30,
//   },
//   wrapper: {
//     flex: 1,
//     padding: 10,
//   },
//   topWrapper: {
//     flexDirection: 'row',
//   },
//   textInputWrapper: {
//     flex: 4,
//   },
//   textInput: {
//     height: 35,
//     borderColor: '#5d5d5d',
//     borderWidth: 1,
//   },
//   buttonWrapper: {
//     flex: 1,
//   },
//   list: {
//     marginTop: 20,
//   },
// });
