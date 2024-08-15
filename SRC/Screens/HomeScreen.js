import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import CustomText from '../Components/CustomText';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import { homeListData } from '../Config/dummyData';
import Card from '../Components/Card';
import { SIZES } from '../Config/theme';

const HomeScreen = () => {
  return (
    <>
      <CustomStatusBar backgroundColor={Color.background_color} barStyle={'dark-content'} />
      <View style={styles.container}>
        <CustomHeader text={'TimeLine'} leftIcon isCamer={true} RightIcon={true} />
        <View style={styles.main_view}>
          <View style={styles.btn_view}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: Color.blue }]}>
              <CustomText style={styles.btn_text}>Stolen</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <CustomText style={[styles.btn_text, { color: Color.black }]}>Founded</CustomText>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: moderateScale(20, 0.6), marginBottom: moderateScale(40, 0.6) }}
            ListFooterComponent={<View style={{ height: moderateScale(50, 0.6) }} />}
            data={homeListData}
            renderItem={({ item, index }) => {
              return <Card item={item} />
            }} />
        </View>
      </View>
    </>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.background_color
  },
  main_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding
  },
  btn_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    height: moderateScale(50, 0.5),
  },
  btn: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6)
  },
  btn_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white
  }
})