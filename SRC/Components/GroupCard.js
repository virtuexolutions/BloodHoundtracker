import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import {FONTS} from '../Config/theme';
import navigationService from '../navigationService';
import {imageUrl} from '../Config';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import Color from '../Assets/Utilities/Color';

const GroupCard = ({item}) => {
  console.log('🚀 ~ GroupCard =====================~ item:', item?.image);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigationService.navigate('GroupDeatils', {item: item?.assetsName})
      }>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={{uri: `${imageUrl}${item?.image}`}}
          />
        </View>
        <View style={{width: windowWidth * 0.55 ,paddingTop : moderateScale(8,.6)}}>
          <CustomText isBold style={styles.text}>
            {item?.name}
            
          </CustomText>
          <CustomText 
          numberOfLines={1}
          isBold style={[styles.text,{
            fontSize : moderateScale(10,.6),
            color: Color.lightGrey
          }]}>
            {item?.description}
          </CustomText>
          <View style={styles.row2}>
            <CustomText isBold style={styles.membertext}>
              DFJSHDGF
              {item?.members}
            </CustomText>
            <CustomText isBold style={styles.membertext}>
              KDFHSJ
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
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
        />
      </View>
    </TouchableOpacity>
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
  paddingTop : moderateScale(5,.6)
  },
});
