import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import {homeListData} from '../Config/dummyData';
import Card from '../Components/Card';
import {SIZES} from '../Config/theme';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const profileData = useSelector(state => state.commonReducer.userData);
  const [selectedData, setSelectedData] = useState('Stolen');
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.background_color}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <CustomHeader
          text={'TimeLine'}
          leftIcon
          isCamer={true}
          RightIcon={true}
        />
        <View style={styles.main_view}>
          <View style={styles.btn_view}>
            <TouchableOpacity
              onPress={() => {
                setSelectedData('Stolen');
              }}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    selectedData == 'Stolen' ? Color.blue : Color.white,
                },
              ]}>
              <CustomText
                onPress={() => {
                  setSelectedData('Stolen');
                }}
                style={[styles.btn_text ,{color:   selectedData == 'Stolen' ? Color.white :Color.black}]}>
                Stolen
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedData('Founded');
              }}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    selectedData == 'Founded' ? Color.blue : Color.white,
                },
              ]}>
              <CustomText
                onPress={() => {
                  setSelectedData('Founded');
                }}
                style={[styles.btn_text, {color:   selectedData == 'Founded' ? Color.white :Color.black}]}>
                Founded
              </CustomText>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              marginVertical: moderateScale(20, 0.6),
              marginBottom: moderateScale(70, 0.6),
            }}
            ListFooterComponent={
              <View style={{paddingBottom: moderateScale(80, 0.6)}} />
            }
            data={homeListData}
            renderItem={({item, index}) => {
              return <Card item={item} index={index}/>;
            }}
          />
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
    backgroundColor: Color.background_color,
  },
  main_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  btn_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(50, 0.5),
    
  },
  btn: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity:  0.16,
shadowRadius: 2.54,
elevation: 2
  },
  btn_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
  },
});
