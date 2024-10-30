import { Icon } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { setUserLogoutAuth } from '../Store/slices/auth';
import { setUserLogOut } from '../Store/slices/common';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTS } from '../Config/theme';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ leftIcon, RightIcon, isCamer, text, style, logout }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, style && style]}>
      {leftIcon &&
        <Icon
          name={isCamer ? 'camera' : 'arrow-back'}
          as={isCamer ? Feather : MaterialIcons}
          size={moderateScale(22, 0.3)}
          color={Color.lightGrey}
          style={{
            position: 'absolute',
            left: moderateScale(10, 0.3),
          }}
          onPress={() => {
            navigation.goBack()
          }}
        />
      }
      <CustomText style={styles.text}>{text}</CustomText>
      {RightIcon &&
        <Icon
          name='message-processing-outline'
          as={MaterialCommunityIcons}
          size={moderateScale(22, 0.3)}
          color={Color.themePink}
          style={{
            position: 'absolute',
            right: moderateScale(10, 0.3),
          }}
          onPress={() => {
            navigation.navigate('MessageList')
            // dispatch(setUserLogOut())
            // dispatch(setUserLogoutAuth())
          }}
        />
      }
      {logout &&
        <Icon
          name='exit-outline'
          as={Ionicons}
          size={moderateScale(22, 0.3)}
          color={Color.lightGrey}
          style={{
            position: 'absolute',
            right: moderateScale(1, 0.3),
          }}
          onPress={() => {
            // navigation.navigate('MessageList')
            // dispatch(setUserLogOut())
            dispatch(setUserLogoutAuth())
          }}
        />
      }
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: windowWidth * 0.95,
    height: moderateScale(50, 0.6),
    backgroundColor: 'tranparent',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    alignSelf: 'center'
  },
  text: {
    color: Color.lightGrey,
    ...FONTS.Medium19,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
