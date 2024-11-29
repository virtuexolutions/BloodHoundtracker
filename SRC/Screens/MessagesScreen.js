import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';

const MessagesScreen = (props) => {
  const item =props?.route?.params?.item
 const  navigation =useNavigation()
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi,. It is very nice to meet you.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: require('../Assets/Images/dummyman5.png'),
        },
      },
      {
        _id: 1,
        text: "Hello,Tsamara...How are you? It's nice to meet you!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../Assets/Images/dummyman5.png'),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.lightGrey}
      statusBarContentStyle={'light-content'}>
      <View style={styles.row}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          as={Ionicons}
          name="arrow-back"
          size={moderateScale(22, 0.6)}
          color={Color.darkGray}
        />
        <View style={styles.image}>
          <CustomImage
            source={require('../Assets/Images/dummyman1.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'cover'}
          />
        </View>
        {/* <View
          style={{
            width: windowWidth * 0.67,
          }}> */}
          <CustomText isBold style={styles.text}>
            {item?.name}
          </CustomText>
          {/* <CustomText style={styles.text2}>from</CustomText> */}
        {/* </View> */}
            <Icon as={Entypo} name='info-with-circle' size={moderateScale(15,.6)} color={Color.blue}/>
      </View>
      <GiftedChat
      isKeyboardInternallyHandled
      keyboardShouldPersistTaps={'always'}
        textInputStyle={{
          color: Color.black,
          marginTop: moderateScale(5, 0.3),
          width: windowWidth * 0.76,
          marginVertical: moderateScale(10, 0.3),
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            containerStyle={{}}
            textStyle={{
              left: {
                color: Color.black,
              },
              right: {
                color: Color.textColor,
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: '#E6E6FA',
                borderRadius: moderateScale(8, 0.6),
                marginBottom: moderateScale(10, 0.3),
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.16,
                shadowRadius: 1.51,
                elevation: 2,
              },
              left: {
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(8, 0.6),
                marginHorizontal: moderateScale(10, 0.3),
                marginBottom: moderateScale(5, 0.3),
              },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              width: windowWidth * 0.95,
              marginHorizontal: moderateScale(9, 0.3),
              borderRadius: moderateScale(8, 0.6),
              alignContent: 'center',
              marginVertical: moderateScale(7, 0.3),
              backgroundColor:'#e8e6df',
              borderColor: 'white',
            }}></InputToolbar>
        )}
        renderSend={props => (
          <Send
            {...props}
            containerStyle={{
              padding: moderateScale(10, 0.6),
            }}>
            <Icon
              name="send"
              size={moderateScale(22, 0.6)}
              as={Ionicons}
              color={Color.blue}
            />
          </Send>
        )}
        alwaysShowSend
        placeholderTextColor={Color.lightGrey}
        messages={messages}
        isTyping={false}
        onSend={messages => onSend(messages)}
        user={{
          _id: item?.id,
          name: 'john',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </ScreenBoiler>
  );
};

export default MessagesScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: Color.blue,
  },
  text: {

    fontSize: moderateScale(13, 0.6),
    width: windowWidth*0.67,
  },
  row: {
    backgroundColor:Color.veryLightGray,
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
});
