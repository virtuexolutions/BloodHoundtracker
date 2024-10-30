import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import {FONTS} from '../Config/theme';
import { useNavigation } from '@react-navigation/native';

const StolenAssetsCard = ({item}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() =>{
      navigation.navigate('DetailScreen')
    }} style={styles.card}>
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
    </TouchableOpacity>
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
    ...FONTS.Medium13,
    color: Color.textColor,
  },
  text_row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  imageContainer: {
    paddingTop: moderateScale(5, 0.6),
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
    borderRadius: moderateScale(5, 0.6),
  },
});
