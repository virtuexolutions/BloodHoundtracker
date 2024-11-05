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

const DetailScreen = props => {
  const item = props?.route?.params?.item;
  console.log('🚀 ~ DetailScreen ~ Detaildata:', item);
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(false);
  const [share ,setShare] =useState(false)
  console.log('🚀 ~ Card ~ like:', like);
  const [commentReply, setCommentReply] = useState(false);
  console.log('🚀 ~ DetailScreen ~ commentReply:', commentReply);
  const locationName = [
    '@South Beach',
    ' @Wynwood Arts District',
    '@Little Havana',
    '@South Beach',
    ' @Wynwood Arts District',
  ];
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
          {item?.images.length > 1 ? (
            <View
              style={{
                width: windowWidth * 0.8,
                height: windowHeight * 0.3,
                alignSelf: 'center',
                borderRadius: moderateScale(20, 0.6),
              }}>
              <ImageSlider
                loopBothSides
                // autoPlayWithInterval={3000}
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
          ) : item?.mediatype == 'image' ? (
            <View
              style={{
                width: windowWidth * 0.8,
                height: windowHeight * 0.3,
                borderRadius: moderateScale(20, 0.6),
                alignSelf: 'center',
                marginTop: moderateScale(10, 0.6),
              }}>
              <CustomImage
                source={item?.images}
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
                // ref={ref => setvideoRef(ref)}
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
          )}
          <CustomText
            style={{...FONTS.Medium15, marginTop: SIZES.padding2}}
            isBold>
            Detail Discription
          </CustomText>
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginTop: moderateScale(5, 0.6),
            }}>
            In Miami, my electric trail motorbike, painted in striking blue, has
            gone missing, leaving only a scratched fuel tank as a clue to its
            whereabouts. I'm fervently searching, longing to reunite with my
            prized ride and resume exploring the city's scenic trails.
          </CustomText>
          <CustomText
            style={{...FONTS.Medium15, marginTop: moderateScale(10, 0.6)}}
            isBold>
            Location
          </CustomText>

          <View
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
          </View>
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
            UTC-5:00 during Standard Time and UTC-4:00
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
                12 Coments
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
                85 Likes
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
            data={comentlist}
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
                            // height: windowHeight * 0.2,
                            borderRadius: SIZES.padding,
                            borderWidth: 1,
                            marginVertical: SIZES.padding - 10,
                            marginLeft:moderateScale(22,.3),
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
    alignSelf: 'center',
    // height: windowHeight,
  },
  location_text: {
    ...FONTS.Medium11,
  },
  profile_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  coment_view: {
    width: '100%',
    // height: windowHeight * 0.2,
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
});
