import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import ComentsSection from './ComentsSection';
import {} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageZoom from 'react-native-image-pan-zoom';
import CustomImage from './CustomImage';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {imageUrl} from '../Config';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import ShowMoreAndShowLessText from './ShowMoreAndShowLessText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const SaveDataModal = ({
  imageModal,
  setImageModal,
  data,
  commentdata,
  likeData,
  image,
}) => {
  // console.log('🚀 ~ image ==================================== :', data);
  const token = useSelector(state => state.authReducer.token);
  const refRBSheet = useRef();
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(true);
  const [commentsCount, setCommentsCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const likePost = async postid => {
    const url = 'auth/post_like';
    setIsLoading(true);
    const response = await Post(url, {post_id: postid}, apiHeader(token));
    console.log('🚀 ~ likePost ~ response:', response?.data);
    setIsLoading(false);
    if (response != undefined) {
      setLike(!like);
    }
  };

  return (
    <Modal
      visible={imageModal}
      onBackdropPress={() => {
        setImageModal(false);
      }}
      hasBackdrop={true}
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.imageView,
          image?.type != 'image' && {
            paddingTop: windowHeight * 0.1,
          },
          image?.type == 'image' && {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View style={styles.icon}>
          <Icon
            style={styles.icon}
            onPress={() => {
              setImageModal(false);
            }}
            as={Ionicons}
            name="arrow-back"
            size={moderateScale(20, 0.6)}
            color={Color.darkGray}
          />
        </View>
        {image?.type == 'image' ? (
          <>
            <View style={styles.Zoom}>
              <ImageZoom
                style={{
                  height: windowHeight * 0.7,
                  width: windowWidth,
                }}
                cropWidth={Dimensions.get('screen').width}
                cropHeight={Dimensions.get('screen').height}
                imageWidth={400}
                pinchToZoom={true}
                enableDoubleClickZoom={false}
                //   doubleClickInterval={2}
                imageHeight={500}>
                <View
                  style={{
                    width: windowWidth,
                    height: windowHeight * 0.45,
                  }}>
                  <CustomImage
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    source={{uri: `${imageUrl}${image?.fileUrl} `}}
                  />
                </View>
              </ImageZoom>
            </View>
            <View style={styles.like_row}>
              <View style={styles.inner_row}>
                <Icon
                  onPress={() => {
                    likePost(data?.id);
                  }}
                  name={
                    data?.my_like?.post_id == data?.id
                      ? 'heart'
                      : 'heart-outline'
                  }
                  as={MaterialCommunityIcons}
                  size={moderateScale(20, 0.3)}
                  color={
                    data?.my_like?.post_id == data?.id
                      ? Color.blue
                      : Color.lightGrey
                  }
                />
                <CustomText style={styles.custext}>
                  {/* {likeData}s */}
                  {`${data?.total_post_like} likes`}
                </CustomText>
              </View>
              <View style={styles.verticalLine}></View>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}
                style={styles.inner_row}>
                <Icon
                  name="message-processing-outline"
                  as={MaterialCommunityIcons}
                  size={moderateScale(20, 0.3)}
                  color={Color.lightGrey}
                />
                <CustomText style={styles.custext}>
                  {`${data?.total_comment} Comments`}
                </CustomText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setClicked(prev => !prev);
              setPaused(prev => !prev);
              console.log('Logging video');
            }}
            activeOpacity={1}
            style={[
              styles.card,
              {
                height: windowHeight,
                paddingTop: windowHeight * 0.12,
              },
            ]}>
            <Video
              ref={videoRef}
              resizeMode={'stretch'}
              repeat={true}
              paused={false}
              source={{uri: `${imageUrl}${image?.file}`}}
              style={{
                width: '100%',
                height: windowHeight * 0.55,
              }}
              onProgress={data => {}}
              onLoadStart={data => {
                console.log(
                  'feed video is here ============ >> >  > > >  >  ',
                  data,
                );
                setIsLoading(true);
              }}
              onLoad={x => {
                setIsLoading(false);
                setPaused(false);
              }}
              onBuffer={x => console.log('buffering video', x)}
              onError={error => console.log('error ================> ', error)}
            />

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.9}}
              colors={['#ffffff00', '#000000']}
              style={styles.linearstyle}>
              <View style={styles.container}>
                <View style={styles.contView}>
                  <View style={styles.photoView}>
                    <CustomImage
                      source={require('../Assets/Images/dummyman5.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    <CustomText numberOfLines={1} style={styles.cT} isBold>
                      user name
                      {/* {item?.profile_info?.name} */}
                    </CustomText>

                    <CustomText numberOfLines={1} style={styles.customT2}>
                      new york
                    </CustomText>
                  </View>
                </View>
                <View style={styles.Views}>
                  {/* <CustomText style={styles.text3}>
                    likes
                  </CustomText>
                  <View style={styles.cmtView}></View>
                  <CustomText style={styles.text3}>
                    {data?.total_comment}
                  </CustomText> */}
                </View>
                <View style={styles.caption}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingBottom: moderateScale(20, 0.3),
                    }}>
                    <ShowMoreAndShowLessText
                      minTextLength={10}
                      style={styles.moreLess}>
                      {data?.description}
                    </ShowMoreAndShowLessText>
                  </ScrollView>
                </View>
              </View>
              <View style={styles.opcity}>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                    style={styles.btn2}>
                    <Icon
                      name={'comments'}
                      as={FontAwesome5}
                      color={'white'}
                      size={5}
                    />
                  </TouchableOpacity>
                  <CustomText numberOfLines={1} style={styles.customT}>
                    {data?.total_comment}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      likePost(data?.id);
                    }}
                    style={styles.btn2}>
                    <Icon
                      name={
                        data?.my_like?.post_id == data?.id ? 'like1' : 'like2'
                      }
                      as={AntDesign}
                      color={
                        data?.id == data?.my_like?.post_id
                          ? Color.blue
                          : 'white'
                      }
                      size={5}
                    />
                  </TouchableOpacity>
                  <CustomText numberOfLines={1} style={styles.customT}>
                    {data?.total_post_like}
                  </CustomText>
                </View>
              </View>
              {/* <View
                    style={{
                      position: 'absolute',
                      backgroundColor: Color.themeColor,
                      height: windowWidth * 0.01,
                      width: currentTime
                        ? duration
                          ? `${(currentTime / duration) * 100}%`
                          : '0%'
                        : '0%',
                    }}></View> */}
            </LinearGradient>
          </TouchableOpacity>
        )}

        <ComentsSection
          fromimage={true}
          isBubble={false}
          refRBSheet={refRBSheet}
          data={data?.comment}
          setCommentsCount={setCommentsCount}
          //   activeIndex={currIndex}
          post_id={data?.id}
        />
      </View>
    </Modal>
  );
};

export default SaveDataModal;
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    // backgroundColor: 'rgba(0,0,0,0.16)',
  },
  customBtn: {
    width: windowWidth,
    height: windowWidth * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 160,
  },
  like_row: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    borderColor: Color.lightGrey,
    borderBottomWidth: 0.7,
    paddingVertical: moderateScale(8, 0.6),
    width: '95%',
    marginHorizontal: moderateScale(8, 0.6),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.6),
  },
  inner_row: {
    flexDirection: 'row',
    width: '40%',
  },
  custext: {
    fontSize: moderateScale(13, 0.6),
    color: Color.black,
    paddingHorizontal: moderateScale(5, 0.6),
  },
  verticalLine: {
    borderWidth: 1,
    borderColor: Color.lightGrey,
  },
  icon: {
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    position: 'absolute',
    top: 15,
    zIndex: 1,
  },
  Zoom: {
    marginTop: windowHeight * 0.15,
  },
  linearstyle: {
    position: 'absolute',
    bottom: 55,
    justifyContent: 'flex-end',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '100%',
  },
  profileSection1: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33dd50',
    justifyContent: 'center',
  },
  container: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.7,
  },
  contView: {
    flexDirection: 'row',
    paddingTop: moderateScale(40, 0.6),
    paddingLeft: moderateScale(5, 0.6),
  },
  btnView: {
    marginTop: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: moderateScale(30, 0.6) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoView: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderColor: '#33dd50',
    borderWidth: 2,
    borderRadius: (windowWidth * 0.1) / 2,
    marginTop: moderateScale(12, 0.3),
    marginLeft: moderateScale(5, 0.3),
    marginRight: moderateScale(8, 0.3),
  },
  customSlide: {
    width: windowWidth,
    height: windowHeight * 0.34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcity: {
    position: 'absolute',
    right: 20,
    top: 35,
  },
  card: {
    // marginBottom:moderateScale(50,.3),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    overflow: 'hidden',
    // backgroundColor: 'white',
  },
  cT: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
    marginTop: moderateScale(12, 0.3),
    textAlign: 'left',
  },
  backgroundVideo: [StyleSheet.absoluteFillObject],
  image: {
    height: '100%',
    width: '100%',
  },

  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    textShadowColor: Color.black,
  },
  text1: {
    fontSize: moderateScale(15, 0.6),
    color: Color.veryLightGray,
    textShadowColor: Color.black,
  },
  text3: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
  },
  view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  customT2: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
    textAlign: 'left',
  },
  israelite: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    borderRadius: moderateScale(8, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  customT: {fontSize: moderateScale(12, 0.6), color: Color.white},
  btn: {
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: moderateScale(30, 0.6) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    width: windowWidth * 0.86,
    marginTop: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  Views: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth * 0.5,
    alignItems: 'center',
    marginTop: moderateScale(30, 0.3),
    paddingLeft: moderateScale(5, 0.6),
  },
  moreLess: {
    textAlign: 'left',
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.85,
  },
  cmtView: {
    width: 1,
    height: windowHeight * 0.02,
    backgroundColor: '#fff',
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.25,
    zIndex: 1,
  },
  arrowLeft: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    left: 15,
  },
  pausedImage: {
    width: '100%',
    height: '100%',
    tintColor: 'white',
  },
});
