import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import CustomImage from './CustomImage';

const StolenAssetsCard = ({item}) => {
  console.log("🚀 ~ StolenAssetsCard ~ item:", item)
  return (
    <View style={styles.card}>
      <View
        style={{
          paddingVertical: moderateScale(10, 0.6),
        }}>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>asset :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
          {item?.assetsName}
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>color :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            blue
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>souvenir :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            Newyork
          </CustomText>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/Bike.png')}
        />
      </View>
    </View>
  );
};

export default StolenAssetsCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: moderateScale(5, 0.6),
    borderRadius: moderateScale(5, 0.6),
    padding: moderateScale(2, 0.6),
    flexDirection: 'row',
    width: windowWidth * 0.9,
    borderWidth: 1,
    borderColor: Color.mediumGray,
    justifyContent: 'space-between',
  },
  buttons_text: {
    fontSize: moderateScale(13, 0.6),
    color: Color.textColor,
  },
  text_row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  imageContainer: {
    paddingTop:moderateScale(5,.6),
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
    borderRadius: moderateScale(5, 0.6),
  },
});
