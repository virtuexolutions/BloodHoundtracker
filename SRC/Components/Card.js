import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SwiperFlatList from 'react-native-swiper-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {baseUrl, imageUrl} from '../Config';
import {FONTS} from '../Config/theme';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Post} from '../Axios/AxiosInterceptorFunction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Card = ({item, fromProfile, setSelected, selected, index, loading}) => {
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const videoRef = useRef();
  const navigation = useNavigation();
  const refRBSheet = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(
    item?.my_like?.post_id == item?.id ? true : false,
  );
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoPress = index => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  const post_like = async () => {
    const url = 'auth/post_like';
    setIsLoading(true);
    const response = await Post(url, {post_id: item?.id}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
    }
  };

  return (
    <View
      activeOpacity={0.4}
      style={styles.cardstyle}
      onPress={() => {
        // navigationService.navigate('DetailScreen')}
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.text_view}>
          <View style={styles.profile_image}>
            <CustomImage
              source={
                userData?.photo
                  ? {uri: `${baseUrl}${userData?.photo}`}
                  : require('../Assets/Images/dummyman5.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: moderateScale(20, 0.6),
              }}
            />
            <View style={styles.firstRow} />
          </View>
          <View style={{paddingHorizontal: moderateScale(10, 0.6)}}>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                width: windowWidth * 0.4,
              }}
              isBold>
              {userData?.name}
            </CustomText>
            <CustomText
              style={{color: Color.lightGrey, width: 100, ...FONTS.Regular10}}>
              {/* {moment().startOf('day').fromNow()} */}
              {moment(item?.created_at).format('ll')}
            </CustomText>
          </View>
        </View>
        {fromProfile ? (
          <View style={styles.btn_row}>
            <TouchableOpacity
              onPress={() => {
                setSelected('stolen');
              }}
              style={[
                styles.founded_bnt,
                {
                  backgroundColor:
                    item?.category == 'stolen'
                      ? Color.themeColor
                      : Color.mediumGray,
                },
              ]}>
              <CustomText
                style={[
                  styles.founded_text,
                  {
                    color:
                      item?.category == 'stolen' ? Color.white : Color.black,
                  },
                ]}>
                stolen
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('founded');
              }}
              style={[
                styles.founded_bnt,
                {
                  backgroundColor:
                    item?.category == 'founded'
                      ? Color.themeColor
                      : Color.mediumGray,
                  width: '55%',
                },
              ]}>
              <CustomText
                style={[
                  styles.founded_text,
                  {
                    color:
                      item?.category == 'founded' ? Color.white : Color.black,
                  },
                ]}>
                founded
              </CustomText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigationService.navigate('MessageList')}
            style={styles.message_btn}>
            <CustomText style={styles.msg_btn_text}>Message</CustomText>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: moderateScale(12, 0.6)}}>
        <CustomText
          style={{
            width: windowWidth * 0.8,
            ...FONTS.Regular12,
            color: Color.lightGrey,
          }}>
          {item?.description}
        </CustomText>
        <CustomText
          onPress={() => {
            navigation.navigate('DetailScreen', {item: item}, {index: index});
          }}
          style={{color: '#0201FF', ...FONTS.Regular12}}>
          Read More....
        </CustomText>
      </View>
      <SwiperFlatList
        style={{
          width: windowWidth * 0.8,
          height: windowHeight * 0.4,
          borderRadius: moderateScale(20, 0.6),
        }}
        index={0}
        showPagination={item?.images.length > 1 ? true : false}
        paginationDefaultColor={Color.themeLightGray}
        paginationActiveColor={Color.blue}
        data={item?.images}
        paginationStyle={{
          position: 'absolute',
          bottom: 40,
        }}
        paginationStyleItem={styles.pagination}
        renderItem={data =>
          loading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={windowWidth * 0.8}
                height={windowHeight * 0.4}
                borderRadius={moderateScale(20, 0.6)}
              />
            </SkeletonPlaceholder>
          ) : data?.item?.type == 'image' ? (
            <View style={styles.imageBox}>
              <CustomImage
                source={{uri: `${imageUrl}${data?.item?.file}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: moderateScale(20, 0.6),
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // setClicked(prev => !prev);
                // setPaused(prev => !prev);
                // console.log('Logging video');
                // handleVideoPress(index);
              }}
              activeOpacity={1}
              style={styles.videoBox}>
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
                style={{
                  width: windowWidth * 0.1,
                  height: windowHeight * 0.04,
                  top: '45%',
                  right: '43%',
                  position: 'absolute',
                }}>
                <CustomImage
                  onPress={() => {
                    setPaused(prev => !prev);
                    handleVideoPress(index);
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    // backgroundColor: 'pink',
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
      {/* {item?.images.length > 1 ? (
        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.3,
            alignSelf: 'center',
            borderRadius: moderateScale(20, 0.6),
          }}>
          <ImageSlider
            loopBothSides
            images={item?.images}
            style={{backgroundColor: 'white'}}
            customSlide={({index, item, style, width}) => (
              <View key={index} style={[style, styles.Slide]}>
                <CustomImage
                  source={item}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: moderateScale(20, 0.6),
                  }}
                />
              </View>
            )}
          />
        </View>
      ) : item?.images[0]?.type == 'image' ? (
        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.3,
            borderRadius: moderateScale(20, 0.6),
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.6),
          }}>
          <CustomImage
            source={{uri: `${imageUrl}/${item?.images[0]?.file}`}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: moderateScale(20, 0.6),
            }}
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
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.3,
            borderRadius: moderateScale(20, 0.6),
            alignSelf: 'center',
            overflow: 'hidden',
            marginTop: moderateScale(10, 0.6),
          }}>
          <Video
            ref={videoRef}
            resizeMode={'stretch'}
            repeat={false}
            paused={playingIndex !== index}
            source={{uri: `${imageUrl}${item?.images[0]?.file}`}}
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
            onError={error => console.log('error ================> ', error)}
          />
        </TouchableOpacity>
      )} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: moderateScale(10, 0.6),
        }}>
        <View style={{flexDirection: 'row'}}>
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
            {`${item?.total_comment} comments`}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => {
              post_like();
              setLike(!like);
            }}
            name={like ? 'heart' : 'heart-outline'}
            as={MaterialCommunityIcons}
            size={moderateScale(20, 0.3)}
            color={like ? Color.blue : Color.lightGrey}
          />
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginLeft: moderateScale(3, 0.6),
            }}>
            {`${item?.total_post_like} likes`}
            {/* {item?.likes} */}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="share-outline"
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
            shares
            {/* {item?.shares} */}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardstyle: {
    width: windowWidth * 0.9,
    paddingHorizontal: 15,
    borderRadius: 12,
    paddingVertical: moderateScale(12, 0.6),
    overflow: 'hidden',
    backgroundColor: Color.white,
    marginVertical: moderateScale(5, 0.3),
  },

  cardImage: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.24,
    overflow: 'hidden',
    borderRadius: 12,
  },
  firstRow: {
    width: 10,
    height: 10,
    borderRadius: moderateScale(20, 0.6),
    top: -10,
    alignSelf: 'flex-end',
  },
  text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.5,
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.6),
  },
  message_btn: {
    width: moderateScale(100, 0.6),
    height: moderateScale(30, 0.6),
    backgroundColor: Color.blue,
    borderRadius: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg_btn_text: {
    color: Color.white,
    ...FONTS.Medium11,
  },
  btn_row: {
    flexDirection: 'row',
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(3, 0.6),
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 15,
  },

  founded_text: {
    color: 'white',
    ...FONTS.Medium11,
    paddingHorizontal: moderateScale(12, 0.6),
    padding: moderateScale(3.5, 0.6),
  },
  Slide: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    marginLeft: moderateScale(0.6, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  profile_image: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  videoBox: {
    width: windowWidth * 0.8,
    height: '100%',
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  imageBox: {
    width: windowWidth * 0.8,
    height: '100',
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
  },
  pagination: {
    width: windowWidth * 0.023,
    height: windowHeight * 0.014,
    borderRadius: moderateScale(20, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
  },
});
