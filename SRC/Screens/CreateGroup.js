import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import Color from '../Assets/Utilities/Color';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('');

  const privacyArray = ['ffaadf', 'fafaf ', 'fdadsfadsf'];

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}
        style={styles.mainContainer}>
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
          <DropDownSingleSelect
            array={privacyArray}
            item={privacy}
            setItem={setPrivacy}
            placeholder={'privacy'}
            width={windowWidth * 0.85}
            dropDownHeight={windowHeight * 0.05}
            marginTop={moderateScale(10, 0.6)}
         
            dropdownStyle={
              {
                borderWidth:1,
                borderColor:Color.mediumGray,
                borderRadius: moderateScale(1, 0.6),
              }
            }
          />
        </View>
        <View style={styles.card}></View>
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
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
  },
  card: {},
});
