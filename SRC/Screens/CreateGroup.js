import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import {FONTS} from '../Config/theme';
import CustomButton from '../Components/CustomButton';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrivacyModal from '../Components/PrivacyModal';
import { useNavigation } from '@react-navigation/native';

const CreateGroup = () => {

  const navigation = useNavigation()
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [visibility, setvisiblity] = useState('visible');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategoryType, setSelectedCategoryType] = useState('');
  const privacyArray = ['ffaadf', 'fafaf ', 'fdadsfadsf'];
  const [rbRef, setRef] = useState(null);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}
        style={styles.mainContainer}>
        <CustomHeader text={'Crate Group'} leftIcon />
        <View style={styles.titleContainer}>
          <CustomText isBold style={styles.title}>
            Name
          </CustomText>
          <TextInputWithTitle
            secureText={false}
            placeholder={'Name Your Group'}
            setText={setGroupName}
            value={groupName}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            borderColor={Color.mediumGray}
            backgroundColor={'#FFFFFF'}
            border={1}
            marginTop={moderateScale(5, 0.6)}
            color={Color.darkGray}
            placeholderColor={Color.themeLightGray}
          />
        </View>
        <View style={styles.titleContainer}>
          <CustomText isBold style={styles.title}>
            privacy
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              rbRef.open();
              setSelectedType('privacy');
            }}
            style={styles.dropdown}>
            <View style={{paddingHorizontal: moderateScale(15, 0.6)}}>
              <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular14,

                  paddingTop: moderateScale(10, 0.6),
                }}>
                {privacy}
              </CustomText>
              {/* <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular10,

                  // paddingTop: moderateScale(5, 0.6),
                }}>
               {selectedCategoryType}
              </CustomText> */}
            </View>
            <Icon
              style={styles.icon}
              name={'arrow-drop-down'}
              as={MaterialIcons}
              size={moderateScale(25, 0.6)}
              color={Color.darkGray}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <CustomText style={styles.card_text}>
            Only members can see who's in the group and what they post. You
            can't change this group to public later. Learn More
          </CustomText>
          <CustomText
            style={[
              styles.card_text,
              {
                color: Color.themeColor,
                width: windowWidth * 0.23,
                borderBottomWidth: 1,
                borderColor: Color.themeColor,
                alignSelf: 'left',

                // textAlign:'left'
              },
            ]}>
            Learn More
          </CustomText>
        </View>
        <View style={styles.titleContainer}>
          <CustomText isBold style={styles.title}>
            Visibility
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              rbRef.open();
              setSelectedType('visibility');
            }}
            style={styles.dropdown}>
            <View style={{paddingHorizontal: moderateScale(15, 0.6)}}>
              <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular14,

                  paddingTop: moderateScale(10, 0.6),
                }}>
                {visibility}
              </CustomText>
              {/* <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular10,

                  // paddingTop: moderateScale(5, 0.6),
                }}>
                visibility
              </CustomText> */}
            </View>
            <Icon
              style={styles.icon}
              name={'arrow-drop-down'}
              as={MaterialIcons}
              size={moderateScale(25, 0.6)}
              color={Color.darkGray}
            />
          </TouchableOpacity>
        </View>
        <CustomButton
          text={'Create group'}
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.05}
          marginTop={windowHeight * 0.15}
          onPress={() => {
            navigation.navigate('HomeScreen')
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
        {/* <PrivacyModal  rbRef={rbRef} setRef={setRef}/> */}
        <PrivacyModal
          rbRef={rbRef}
          setRef={setRef}
          selectedType={selectedType}
          privacy={privacy}
          setPrivacy={setPrivacy}
          setvisiblity={setvisiblity}
          visibility={visibility}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F9F9F9',
  },
  titleContainer: {
    paddingTop: windowHeight * 0.02,
  },
  title: {
    color: Color.black,
    ...FONTS.Medium13,
    paddingHorizontal: moderateScale(5, 0.6),
  },
  card: {
    marginTop: windowHeight * 0.04,
    width: windowWidth * 0.85,
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: '#E9E9E9',
    borderRadius: moderateScale(5, 0.6),
  },
  card_text: {
    ...FONTS.Regular12,
    width: windowWidth * 0.75,
  },
  dropdown: {
    marginTop: moderateScale(5, 0.6),
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(5, 0.6),
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
