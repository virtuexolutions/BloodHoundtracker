import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
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

const DetailScreen = props => {
  const item = props?.route?.params?.item;
  const index = props?.route?.params?.index;

  console.log('🚀 ~ from detail screen  :', item);
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  console.log('🚀 ~ Card ~ like:', like);
  const [comment, setComment] = useState('');
  const [commentReply, setCommentReply] = useState(false);
  console.log('🚀 ~ DetailScreen ~ commentReply:', commentReply);
  const [playingIndex, setPlayingIndex] = useState(null);

  const locationName = [
    '@South Beach',
    ' @Wynwood Arts District',
    '@Little Havana',
    '@South Beach',
    ' @Wynwood Arts District',
  ];

  const handleVideoPress = index => {
    setPlayingIndex(playingIndex === index ? null : index);
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
          paddingBottom: moderateScale(10, 0.6),
        }}
        style={styles.container}>
        <View style={styles.main_view}>
          {/* <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              borderRadius: SIZES.padding,
            }}>
            <CustomImage
              source={require('../Assets/Images/scoter_image.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: moderateScale(20, 0.6),
              }}
            />
          </View> */}
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
                source={{uri:`${imageUrl}${item?.images[0]?.file}`}}
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
                muted={true}
                resizeMode={'stretch'}
                repeat={true}
                paused={paused}
                source={require('../Assets/Images/video1.mp4')}
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
            </TouchableOpacity>
          )} */}
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
                        console.log('hello from paused button');

                        setPaused(prev => !prev);
                        console.log('Logging video');
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{...FONTS.Medium15, marginTop: SIZES.padding2}}
              isBold>
              Detail Discription
            </CustomText>
            <CustomText
              style={{
                ...FONTS.Medium11,
                marginTop: SIZES.padding2,
                paddingTop: moderateScale(2, 0.6),
              }}
              isBold>
              {item?.category}
            </CustomText>
          </View>
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginTop: moderateScale(5, 0.6),
            }}>
            {item?.description}
          </CustomText>
          <CustomText
            style={{...FONTS.Medium15, marginTop: moderateScale(10, 0.6)}}
            isBold>
            Location
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.6),
            }}>
            {item?.locations?.map((item, index) => {
              return (
                <View
                  style={{
                    padding: moderateScale(6, 0.6),
                    backgroundColor: Color.veryLightGray,
                    borderRadius: moderateScale(17, 0.6),
                    marginVertical: moderateScale(3, 0.3),
                  }}>
                  <CustomText style={styles.location_text}>
                    {' '}
                    {`${item?.location}`}{' '}
                  </CustomText>
                </View>
              );
            })}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.6),
            }}>
            <View
              style={{
                padding: moderateScale(8, 0.6),
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(17, 0.6),
              }}>
              <CustomText style={styles.location_text}>@South Beach</CustomText>
            </View>
            <View
              style={{
                padding: moderateScale(8, 0.6),
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(17, 0.6),
              }}>
              <CustomText style={styles.location_text}>
                @Wynwood Arts District
              </CustomText>
            </View>
            <View
              style={{
                padding: moderateScale(8, 0.6),
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(17, 0.6),
              }}>
              <CustomText style={styles.location_text}>
                @Little Havana
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.6),
            }}>
            <View
              style={{
                padding: moderateScale(8, 0.6),
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(17, 0.6),
              }}>
              <CustomText style={styles.location_text}>@South Beach</CustomText>
            </View>
            <View
              style={{
                padding: moderateScale(8, 0.6),
                marginLeft: moderateScale(10, 0.6),
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(17, 0.6),
              }}>
              <CustomText style={styles.location_text}>
                @Wynwood Arts District
              </CustomText>
            </View>
          </View> */}
          <CustomText
            style={{...FONTS.Medium15, marginTop: moderateScale(10, 0.6)}}
            isBold>
            Time
          </CustomText>
          <CustomText
            style={{
              ...FONTS.Regular10,
              marginTop: moderateScale(6, 0.6),
              color: Color.lightGrey,
            }}>
            {`${item?.start_time} during Standard Time and ${item?.end_time}`}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(15, 0.6),
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
                {`${item?.comment_count} comments`}
              </CustomText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                onPress={() => {
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
                {`${item?.like_count} like `}
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
                36 Shared
              </CustomText>
            </View>
          </View>
          <FlatList
            data={item?.comment}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: moderateScale(20, 0.6),
            }}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.coment_view}>
                    <View style={styles.profile_view}>
                      <View
                        style={{
                          width: moderateScale(40, 0.6),
                          height: moderateScale(40, 0.6),
                          borderRadius: moderateScale(20, 0.6),
                        }}>
                        <CustomImage
                          source={item?.profile_image}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: moderateScale(20, 0.6),
                          }}
                        />
                      </View>
                      <View style={{marginLeft: moderateScale(10, 0.6)}}>
                        <CustomText style={{...FONTS.Medium13, width: 120}}>
                          {item?.name}
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
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
                          name="heart-outline"
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
                          {item?.likes}
                        </CustomText>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: moderateScale(10, 0.6),
                        }}>
                        <Icon
                          onPress={() => {
                            setCommentReply(!commentReply);
                          }}
                          name="message-processing-outline"
                          as={MaterialCommunityIcons}
                          size={moderateScale(20, 0.3)}
                          color={Color.lightGrey}
                        />
                        <CustomText
                          onPress={() => {
                            setCommentReply(!commentReply);
                          }}
                          style={{
                            ...FONTS.light12,
                            color: Color.lightGrey,
                            marginLeft: moderateScale(3, 0.6),
                          }}>
                          {item?.replaycount}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                  {item?.replay?.length > 0 &&
                    commentReply == true &&
                    item?.replay?.map((data, index) => {
                      return (
                        <View
                          style={{
                            width: '93%',
                            borderRadius: SIZES.padding,
                            borderWidth: 1,
                            marginVertical: SIZES.padding - 10,
                            marginLeft: moderateScale(22, 0.3),
                            borderColor: Color.veryLightGray,
                            paddingHorizontal: SIZES.padding - 10,
                            paddingVertical: SIZES.padding - 15,
                          }}>
                          <View style={styles.profile_view}>
                            <View
                              style={{
                                width: moderateScale(40, 0.6),
                                height: moderateScale(40, 0.6),
                                borderRadius: moderateScale(20, 0.6),
                              }}>
                              <CustomImage
                                source={item?.profile_image}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: moderateScale(20, 0.6),
                                }}
                              />
                            </View>
                            <View style={{marginLeft: moderateScale(10, 0.6)}}>
                              <CustomText
                                style={{...FONTS.Medium13, width: 120}}>
                                {item?.name}
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
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </CustomText>
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              marginTop: moderateScale(10, 0.6),
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Icon
                                name="heart-outline"
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
                                {item?.likes}
                              </CustomText>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginLeft: moderateScale(10, 0.6),
                              }}>
                              <Icon
                                onPress={() => {
                                  setCommentReply(true);
                                }}
                                name="message-processing-outline"
                                as={MaterialCommunityIcons}
                                size={moderateScale(20, 0.3)}
                                color={Color.lightGrey}
                              />
                              <CustomText
                                onPress={() => {
                                  setCommentReply(true);
                                }}
                                style={{
                                  ...FONTS.light12,
                                  color: Color.lightGrey,
                                  marginLeft: moderateScale(3, 0.6),
                                }}>
                                {item?.replaycount}
                              </CustomText>
                            </View>
                          </View> */}
                        </View>
                      );
                    })}
                </>
              );
            }}
          />
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
        <TouchableOpacity style={styles.send_btn}>
          <Icon
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
    height: windowHeight,
    backgroundColor: Color.background_color,
  },
  main_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: Color.white,
    width: windowWidth * 0.93,
    // height: windowHeight,
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
  coment_view: {
    width: '100%',
    borderRadius: SIZES.padding,
    borderWidth: 1,
    marginVertical: SIZES.padding - 10,
    borderColor: Color.veryLightGray,
    paddingHorizontal: SIZES.padding - 10,
    paddingVertical: SIZES.padding - 15,
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
    backgroundColor: 'red',
    marginHorizontal: moderateScale(5, 0.3),
  },
  imagebox: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  Video: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: moderateScale(10, 0.6),
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
});
