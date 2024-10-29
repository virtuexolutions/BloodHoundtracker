import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import CustomHeader from '../Components/CustomHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchToggle from 'react-native-switch-toggle';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';

const Settings = ({navigation, route}) => {
  const [notificationOn, setNotificationOn] = useState(false);
  const [appNotificationOn, setAppNotificationOn] = useState(false);
  const DATA = [
    {
      iconType: AntDesign,
      iconName: 'user',
      title: 'Account',
      data: [
        {
          title: 'Edit Profile',
          icon: true,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          onPress: () => {},
        },
        {
          title: 'Change Pssword',
          icon: true,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          onPress: () => {
            navigation.navigate('ChangePasswordScreen');
          },
        },
      ],
    },
    {
      iconType: Ionicons,
      iconName: 'notifications-outline',
      title: 'Notifications',
      data: [
        {
          title: 'Notifications',
          icon: false,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          toggleState: notificationOn,
          ontoggle: () => {
            setNotificationOn(prev => !prev);
          },
        },
        {
          title: 'App Notification',
          icon: false,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          toggleState: appNotificationOn,
          ontoggle: () => {
            setAppNotificationOn(prev => !prev);
          },
        },
      ],
    },
    {
      iconType: MaterialCommunityIcons,
      iconName: 'shape-square-rounded-plus',
      title: 'More',
      data: [
        {
          title: 'Privacy Policy',
          icon: true,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          onPress: () => {
            navigation.navigate('PrivacyPolicy');
          },
        },
        {
          title: 'Terms & Conditions',
          icon: true,
          iconType: MaterialIcons,
          iconName: 'arrow-forward-ios',
          onPress: () => {
            navigation.navigate('TermsAndConditions');
          },
        },
      ],
    },
    {
      title: 'Logout',
      data: [{title: 'Logout', onPress: () => {}}],
    },
  ];

  return (
    <View style={styles.mainScreen}>
      {/* <CustomHeader leftIcon/> */}
      {/* <TouchableOpacity style={styles.backBtn} >
        <Icon as={MaterialIcons} name='arrow-back-ios-new'/>
      </TouchableOpacity> */}
      <CustomText isBold style={styles.title}>
        Settings
      </CustomText>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return (
            <>
              {item.title == 'Logout' ? (
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={item.onPress}>
                    <Icon
                      as={AntDesign}
                      name="logout"
                      style={styles.logoutIcon}
                      size={moderateScale(20, 0.3)}
                    />
                    <CustomText>Logout</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={item.onPress}
                  style={styles.nestedItem}>
                  <CustomText style={styles.nestedItemTitle}>
                    {item?.title}
                  </CustomText>
                  {item.icon ? (
                    <Icon as={MaterialIcons} name="arrow-forward-ios" />
                  ) : (
                    <SwitchToggle
                      switchOn={item.toggleState}
                      onPress={item.ontoggle}
                      containerStyle={styles.swicthContainer}
                      circleStyle={styles.swicthCircle}
                      // circleColorOff='#C4C4C4'
                      circleColorOn={
                        item.title == 'Notifications' ? '#75d7f5' : '#ce3b91'
                      }
                      backgroundColorOn="#c7c4c4"
                      // backgroundColorOff='#C4C4C4'
                    />
                  )}
                </TouchableOpacity>
              )}
            </>
          );
        }}
        renderSectionHeader={({section: {title, iconType, iconName}}) => {
          return (
            <>
              {title !== 'Logout' ? (
                <View style={styles.nestedTitleContainer}>
                  <Icon
                    as={iconType}
                    name={iconName}
                    size={moderateScale(20, 0.2)}
                    style={styles.icon}
                    tintColor={'grey'}
                  />
                  <CustomText isBold style={styles.nestedTile}>
                    {title}
                  </CustomText>
                </View>
              ) : null}
            </>
          );
        }}
      />
      {/* <View style={styles.footer}>
          <TouchableOpacity>
            <Icon as={AntDesign} name='logout' size={moderateScale(20,0.3)}/>
            <CustomText isBold>Logout</CustomText>
          </TouchableOpacity>
        </View> */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(18, 0.2),
    paddingVertical: moderateScale(22, 0.3),
  },
  nestedTitleContainer: {
    width: windowWidth,
    // paddingVertical:moderateScale(21,0.2),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10, 0.2),
    marginTop: moderateScale(10, 0.2),
    paddingVertical: moderateScale(12, 0.3),
  },
  nestedTile: {
    fontSize: moderateScale(15, 0.3),
  },
  icon: {
    // color:'blue'
    fontWeight: 'bold',

    // fontSize:moderateScale(24,0.3)
  },
  title: {
    marginVertical: moderateScale(16, 0.3),
    fontSize: moderateScale(25, 0.3),
  },
  nestedItem: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(4, 0.2),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(16, 0.2),
  },
  nestedItemTitle: {
    color: 'grey',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(20, 0.2),
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems:'çenter',
    justifyContent:"center",
    marginTop:moderateScale(20,0.3),
    elevation:4,
    // borderRadius:moderateScale(10 ,0.2),
    padding:moderateScale(12,0.2),
    // borderWidth:1,
    shadowColor:Color.veryLightGray, 
    gap: moderateScale(12, 0.3),
  },
  logoutIcon: {
    color: '#0077ff',
  },
  swicthContainer: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.03,
    borderRadius: moderateScale(20, 0.3),
  },
  swicthCircle: {
    width: windowWidth * 0.03,
    height: windowWidth * 0.03,
    borderRadius: (windowWidth * 0.03) / 2,
  },
});
