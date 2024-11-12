import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import SearchContainer from './SearchContainer';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import CustomImage from './CustomImage';
import {FlatList} from 'react-native';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import { baseUrl, imageUrl } from '../Config';

const TagPeopleModal = ({
  tagModal,
  setTagModal,
  serachData,
  setSearchData,
  setSelectedPeople,
  selectedPeople,
}) => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const [userListData ,setUserListData] = useState([])
  const dummyArray = [
    {id: 1, name: 'alex', image: require('../Assets/Images/dummyman1.png')},
    {id: 2, name: 'david', image: require('../Assets/Images/dummyman2.png')},
    {id: 3, name: 'chris', image: require('../Assets/Images/dummyman3.png')},
    {id: 4, name: 'john', image: require('../Assets/Images/dummyman4.png')},
    {id: 5, name: 'joshua', image: require('../Assets/Images/dummyman5.png')},
    {id: 6, name: 'adam', image: require('../Assets/Images/dummyman6.png')},
    {
      id: 7,
      name: 'christopher',
      image: require('../Assets/Images/dummyman5.png'),
    },
    {
      id: 8,
      name: 'christina',
      image: require('../Assets/Images/dummyman5.png'),
    },
  ];

  const userListApi = async () => {
    const url = 'auth/tag_list ';
    const response = await Get(url, token);
   console.log("🚀  ============ :", JSON.stringify(response?.data?.data?.tag_list ,null,2))
    if (response != undefined) {
      setUserListData(response?.data?.data?.tag_list)
    }
  };
  useEffect(() => {
    userListApi()
  }, [isFocused])
  

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={tagModal}
      onBackdropPress={() => {
        setTagModal(false);
      }}>
      <View style={styles.maincontainer}>
        <CustomText isBold style={styles.heading}>
          tag people
        </CustomText>

        <SearchContainer
          style={{
            height: windowHeight * 0.05,
            borderRadius: 8,
            marginTop: moderateScale(15, 0.6),
          }}
          data={serachData}
          setData={setSearchData}
          input={true}
          width={windowWidth * 0.86}
        />
        <FlatList
          data={userListData}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.6),
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.row}>
                <View style={styles.image}>
                  <CustomImage
                    style={{
                      height: '100%',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                    source={{uri:`${baseUrl}/${item?.photo}`}}
                  />
                </View>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    width: windowWidth * 0.65,
                    paddingHorizontal: moderateScale(5, 0.6),
                  }}>
                  {item?.name}
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedPeople?.some(data => data?.id == item?.id)) {
                      const temp = [...selectedPeople];
                      setSelectedPeople(
                        temp?.filter((item1, index) => item1?.id != item?.id),
                      );
                    } else {
                      setSelectedPeople(prev => [...prev, item]);
                    }
                  }}
                  style={[styles.box]}>
                  {selectedPeople?.some(data => data?.id == item?.id) && (
                    <Icon
                      as={Entypo}
                      name="check"
                      size={moderateScale(15, 0.6)}
                      color={Color.blue}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {selectedPeople?.length > 0 && (
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 10,
            }}>
            <CustomButton
              text={'done'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.05}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                setTagModal(false);
              }}
              bgColor={Color.blue}
              borderColor={Color.blue}
              borderWidth={1}
              borderRadius={moderateScale(8, 0.3)}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default TagPeopleModal;

const styles = StyleSheet.create({
  // mainContainer: {
  //   height: windowHeight * 0.9,
  //   width: windowWidth * 0.9,
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   borderRadius: moderateScale(5, 0.6),
  //   paddingVertical: moderateScale(10, 0.6),
  // },
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.85,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.blue,
  },
  heading: {
    fontSize: moderateScale(18, 0.6),
    color: Color.blue,
    paddingTop: windowHeight * 0.01,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: moderateScale(20),
  },
  image: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: moderateScale((windowHeight * 0.05) / 2),
    overflow: 'hidden',
  },
  box: {
    borderWidth: 1,
    borderColor: Color.mediumGray,
    height: windowHeight * 0.017,
    width: windowWidth * 0.04,
  },
});
