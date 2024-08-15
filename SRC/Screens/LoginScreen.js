import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Customer',
  );

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        contentContainerStyle={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
        style={{
          width: '100%',
          // paddingTop: windowHeight * 0.1,
        }}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{height: '100%', width: '100%'}}
            source={require('../Assets/Images/login.png')}
            resizeMode={'contain'}
          />
        </View>
        <CustomText isBold style={styles.heading}>
          welcome back!
        </CustomText>
        <CustomText style={styles.text}>
          Let’s login for explore continues
        </CustomText>

        <View style={styles.titleContainer}>
          <CustomText style={styles.title}>Email or Phone Number</CustomText>
          <TextInputWithTitle
            iconName={'envelope'}
            iconType={EvilIcons}
            titleText={'Enter your Email'}
            secureText={false}
            placeholder={'Hello@Zachry.com'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(5, 0.6)}
            color={Color.darkGray}
            placeholderColor={Color.themeLightGray}
            // borderRadius={moderateScale(25, 0.3)}
          />
        </View>
        <View style={{paddingTop: windowHeight * 0.015}}>
          <CustomText style={styles.title}>password</CustomText>

          <TextInputWithTitle
            iconName={'lock'}
            iconType={AntDesign}
            titleText={'Enter your password'}
            secureText={true}
            placeholder={'Enter your password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(5, 0.6)}
            color={Color.darkGray}
            placeholderColor={Color.themeLightGray}
            marginBottom={moderateScale(10, 0.3)}
          />
        </View>
        {/* <CustomText
          onPress={() => {
            navigationService.navigate('EnterPhone', {fromForgot: true});
          }}
          style={styles.txt3}>
          {'Forgot Password?'}
        </CustomText> */}

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Login'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          elevation
        />
        <View style={styles.row}>
          <View style={styles.line}></View>
          <CustomText style={styles.connect}>You can Connect </CustomText>
          <View style={styles.line}></View>
        </View>
        <View style={styles.second_row}>
          <View style={styles.icon}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/google.png')}
            />
          </View>
          <View style={styles.icon}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/mac.png')}
            />
          </View>
        </View>

        <View style={styles.container2}>
          <CustomText style={styles.txt5}>
            {"Don't have an account? "}
          </CustomText>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginLeft: windowWidth * 0.01,
              borderBottomWidth: 1,
              borderColor: Color.themeColor,
            }}
            onPress={() => navigationService.navigate('Signup')}>
            <CustomText
              style={[
                styles.txt4,
                {
                  color: Color.themeColor,
                },
              ]}>
              {'Sign Up here'}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  imageContainer: {
    marginTop:windowHeight * 0.08 ,
    height: windowHeight * 0.25,
    width: windowWidth * 0.8,
  },
  titleContainer: {
    paddingTop: windowHeight * 0.02,
  },
  title: {
    color: Color.dar,
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    marginTop: moderateScale(8, 0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(12, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.mediumGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  connect: {
    color: Color.darkGray,
    fontSize: moderateScale(11, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
  },

  heading: {
    color: Color.black,
    fontSize: moderateScale(18, 0.6),
    marginTop:windowHeight*0.025,
  },
  text: {
    color: Color.darkGray,
    width: windowWidth * 0.78,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
  },
  line: {
    height: windowHeight * 0.002,
    width: windowHeight * 0.13,
    backgroundColor: Color.mediumGray,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(15, 0.3),
    flexDirection: 'row',
    width: windowWidth * 0.9,
  },
  second_row: {flexDirection: 'row', paddingTop: moderateScale(10, 0.6)},
  icon: {
    height: windowHeight * 0.03,
    width: windowHeight * 0.05,
    // backgroundColor: 'red',
    marginHorizontal: moderateScale(5, 0.3),
  },
});

export default LoginScreen;
