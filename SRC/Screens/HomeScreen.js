import React from 'react';
import { View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../Components/CustomText';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);


  return (
    <View>
      <CustomText>hello</CustomText>
    </View>
    
  );
};

const styles = ScaledSheet.create({
})

export default HomeScreen;
