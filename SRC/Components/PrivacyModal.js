import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { FONTS } from '../Config/theme';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';

const PrivacyModal = ({
  setRef,
  selectedType,
  visibility,
  setvisiblity,
  setPrivacy,
  privacy,
}) => {
  return (
    <RBSheet
      closeOnDragDown={true}
      ref={ref => setRef(ref)}
      height={300}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          height: windowHeight * 0.45,
        },
      }}>
      <View style={styles.mainContainer}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: Color.white,
          }}>
          <CustomText isBold style={styles.Text}>
            {selectedType == 'privacy' ? 'choose privacy' : 'visibility'}
          </CustomText>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(12, 0.6),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            <CustomText isBold style={{...FONTS.Medium13}}>
              {selectedType == 'privacy' ? 'public' : 'visible'}
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                (selectedType == 'privacy' && setPrivacy('public')) ||
                  (selectedType == 'visibility' && setvisiblity('visible'));
              }}
              style={[
                styles.Circle,
                {
                  backgroundColor:
                    selectedType == 'privacy'
                      ? privacy == 'public'
                        ? Color.themeColor
                        : 'white'
                      : selectedType == 'visibility' && visibility == 'visible'
                      ? Color.themeColor
                      : 'white',
                },
              ]}></TouchableOpacity>
          </View>
          <CustomText
            style={{
              ...FONTS.Medium13,
              color: Color.lightGrey,
              paddingHorizontal: moderateScale(12, 0.6),
              width: windowWidth * 0.75,
            }}>
            {selectedType == 'privacy'
              ? "  Anyone can see who's in the group and what they post. you can change to private later.s"
              : 'Anyone can Find This Group'}
          </CustomText>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(12, 0.6),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            <CustomText isBold style={{...FONTS.Medium13}}>
              {selectedType == 'privacy' ? 'private' : 'hidden'}
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                (selectedType == 'privacy' && setPrivacy('private')) ||
                  (selectedType == 'visibility' && setvisiblity('hidden'));
              }}
              style={[
                styles.Circle,
                {
                  backgroundColor:
                    selectedType == 'privacy'
                      ? privacy == 'private'
                        ? Color.themeColor
                        : 'white'
                      : visibility == 'hidden'
                      ? Color.themeColor
                      : 'white',
                },
              ]}></TouchableOpacity>
          </View>
          <CustomText
            style={{
              ...FONTS.Medium13,
              color: Color.lightGrey,
              paddingHorizontal: moderateScale(12, 0.6),
              width: windowWidth * 0.75,
            }}>
            {selectedType == 'privacy'
              ? "Only members can see who's in the group and what they post. You can't change this group to public later"
              : 'Only Member can find this group'}
          </CustomText>
        </View>
      </View>
    </RBSheet>
  );
};

export default PrivacyModal;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },

  icon: {
    marginHorizontal: moderateScale(10, 0.3),
  },
  Text: {
    ...FONTS.Medium17,
    textAlign: 'center',
    paddingTop: moderateScale(10, 0.3),
    color: Color.lightGrey,
    letterSpacing: 0.9,
  },
  card: {
    marginTop: moderateScale(15, 0.6),
    width: windowWidth * 0.85,
    height: windowHeight * 0.12,
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.6),
    borderColor: Color.lightGrey,
  },
  Circle: {
    width: windowHeight * 0.02,
    height: windowHeight * 0.02,
    borderRadius: (windowHeight * 0.02) / 2,
    borderWidth: 1,
    borderColor: Color.mediumGray,
    position: 'absolute',
    right: 0,
    top: 10,
  },
});
