import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../Components/CustomHeader';
import {imageUrl} from '../Config';
import { mode } from 'native-base/lib/typescript/theme/tools';
import ComentsSection from '../Components/ComentsSection';
import { comentlist } from '../Config/dummyData';

const MediaPlayerScreen = props => {
  console.log('🚀 ~heeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  const video = props?.route?.params?.item;
  const selectedIndex = props?.route?.params?.index;

  const videoRef = useRef(null);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [ commentsCount ,setCommentsCount] =useState(0)

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  }).current;
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
      }}>
      <CustomHeader
        style={{
          backgroundColor: 'white',
          width: windowWidth,
        }}
        leftIcon
      />
      <FlatList
        data={video}
        ref={videoRef}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={selectedIndex}
        getItemLayout={(data, index) => ({
          length: windowHeight,
          offset: 20 * index,
          index,
        })}
        numColumns={1}
        pagingEnabled
        style={{
          backgroundColor: 'red',
          marginBottom:moderateScale(-100,.6)
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({item, index}) => {
          console.log("🚀 ~ MediaPlayerScreen ~ item:", item)
          return (
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
                  height : windowHeight ,
                  justifyContent : 'center',
                },
              ]}>
              <Video
                ref={videoRef}
                resizeMode={'stretch'}
                repeat={true}
                paused={index !== currentVisibleIndex}
                source={{uri: `${imageUrl}${item?.file}`}}
                style={{
                  width : '100%' ,
                  height : windowHeight * 0.55 ,
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
                onError={error =>
                  console.log('error ================> ', error)
                }
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
                    <CustomText style={styles.text3}>
                      {/* {likeCount}  */}
                      likes
                    </CustomText>
                    <View style={styles.cmtView}></View>
                    <CustomText style={styles.text3}>
                      {/* {commentsCount} */}
                      comments
                    </CustomText>
                  </View>
                  <View style={styles.caption}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        //   backgroundColor: 'green',
                        paddingBottom: moderateScale(20, 0.3),
                      }}>
                      <ShowMoreAndShowLessText
                        minTextLength={10}
                        style={styles.moreLess}>
                        caption here
                        {/* {item?.caption} */}
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
                      gmgj
                      {/* {commentsCount} */}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        // likePost();
                      }}
                      style={styles.btn2}>
                      <Icon
                        name="like1"
                        // name={like ? 'like1' : 'like2'}
                        as={AntDesign}
                        color={'white'}
                        size={5}
                      />
                    </TouchableOpacity>
                    <CustomText numberOfLines={1} style={styles.customT}>
                      55
                      {/* {data?.comments?.length} */}
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
                  <ComentsSection
                    isBubble={false}
                    refRBSheet={refRBSheet}
                    data={item}
                    setCommentsCount={setCommentsCount}
                    // bubbleInfo={bubbleInfo}
                  />
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MediaPlayerScreen;

const styles = StyleSheet.create({
  linearstyle: {
    position: 'absolute',
    bottom: 0,
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
    backgroundColor: 'white',
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
