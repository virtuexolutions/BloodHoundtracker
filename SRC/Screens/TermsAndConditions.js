import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';

const TermsAndConditions = () => {
  const navigation = useNavigation();
  const termsOfUse = [
    {
      id: 1,
      heading: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 2,
      heading: 'Vestibulum Consectetur',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget justo a odio tincidunt aliquet a sit amet quam. Cras ultricies, risus ac suscipit vulputate, eros purus faucibus enim, in sollicitudin nisl ligula id velit.',
    },
    {
      id: 3,
      heading: 'Fusce Vehicula Tincidunt',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non massa et erat malesuada tincidunt. Vivamus ut massa vel nulla euismod dictum non a augue. Fusce vehicula nisi sit amet tellus fermentum, vel tincidunt lacus tincidunt.',
    },
    {
      id: 4,
      heading: 'Aliquam Ultricies Dictum',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum est sit amet metus malesuada, et sagittis erat vulputate. Nam ut ante vitae erat ultricies dictum. Nulla facilisi. Aliquam ut cursus dolor, vitae accumsan arcu.',
    },
    {
      id: 5,
      heading: 'Nullam Mollis Elementum',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id tincidunt risus. Sed a risus nec lorem elementum mollis in sit amet enim. Nullam vel ex a nunc malesuada consequat vitae a urna. Morbi fermentum.',
    },
  ];
  return (
    <View style={styles.maincontainer}>
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
          color={Color.lightGrey}
          size={moderateScale(20, 0.3)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: windowHeight * 0.1,
        }}>
        <CustomText isBold style={styles.h1}>
          Terms & conditions
        </CustomText>
        <CustomText style={styles.text1}>
          {
            'Use of this app is governed by these Terms and Conditions; therefore, your use implies your acceptance of them. It is advised that the terms and conditions stated in the following pages be well understood before requesting any service from us.'
          }
        </CustomText>
        {termsOfUse.map((item, index) => {
          return (
            <View>
              <CustomText isBold style={styles.heading}>
                {item.id}. {item?.heading}
              </CustomText>
              <CustomText style={styles.text2}>{item.description}</CustomText>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
``
export default TermsAndConditions;

const styles = ScaledSheet.create({
  maincontainer: {
    width: windowWidth,
    minHeight: windowHeight,
    paddingBottom: moderateScale(40, 0.6),
    paddingHorizontal: moderateScale(12, 0.2),
  },
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.darkGray,
    textAlign: 'justify',
    fontSize: moderateScale(14, 0.6),
  },
  text2: {
    marginTop: moderateScale(5, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.lightGrey,
    textAlign: 'justify',
    fontSize: moderateScale(12, 0.6),
  },
  text1: {
    marginTop: moderateScale(30, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.lightGrey,
    textAlign: 'justify',
    fontSize: moderateScale(12, 0.6),
  },
  h1: {
    color: Color.dark,
    width: windowWidth,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(20, 0.6),
  },
});
