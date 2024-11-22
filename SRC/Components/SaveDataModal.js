import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
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

const SaveDataModal = ({imageModal, setImageModal, data}) => {
  console.log('🚀 ~ SaveDataModal ~ data:', data);
  console.log('🚀 ~ SaveDataModal ~ imageModal:', imageModal);
  const refRBSheet = useRef();
  return (
    <Modal
      visible={imageModal}
      onBackdropPress={() => {
        setImageModal(false);
      }}
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.imageView}>
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
        <ImageZoom
          style={{
            marginTop: windowHeight * 0.07,
            height: windowHeight,
            width: windowWidth,
          }}
          cropWidth={Dimensions.get('screen').width}
          cropHeight={Dimensions.get('screen').height}
          imageWidth={400}
          pinchToZoom={true}
          //   doubleClickInterval={2}
          imageHeight={500}>
          <View style></View>
          <CustomImage
            style={{
              width: windowWidth,
              height: windowHeight * 0.5,
              //   paddingTop : windowHeight*0.5
            }}
            source={{uri: `${imageUrl}${data?.file}`}}
          />
        </ImageZoom>
        <View style={styles.like_row}>
          <View style={styles.inner_row}>
            <Icon
              onPress={() => {
                post_like(item?.post_id);
              }}
              name={
                // item?.post?.my_like?.post_id == item?.post_id
                //   ? 'heart'
                //   :
                'heart-outline'
              }
              as={MaterialCommunityIcons}
              size={moderateScale(20, 0.3)}
              color={
                // item?.post?.my_like?.post_id == item?.post_id
                //   ? Color.blue
                //   :
                Color.lightGrey
              }
            />
            <CustomText style={styles.custext}>
              {/* {`${item?.post?.total_post_like} likes`} */}
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
              {/* {`${item?.post?.total_comment} Comments`} */}
            </CustomText>
          </TouchableOpacity>
        </View>
        <ComentsSection
          fromimage={true}
          isBubble={false}
          refRBSheet={refRBSheet}
          //   data={multiImages[currIndex]?.post?.comment}
          //   setCommentsCount={setCommentsCount}
          //   activeIndex={currIndex}
          //   post_id={multiImages[currIndex]?.post?.id}
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
    widtth: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    top: 15,
    left: 15,
  },
});
