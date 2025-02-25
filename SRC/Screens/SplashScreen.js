import React, { useEffect } from 'react';
import {ImageBackground, Linking, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';

const SplashScreen = () => {
  const backgroundImage = require('../Assets/Images/logo.png');
//   useEffect(() =>{
// Linking.getInitialURL().then(url =>{
//   handleDeepLinking({url} ,'CLOSE')
// })
// Linking.addEventListener(url,event => handleDeepLinking(event ,'RESUME'))
//   },[])
  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeColor}
      statusBarContentStyle={'light-content'}>
      <View style={styles.container}>
        <View
          style={{
            height: windowHeight * 0.25,
            width: windowWidth * 0.53,
          }}>
          <CustomImage
            style={{width: '100%', height: '100%'}}
            source={require('../Assets/Images/splash.png')}
          />
        </View>
      </View>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.65,
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    borderRadius: moderateScale((windowWidth * 0.7) / 2, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.white,
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
