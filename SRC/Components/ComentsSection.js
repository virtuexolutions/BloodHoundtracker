import moment from 'moment';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';

const ComentsSection = ({refRBSheet, data, setCommentsCount, fromimage}) => {
  const [yourComment, setYourComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentsData, setCommentsData] = useState(data?.comment);
  console.log('🚀 ~ ComentsSection ~ commentsData:', commentsData);
  const [loading, setLoading] = useState(false);
  const [commentsdata, setCommentData] = useState([]);

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);

  const addComment = async () => {
    const url = 'auth/comment';
    const body = {
      // profile_id: data?.id,
      post_id: fromimage ? data?.id : data?.post_id,
      description: yourComment,
    };

    if (yourComment == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Add some text', ToastAndroid.SHORT)
        : Alert.alert('Add some text');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log(
      '🚀 ~ file: ComentsSection.js:54 ~ addComment ~ response:',
      response,
    );
    setIsLoading(false);
    if (response != undefined) {
      setCommentsData(prev => [
        ...prev,
        {
          // id: 12,
          // user: profileData?.name,
          description: yourComment,
          time: moment(),
          // image: profileData?.photo,
        },
      ]);
      setCommentsCount(prev => prev + 1);
      Platform.OS == 'android'
        ? ToastAndroid.show('Comment added', ToastAndroid.SHORT)
        : Alert.alert('Comment added');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <RBSheet
        // closeOnPressBack={false}
        keyboardAvoidingViewEnabled={true}
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: Color.veryLightGray,
          },
        }}
        height={700}>
        <View
          style={{
            height: windowHeight * 0.8,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: moderateScale(60, 0.6),
            }}
            data={commentsData}
            // data={data?.comment}
            // data={commentsData}
            renderItem={({item, index}) => {
              console.log(
                '🚀 ~ ComentsSection ~ item = = = = mg hereeeeeeee :',
                item?.description,
              );
              return (
                <View style={styles.mainView}>
                  <View style={styles.View2}>
                    <View style={styles.profileView3}>
                      <View style={styles.profileSection2}>
                        <CustomImage
                          source={require('../Assets/Images/dummyman5.png')}
                          // source={
                          //   item?.profile_info?.photo
                          //     ? { uri: `${baseUrl}/${item?.profile_info?.photo}` }
                          //     : item?.image
                          //       ? { uri: `${baseUrl}/${item?.image}` }
                          //       : require('../Assets/Images/permissions.png')
                          // }
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                          // resizeMode="contain"
                        />
                      </View>

                      <View style={styles.view4}>
                        <CustomText
                          numberOfLines={1}
                          style={styles.customT}
                          isBold>
                          {item?.profile_info?.name
                            ? item?.profile_info?.name
                            : item?.user?.name}
                        </CustomText>
                        <CustomText style={styles.text2} numberOfLines={2}>
                          {item?.description}
                        </CustomText>
                      </View>
                    </View>

                    <View style={styles.textView}>
                      <CustomText style={styles.text} isBold>
                        Like
                      </CustomText>
                      <CustomText style={[styles.text, {fontSize: 11}]} isBold>
                        {moment(item?.created_at).startOf('hour').fromNow()}
                      </CustomText>
                    </View>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: windowHeight * 0.8,
                  }}>
                  <Text>No Comments</Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            position: 'absolute',
            bottom: 0,
            width: windowWidth,
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10, 0.6),
            paddingBottom: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <TextInputWithTitle
            titleText={'your comment'}
            placeholder={'your comment'}
            setText={setYourComment}
            value={yourComment}
            viewHeight={0.06}
            viewWidth={0.82}
            inputWidth={0.8}
            backgroundColor={'#F5F5F5'}
            marginRight={moderateScale(10, 0.3)}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(10, 0.3)}
          />
          <Icon
          style={styles.send_icon}
            name={'send-outline'}
            size={6}
            color={Color.themeDarkGray}
            as={Ionicons}
            onPress={() => {
              addComment();
              setYourComment('');
            }}
          />
        </View>
      </RBSheet>
    </KeyboardAwareScrollView>
  );
};

export default ComentsSection;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    marginTop: moderateScale(5, 0.3),
  },
  View2: {
    width: windowWidth,
  },
  profileView3: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth,
  },
  text2: {
    color: 'black',
    fontSize: moderateScale(12, 0.6),
  },
  view4: {
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.veryLightGray,
    borderRadius: moderateScale(10, 0.6),
    marginLeft: moderateScale(10, 0.3),
  },
  textView: {
    flexDirection: 'row',
    width: windowWidth * 0.6,
    marginLeft: moderateScale(80, 0.3),
    justifyContent: 'space-between',
    marginBottom: moderateScale(10, 0.3),
  },
  profileSection2: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.08) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  customT: {
    color: 'black',
    fontSize: moderateScale(14, 0.6),
  },
  text: {fontSize: moderateScale(12, 0.6), color: 'black'},
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.06) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  send_icon:{
    backgroundColor :Color.blue,
    width : windowWidth*0.12,
    alignItems : 'center',
    textAlign: 'center',
    paddingVertical : moderateScale(12,.6) ,
    marginHorizontal : moderateScale(6,.3) ,
    height : windowHeight*0.06,
    borderRadius : moderateScale(10,.6)
  }
});
