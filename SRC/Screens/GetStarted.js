import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';

const GetStarted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/getstart.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <CustomText isBold style={styles.heading}>
          Track Your Asset
        </CustomText>
        <CustomText isBold style={styles.subHeading}>
          Newer Lose Anything Again
        </CustomText>
        <CustomText style={styles.txt}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </CustomText>
      </View>

      <CustomButton
        text={" let's get started"}
        textColor={Color.white}
        width={windowWidth * 0.85}
        height={windowHeight * 0.065}
        marginTop={moderateScale(35, 0.3)}
        onPress={() => {}}
        bgColor={Color.themeColor}
        borderRadius={moderateScale(30, 0.3)}
      />
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    paddingTop: windowHeight * 0.15,
  },
  imageContainer: {
    height: windowHeight * 0.28,
    width: windowWidth * 0.65,
  },
  textContainer: {
    paddingTop: windowHeight * 0.05,
    alignItems: 'center',
  },
  heading: {
    color: Color.themeColor,
    fontSize: moderateScale(19, 0.6),
  },
  subHeading: {
    color: Color.themeColor,
    fontSize: moderateScale(15, 0.6),
  },
  txt: {
    color: Color.darkGray,
    width: windowWidth * 0.78,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
  },
});
