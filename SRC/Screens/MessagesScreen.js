import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import moment from 'moment';
import {FlatList, Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import NotificationCard from '../Components/NotificationCard';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';
import {useState} from 'react';
import ChatCard from '../Components/ChatCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  Actions,
  Avatar,
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../Components/CustomImage';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';

const MessagesScreen = ({props, navigation}) => {
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
          color={Color.mediumGray}
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
        <View
          style={{
            width: windowWidth * 0.7,
          }}>
          <CustomText isBold style={styles.text}>
            john
          </CustomText>
          {/* <CustomText style={styles.text2}>from</CustomText> */}
        </View>
      </View>
      <GiftedChat
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
                color: Color.white,
              },
              right: {
                color: 'black',
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: Color.white,
                // borderWidth: 1,
                // borderColor: Color.blue,
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
                borderWidth: 1,
                backgroundColor: Color.blue,
                borderRadius: moderateScale(8, 0.6),
                borderColor: Color.blue,
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
              width: windowWidth * 0.97,
              marginHorizontal: moderateScale(6, 0.3),
              borderRadius: moderateScale(8, 0.6),
              alignContent: 'center',
              marginVertical: moderateScale(7, 0.3),
              backgroundColor:Color.veryLightGray,
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
        key={item => item?.id}
        user={{
          _id: 1,
          name: 'shdjahsd',
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
    marginHorizontal: moderateScale(20, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: Color.blue,
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    // backgroundColor:Color.blue,
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
});
