import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import CardContainer from '../Components/CardContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const Numberverfication = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{height: '100%', width: '100%'}}
          source={require('../Assets/Images/otp.png')}
        />
      </View>
      <CustomText isBold style={styles.heading}>
        Verification
      </CustomText>
      <CustomText style={styles.text}>
        We send OPT number on your phone
      </CustomText>

     
        <CodeField
          placeholder={'4'}
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <CustomText
                style={[styles.cellText, isFocused && {color: Color.black}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
       
      <CustomButton
        text={'Verify'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(30, 0.3)}
        onPress={() => {
        }}
        bgColor={Color.themeColor}
        borderRadius={moderateScale(30, 0.3)}
      />
    </View>
  );
};

export default Numberverfication;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: windowHeight * 0.1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    // justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  imageContainer: {
    height: windowHeight * 0.27,
    width: windowHeight * 0.23,
  },
  heading: {
    color: Color.black,
    fontSize: moderateScale(18, 0.6),
    marginTop: windowHeight * 0.025,
  },
  text: {
    color: Color.darkGray,
    width: windowWidth * 0.78,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
  },
  focusCell: {
    borderColor: Color.yellow,
    borderWidth: 1,
  },
  cellText: {
    color: Color.yellow,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
});
