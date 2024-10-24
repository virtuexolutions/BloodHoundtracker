import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';

const ImageViewingModal = ({
  visible,
  setIsVisible,
  selectedImageIndex,
  setSelectedImageIndex,
  multiImages,
  setMultiImages,
}) => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible && flatListRef.current && selectedImageIndex !== undefined) {
      scrollToIndex(selectedImageIndex);
    }
  }, [visible, selectedImageIndex]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToOffset({offset: index * windowWidth});
  };
  return (
    <Modal visible={visible}>
      <SafeAreaView>
        <View style={styles.imageView}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}></TouchableOpacity>

            <CustomButton
              iconStyle={{
                width: windowWidth * 0.09,
                height: windowHeight * 0.05,
                textAlign: 'center',
                paddingHorizontal: moderateScale(12, 0.2),
                paddingTop: moderateScale(15, 0.6),
                fontSize: moderateScale(24, 0.6),
                color: Color.black,
              }}
              iconName="cross"
              iconType={Entypo}
              iconSize={18}
              // color={Color.white}
              marginTop={moderateScale(5, 0.3)}
              onPress={() => {
                setIsVisible(false);
              }}
              width={windowHeight * 0.06}
              height={windowHeight * 0.06}
            />
          </View>

          <FlatList
            ref={flatListRef}
            data={multiImages}
            keyExtractor={item => item?.id}
            horizontal
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    onLongPress={() => {
                      setModalVisible(true);
                      console.log('on long press===========>');
                    }}
                    style={{
                      width: windowWidth,
                      height: windowHeight * 0.4,
                      marginTop: windowHeight * 0.15,
                      // justifyContent: 'center',
                      //   alignItems: 'center',
                      // overflow: 'hidden',
                    }}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={{uri: item?.uri}}
                    />
                  </TouchableOpacity>
                  <Icon
                    onPress={() => {
                      if (multiImages?.length == 1) {
                        let newArray = [...multiImages];
                        newArray.splice(index, 1);
                        setMultiImages(newArray);
                        setIsVisible(false);
                      } else {
                        let newArray = [...multiImages];
                        newArray.splice(index, 1);
                        setMultiImages(newArray);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 120,
                      width: windowWidth,
                      textAlign: 'center',
                      //   marginHorizontal:moderateScale(50,.6)
                    }}
                    as={Ionicons}
                    name={'trash-outline'}
                    size={moderateScale(25, 0.6)}
                    color={Color.black}
                  />
                </>
              );
            }}
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewingModal;

const styles = StyleSheet.create({
  mainContainer: {
    // height: windowHeight * 0.9,
    // width: windowWidth * 0.9,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: moderateScale(5, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    widtth: windowWidth,
    height: windowHeight,

    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.16)',

    // paddingHorizontal:moderateScale(12,0.2)
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.themeColor,
  },
});
