import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Card from '../Components/Card';
import {SIZES} from '../Config/theme';
import {useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.userData);
  const [selectedData, setSelectedData] = useState('Stolen');
  const [postData, setPostData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const postlist = async () => {
    const url = `auth/post?category=${selectedData}`;
    setIsLoading(true);
    const response = await Get(url, token);
    console.log(
      '🚀 ~ postlist ~ response:',
      JSON.stringify(response?.data, null, 2),
    );
    setIsLoading(false);
    if (response != undefined) {
      setPostData(response?.data?.post_list);
    }
  };
  useEffect(() => {
    postlist();
  }, [selectedData]);

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
                style={[
                  styles.btn_text,
                  {color: selectedData == 'Stolen' ? Color.white : Color.black},
                ]}>
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
                style={[
                  styles.btn_text,
                  {
                    color:
                      selectedData == 'Founded' ? Color.white : Color.black,
                  },
                ]}>
                Founded
              </CustomText>
            </TouchableOpacity>
          </View>
          {isloading ? (
            <ActivityIndicator
              style={{
                height: windowHeight * 0.8,
              }}
              size={'small'}
              color={Color.blue}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                marginVertical: moderateScale(20, 0.6),
              }}
              contentContainerStyle={{
                paddingBottom: moderateScale(150, 0.6),
              }}
              ListEmptyComponent={
                <View
                  style={{
                    paddingBottom: moderateScale(120, 0.6),
                    alignItems: 'center',
                  }}>
                  <CustomText>no posted yet ! </CustomText>
                </View>
              }
              data={postData.reverse()}
              renderItem={({item, index}) => {
                return <Card item={item} index={index} loading={isloading} />;
              }}
            />
          )}
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.54,
    elevation: 2,
  },
  btn_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
  },
});
