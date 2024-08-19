import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import { FONTS } from '../Config/theme';

const GroupCard = ({item}) => {
  console.log("🚀 ~ GroupCard ~ item:", item)
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={item?.assetsimage}
          />
        </View>
        <View style={{width:windowWidth*0.55}}>
          <CustomText isBold style={styles.text}>
           {item?.assetsName}
          </CustomText>
          <View style={styles.row2}>
            <CustomText isBold style={styles.membertext}>
              {item?.members}
            </CustomText>
            <CustomText isBold style={styles.membertext}>
             {item?.post}
            </CustomText>
          </View>
        </View>
        <CustomButton
          text={'join'}
          fontSize={moderateScale(11, 0.6)}
          textColor={Color.white}
          width={windowWidth * 0.16}
          height={windowHeight * 0.035}
        //   marginTop={moderateScale(20, 0.3)}
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
      </View>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.9,
    marginBottom: moderateScale(10, 0.6),
    padding: moderateScale(5, 0.6),
  },
  rowContainer: {
    flexDirection: 'row',

  },
  imageContainer: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.15,
    borderRadius: moderateScale(5, 0.6),
  },
  text: {
    color: Color.textColor,
    width: windowWidth * 0.78,
    ...FONTS.Regular13,
    // backgroundColor:'red',
    // fontSize: moderateScale(13, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.45,
  },
  membertext: {
    color: Color.mediumGray,
    width: windowWidth * 0.78,
    fontSize: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.23,
  },
  row2: {
    flexDirection: 'row',
  },
});
