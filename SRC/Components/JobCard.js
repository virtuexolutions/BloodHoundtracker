import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import RatingComponent from './RatingComponent';
import { color } from 'native-base/lib/typescript/theme/styled-system';

const JobCard = ({ fromSeeAll, style, onPress, item, getProposal }) => {
  // const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <TouchableOpacity
      style={styles.container}
    // onPress={() => navigation.navigate('JobDetail')}
    >
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={['#FFFFFF', '#FFFFFF89', '#FFFFFF00']}
        style={styles.container}>
        <View style={styles.imagecontainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
            }}
            source={require('../Assets/Images/dummyman1.png')}
          />
        </View>
        {/* <View
          style={{
            // paddingVertical :moderateScale(2,.6) ,
            // paddingHorizontal: moderateScale(10, 0.6),
            // backgroundColor: item?.status == 'waiting for approval' ? '#fac637' :item?.status == 'accept'? '#91E7BF' : item?.status == 'reject' ?'red' :'#9CCFE7',
            // borderRadius: moderateScale(10, 0.6),
            // fontSize: moderateScale(9, 0.6),
            // color: Color.black,
            height:windowHeight*0.0,
            width:windowWidth*0.1,
            position: 'absolute',
            right: 10,
            top: -3,
          }}>
          <CustomImage style={{
            height:'100%',
            width:'100%',
            }} source={require('../Assets/Images/bookmark.png')}/>
            </View> */}
        <CustomText
          // isBold
          style={{
            // paddingVertical :moderateScale(2,.6) ,
            paddingHorizontal: moderateScale(10, 0.6),
            backgroundColor:
              item?.status == 'waiting for approval'
                ? '#fac637'
                : item?.status == 'accept'
                  ? '#91E7BF'
                  : item?.status == 'reject'
                    ? 'red'
                    : '#9CCFE7',
            borderRadius: moderateScale(10, 0.6),
            fontSize: moderateScale(9, 0.6),
            color: Color.black,
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          {item?.status}
        </CustomText>
        <View
          style={{
            paddingTop: moderateScale(10, 0.6),
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(15, 0.6),
            }}>
            chris
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
            }}>
            chris@gmail.com
          </CustomText>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(12, 0.6),
              }}>
              vendor :
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
              }}>
              $500.00
            </CustomText>
          </View>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(12, 0.6),
              }}>
              Negotiator :
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
              }}>
              $400.00
            </CustomText>
          </View>
          <RatingComponent
            key={item => item?.id}
            disable={true}
            rating={5}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(9, 0.3)}
          />
          <View style={styles.timeRow}>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(9, 0.6),
                paddingRight: moderateScale(10, 0.6),
              }}>
              10/06/2022
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(9, 0.6),
                color: Color.black,
              }}>
              07:43 PM
            </CustomText>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = ScaledSheet.create({
  joccard: {
    marginHorizontal: moderateScale(5, 0.6),
    width: windowWidth * 0.43,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    paddingLeft: moderateScale(5, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(2, 0.6),
  },
  timeRow: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(2, 0.6),
  },
  mainViewModal: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(20, 0.6),
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.3),
    backgroundColor: Color.white,
    borderWidth: 2,
    borderColor: Color.blue,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  container: {
    height: windowHeight * 0.16,
    //  backgroundColor:'red',
    borderWidth: 1,
    borderColor: 'white',
    width: windowWidth * 0.9,
    borderTopLeftRadius: moderateScale(55, 0.6),
    borderBottomLeftRadius: moderateScale(55, 0.6),
    marginBottom: moderateScale(10, 0.3),
    borderTopRightRadius: moderateScale(5, 0.6),
    borderBottomRightRadius: moderateScale(5, 0.6),
    flexDirection: 'row',
  },
  imagecontainer: {
    height: windowHeight * 0.14,
    width: windowHeight * 0.14,
    borderRadius: (windowHeight * 0.14) / 2,
    overflow: 'hidden',
    // backgroundColor:'red',
    marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
  text: {
    paddingHorizontal: moderateScale(10, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
});
