import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {imageUrl} from '../Config';

const ImageViewingModal = ({
  visible,
  setIsVisible,
  selectedImageIndex,
  multiImages,
  fromCreatePost,
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
            initialScrollIndex={selectedImageIndex}
            pagingEnabled
            getItemLayout={(data, index) => ({
              length:  windowWidth, // Width of each item (same as the style width)
              offset: 400 * index, // Offset for the given index
              index,
            })}
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            renderItem={({item, index}) => {
              return (
                <ImageZoom
                  style={{height: windowHeight, width: windowWidth}}
                  cropWidth={Dimensions.get('screen').width}
                  cropHeight={Dimensions.get('screen').height}
                  imageWidth={390}
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
});
