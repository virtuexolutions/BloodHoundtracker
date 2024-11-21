import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {imageUrl} from '../Config';
import CustomText from './CustomText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import ComentsSection from './ComentsSection';

const ImageViewingModal = ({
  visible,
  setIsVisible,
  selectedImageIndex,
  multiImages,
  fromCreatePost,
  setMultiImages,
}) => {
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const token = useSelector(state => state.authReducer.token);
  const [isloading, setIsLoading] = useState(false);
  // const [curren]
  const [like, setLike] = useState(false);
  const [currIndex, setCurrentIndex] = useState(0);
  const [comment, setComments] = useState(
    multiImages?.comment ? multiImages?.comment : [],
  );

  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (visible && flatListRef.current && selectedImageIndex !== undefined) {
      scrollToIndex(selectedImageIndex);
    }
  }, [visible, selectedImageIndex]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToOffset({offset: index * windowWidth});
  };

  const post_like = async postid => {
    const url = 'auth/post_like';
    setIsLoading(true);
    const response = await Post(url, {post_id: postid}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setLike(!like);
    }
  };

  return (
    <Modal
      visible={visible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SafeAreaView>
        <View style={styles.imageView}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.back}>
              <Icon
                name="arrowleft"
                as={AntDesign}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(20, 0.3)}
                onPress={() => {
                  setIsVisible(false);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon
                as={Entypo}
                name="dots-three-vertical"
                size={moderateScale(15, 0.6)}
                color={Color.black}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={multiImages}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedImageIndex}
            pagingEnabled
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: 400 * index,
              index,
            })}
            onScroll={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const itemWidth = windowWidth * 0.95;
              const index = Math.round(contentOffsetX / itemWidth);
              setCurrentIndex(index);
            }}
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            renderItem={({item, index}) => {
              return (
                <>
                  <ImageZoom
                    style={{height: windowHeight, width: windowWidth}}
                    cropWidth={Dimensions.get('screen').width}
                    cropHeight={Dimensions.get('screen').height}
                    imageWidth={400}
                    pinchToZoom={true}
                    imageHeight={500}>
                    <CustomImage
                      style={{
                        width: windowWidth,
                        height: windowHeight * 0.4,
                      }}
                      source={{uri: `${imageUrl}${item?.file}`}}
                    />
                  </ImageZoom>
                  <View style={styles.like_row}>
                    <View style={styles.inner_row}>
                      <Icon
                        onPress={() => {
                          post_like(item?.post_id);
                        }}
                        name={
                          item?.post?.my_like?.post_id == item?.post_id
                            ? 'heart'
                            : 'heart-outline'
                        }
                        as={MaterialCommunityIcons}
                        size={moderateScale(20, 0.3)}
                        color={
                          item?.post?.my_like?.post_id == item?.post_id
                            ? Color.blue
                            : Color.lightGrey
                        }
                      />
                      <CustomText style={styles.custext}>
                        {`${item?.post?.total_post_like} likes`}
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
                        {`${item?.post?.total_comment} Comments`}
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  <ComentsSection
                    fromimage={true}
                    isBubble={false}
                    refRBSheet={refRBSheet}
                    data={multiImages[currIndex]?.post?.comment}
                    setCommentsCount={setCommentsCount}
                    activeIndex={currIndex}
                    post_id={multiImages[currIndex]?.post?.id}
                  />
                </>
              );
            }}
          />

          {fromCreatePost && (
            <TouchableOpacity
              onPress={() => {
                let newArray = [...multiImages];
                newArray.splice(selectedImageIndex, 1);
                setMultiImages(newArray);
                if (selectedImageIndex == 0) {
                  setIsVisible(false);
                }
              }}
              style={styles.customBtn}>
              <Icon
                onPress={() => {
                  let newArray = [...multiImages];
                  newArray.splice(selectedImageIndex, 1);
                  setMultiImages(newArray);
                  if (selectedImageIndex == 0) {
                    setIsVisible(false);
                  }
                }}
                as={FontAwesome5}
                name="trash"
                size={moderateScale(22, 0.6)}
                color={Color.black}
              />
            </TouchableOpacity>
          )}
          {/* <ComentsSection
          fromimage={true}
          isBubble={false}
          refRBSheet={refRBSheet}
          data={multiImages}
          setCommentsCount={setCommentsCount}
          // bubbleInfo={bubbleInfo}
        /> */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewingModal;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    widtth: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.16)',
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
});
