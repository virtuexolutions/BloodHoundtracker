import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {FONTS, SIZES} from '../Config/theme';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {comentlist} from '../Config/dummyData';
import ImageSlider from 'react-native-image-slider';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {baseUrl, imageUrl} from '../Config';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const DetailScreen = props => {
  const item = props?.route?.params?.item;
  const index = props?.route?.params?.index;
  const token = useSelector(state => state.authReducer.token);
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(
    item?.my_like?.post_id == item?.id ? true : false,
  );
  const [share, setShare] = useState(false);
  const [comment, setComment] = useState('');
  const [commentReplyViewToggle, setCommentReplyViewToggle] = useState(false);
  const [commentLike, setCommentLlike] = useState(
    item?.comment?.my_like ? true : false,
  );
  const [reply, setReply] = useState({});
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoPress = index => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  const addComment = async () => {
    const body = {
      post_id: item?.id,
      description: comment,
    };
    const url = 'auth/comment ';

    if (comment == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Add some text', ToastAndroid.SHORT)
        : Alert.alert('Add some text');
    }
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      setComment('');
    }
  };

  const post_like = async () => {
    const url = 'auth/post_like';
    setIsLoading(true);
    const response = await Post(url, {post_id: item?.id}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setLike(!like);
    }
  };

  const commentReplyApi = async () => {
    const url = `auth/comment_replies/${reply?.id}`;

    if (comment == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Add some text', ToastAndroid.SHORT)
        : Alert.alert('Add some text');
    }
    setIsLoading(true);
    const response = await Post(url, {description: comment}, apiHeader(token));
    if (response != undefined) {
      setComment('');
      setReply({});
    }
  };

  const commentLikeApi = async id => {
    const url = `auth/comment_like`;
    setIsLoading(true);
    const response = await Post(url, {comment_id: id}, apiHeader(token));
    if (response != undefined) {
      setCommentLlike(!commentLike);
    }
  };
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.background_color}
        barStyle={'dark-content'}
      />
      <CustomHeader text={'Detail'} leftIcon isCamer={false} RightIcon={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(30, 0.6),
        }}
        style={styles.container}>
        <View style={styles.main_view}>
          <SwiperFlatList
            style={styles.swipe}
            index={0}
            paginationDefaultColor={Color.themeLightGray}
            showPagination={item?.images.length > 1 ? true : false}
            paginationActiveColor={Color.blue}
            data={item?.images}
            paginationStyle={{
              position: 'absolute',
              top: '41%',
            }}
            paginationStyleItem={styles.paginationItem}
            renderItem={data =>
              data?.item?.type == 'image' ? (
                <View style={styles.imagebox}>
                  <CustomImage
                    source={{uri: `${imageUrl}${data?.item?.file}`}}
                    style={styles.images}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setClicked(prev => !prev);
                    setPaused(prev => !prev);
                    console.log('Logging video');
                    handleVideoPress(index);
                  }}
                  activeOpacity={1}
                  style={styles.Video}>
                  <Video
                    ref={videoRef}
                    resizeMode={'stretch'}
                    repeat={true}
                    paused={playingIndex !== index}
                    source={{uri: `${imageUrl}${data?.item?.file}`}}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onProgress={data => {}}
                    onLoadStart={data => {
                      setIsLoading(true);
                    }}
                    onLoad={x => {
                      setIsLoading(false);
                      setPaused(false);
                    }}
                    onBuffer={x => console.log('buffering video', x)}
                    onError={error =>
                      console.log('error ================> ', error)
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPaused(prev => !prev);
                      console.log('Logging video');
                      handleVideoPress(index);
                    }}
                    style={styles.play}>
                    <CustomImage
                      onPress={() => {
                        setPaused(prev => !prev);
                        handleVideoPress(index);
                      }}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={
                        paused
                          ? require('../Assets/Images/paused.png')
                          : require('../Assets/Images/play.png')
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )
            }
          />
          <View>
            <View style={styles.row}>
              <CustomText style={styles.detail} isBold>
                Detail Discription
              </CustomText>
              <CustomText style={styles.category} isBold>
                {item?.category}
              </CustomText>
            </View>
            <CustomText style={styles.des}>{item?.description}</CustomText>
            <CustomText
              style={{...FONTS.Medium15, marginTop: moderateScale(10, 0.6)}}
              isBold>
              Assets name
            </CustomText>
            <CustomText style={styles.ass_name}>{item?.assetname}</CustomText>
            <CustomText style={{...FONTS.Medium15}} isBold>
              Assets color
            </CustomText>
            <CustomText style={styles.ass_color}>{item?.assetcolor}</CustomText>
            <CustomText style={styles.loc_h1} isBold>
              Location
            </CustomText>
            <View style={styles.location_view}>
              {item?.locations?.map((item, index) => {
                return (
                  <View style={styles.loc_text_view}>
                    <CustomText style={styles.location_text}>
                      {`${item?.name}`}
                    </CustomText>
                  </View>
                );
              })}
            </View>
            <CustomText
              style={{...FONTS.Medium15, marginTop: moderateScale(10, 0.6)}}
              isBold>
              Time
            </CustomText>
            <CustomText style={styles.time}>
              {`${item?.start_time} during Standard Time and ${item?.end_time}`}
            </CustomText>

            <View style={styles.icon_row}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="message-processing-outline"
                  as={MaterialCommunityIcons}
                  size={moderateScale(20, 0.3)}
                  color={Color.lightGrey}
                />
                <CustomText style={styles.comment_text}>
                  {`${item?.total_comment} comments`}
                </CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  onPress={() => {
                    post_like();
                  }}
                  name={like ? 'heart' : 'heart-outline'}
                  as={MaterialCommunityIcons}
                  size={moderateScale(20, 0.3)}
                  color={like ? Color.blue : Color.lightGrey}
                />
                <CustomText style={styles.like_t}>
                  {`${item?.total_post_like} like `}
                </CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="share-outline"
                  as={MaterialCommunityIcons}
                  size={moderateScale(20, 0.3)}
                  color={Color.lightGrey}
                />
                <CustomText style={styles.share_t}>36 Shared</CustomText>
              </View>
            </View>
            <FlatList
              data={item?.comment}
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: moderateScale(10, 0.6),
                backgroundColor: Color.white,
              }}
              contentContainerStyle={{
                marginBottom: moderateScale(50, 0.6),
              }}
              ListEmptyComponent={
                <CustomText
                  style={{
                    backgroundColor: 'white',
                    textAlign: 'center',
                    paddingTop: moderateScale(50, 0.6),
                  }}>
                  no comment !
                </CustomText>
              }
              renderItem={({item, index}) => {
                return (
                  <>
                    <View style={styles.coment_view}>
                      <View style={styles.profile_view}>
                        <View style={styles.image_con}>
                          <CustomImage
                            source={{
                              uri: `${baseUrl}${item?.user?.photo}`,
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: moderateScale(20, 0.6),
                            }}
                          />
                        </View>
                        <View style={styles.user_row}>
                          <CustomText style={styles.user_name}>
                            {item?.user?.name}
                          </CustomText>
                          <CustomText
                            onPress={() => {
                              setReply(item);
                            }}
                            style={{
                              color: Color.blue,
                              width: 100,
                              textAlign: 'center',
                              ...FONTS.Regular10,
                            }}>
                            reply
                            {/* {item?.time} */}
                          </CustomText>
                        </View>
                      </View>
                      <CustomText style={styles.desc}>
                        {item?.description}
                      </CustomText>
                      <View style={styles.like_row}>
                        <View style={{flexDirection: 'row'}}>
                          <Icon
                            onPress={() => {
                              commentLikeApi(item?.id);
                            }}
                            name={item?.my_like ? 'heart' : 'heart-outline'}
                            as={MaterialCommunityIcons}
                            size={moderateScale(20, 0.3)}
                            color={item?.my_like ? Color.blue : Color.lightGrey}
                          />
                          <CustomText
                            onPress={() => {
                              commentLikeApi(item?.id);
                            }}
                            style={styles.like_text}>
                            {`${item?.total_comment_likes} likes`}
                          </CustomText>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: moderateScale(10, 0.6),
                          }}>
                          <Icon
                            onPress={() => {
                              setCommentReplyViewToggle(
                                item?.replies?.length > 0 &&
                                  !commentReplyViewToggle,
                              );
                            }}
                            name="message-processing-outline"
                            as={MaterialCommunityIcons}
                            size={moderateScale(20, 0.3)}
                            color={Color.lightGrey}
                          />
                          <CustomText
                            onPress={() => {
                              setCommentReplyViewToggle(
                                item?.replies?.length > 0 &&
                                  !commentReplyViewToggle,
                              );
                            }}
                            style={styles.like_text}>
                            {`${item?.total_comment_replies} comments`}
                          </CustomText>
                        </View>
                      </View>
                    </View>
                    {item?.replies?.length > 0 &&
                      commentReplyViewToggle == true &&
                      item?.replies?.map((data, index) => {
                        return (
                          <View style={styles.reply_view}>
                            <View style={styles.profile_view}>
                              <View style={styles.reply_imageView}>
                                <CustomImage
                                  source={{
                                    uri: `${baseUrl}${data?.user?.photo}`,
                                  }}
                                  style={styles.reply_image}
                                />
                              </View>
                              <View
                                style={{marginLeft: moderateScale(10, 0.6)}}>
                                <CustomText
                                  style={{...FONTS.Medium13, width: 120}}>
                                  {data?.user?.name}
                                </CustomText>
                                <CustomText
                                  style={{
                                    color: Color.lightGrey,
                                    width: 100,
                                    ...FONTS.Regular10,
                                  }}>
                                  {item?.time}
                                </CustomText>
                              </View>
                            </View>
                            <CustomText
                              style={{
                                ...FONTS.Regular10,
                                color: Color.lightGrey,
                                paddingVertical: moderateScale(5, 0.6),
                              }}>
                              {data?.description}
                            </CustomText>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: moderateScale(10, 0.6),
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Icon
                                  name={
                                    data?.my_like ? 'heart' : 'heart-outline'
                                  }
                                  as={MaterialCommunityIcons}
                                  size={moderateScale(20, 0.3)}
                                  color={
                                    data?.my_like ? Color.blue : Color.lightGrey
                                  }
                                />
                                <CustomText
                                  style={{
                                    ...FONTS.light12,
                                    color: Color.lightGrey,
                                    marginLeft: moderateScale(3, 0.6),
                                  }}>
                                  {`${data?.total_reply_likes} likes`}
                                </CustomText>
                              </View>
                              {/* <View
                                style={{
                                  flexDirection: 'row',
                                  marginLeft: moderateScale(10, 0.6),
                                }}>
                                <Icon
                                  name="message-processing-outline"
                                  as={MaterialCommunityIcons}
                                  size={moderateScale(20, 0.3)}
                                  color={Color.lightGrey}
                                />
                                <CustomText
                                  style={{
                                    ...FONTS.light12,
                                    color: Color.lightGrey,
                                    marginLeft: moderateScale(3, 0.6),
                                  }}>
                                  {item?.replaycount}
                                </CustomText>
                              </View> */}
                            </View>
                          </View>
                        );
                      })}
                  </>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.commentRow}>
        <TextInputWithTitle
          secureText={false}
          placeholder={'write a comment'}
          setText={setComment}
          value={comment}
          viewHeight={0.07}
          viewWidth={0.74}
          inputWidth={0.66}
          borderColor={'#ffffff'}
          backgroundColor={Color.veryLightGray}
          borderRadius={moderateScale(15, 0.6)}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          multiline
        />
        <TouchableOpacity
          onPress={() => {
            reply?.id == null || undefined ? addComment() : commentReplyApi();
          }}
          style={styles.send_btn}>
          <Icon
            onPress={() => {
              addComment();
            }}
            name="send"
            as={Feather}
            size={moderateScale(20, 0.6)}
            color={Color.white}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: Color.background_color,
  },
  main_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: Color.white,
    width: windowWidth * 0.93,
    alignSelf: 'center',
  },
  location_text: {
    ...FONTS.Medium11,
    color: Color.mediumGray,
  },
  profile_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  des: {
    ...FONTS.light12,
    color: Color.lightGrey,
    marginTop: moderateScale(5, 0.6),
  },
  loc_h1: {...FONTS.Medium15, marginTop: moderateScale(10, 0.6)},
  coment_view: {
    borderRadius: SIZES.padding,
    borderWidth: 1,
    marginVertical: SIZES.padding - 15,
    borderColor: Color.veryLightGray,
    paddingHorizontal: SIZES.padding - 10,
    paddingVertical: SIZES.padding - 18,
  },
  Slide: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    marginLeft: moderateScale(0.6, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  commentRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    marginHorizontal: moderateScale(20, 0.3),
  },
  send_btn: {
    height: windowHeight * 0.065,
    backgroundColor: Color.blue,
    width: windowWidth * 0.14,
    marginTop: moderateScale(16, 0.3),
    marginHorizontal: moderateScale(5, 0.3),
    borderRadius: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.04,
    top: '45%',
    right: '43%',
    position: 'absolute',
  },
  paginationItem: {
    width: windowWidth * 0.023,
    height: windowHeight * 0.014,
    borderRadius: moderateScale(20, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
  },
  imagebox: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
  },
  Video: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  images: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(20, 0.6),
  },
  swipe: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(20, 0.6),
  },
  location_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  loc_text_view: {
    padding: moderateScale(6, 0.6),
    backgroundColor: Color.veryLightGray,
    borderRadius: moderateScale(17, 0.6),
    marginVertical: moderateScale(3, 0.3),
  },
  category: {
    ...FONTS.Medium11,
    marginTop: SIZES.padding2,
    paddingTop: moderateScale(2, 0.6),
  },
  detail: {...FONTS.Medium15, marginTop: SIZES.padding2},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(15, 0.6),
  },
  comment_text: {
    ...FONTS.light12,
    color: Color.lightGrey,
    marginLeft: moderateScale(3, 0.6),
  },
  like_t: {
    ...FONTS.light12,
    color: Color.lightGrey,
    marginLeft: moderateScale(3, 0.6),
  },
  share_t: {
    ...FONTS.light12,
    color: Color.lightGrey,
    marginLeft: moderateScale(3, 0.6),
  },
  image_con: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  like_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ass_name: {
    ...FONTS.Regular10,
    color: Color.lightGrey,
  },
  ass_color: {
    ...FONTS.Regular10,
    color: Color.lightGrey,
  },
  time: {
    ...FONTS.Regular10,
    marginTop: moderateScale(6, 0.6),
    color: Color.lightGrey,
  },
  user_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: moderateScale(5, 0.6),
  },
  user_name: {
    marginLeft: moderateScale(10, 0.6),
    ...FONTS.Medium11,
    width: 120,
  },
  desc: {
    ...FONTS.Regular10,
    color: Color.lightGrey,
    paddingVertical: moderateScale(5, 0.6),
  },
  like_text: {
    ...FONTS.light12,
    color: Color.lightGrey,
    marginLeft: moderateScale(3, 0.6),
  },
  reply_view: {
    width: '93%',
    borderRadius: SIZES.padding,
    borderWidth: 1,
    marginVertical: SIZES.padding - 10,
    marginLeft: moderateScale(22, 0.3),
    borderColor: Color.veryLightGray,
    paddingHorizontal: SIZES.padding - 10,
    paddingVertical: SIZES.padding - 15,
  },
  reply_imageView: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  reply_image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(20, 0.6),
  },
});
