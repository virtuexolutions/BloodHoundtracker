import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import SearchContainer from '../Components/SearchContainer';
import { chatlist } from '../Config/dummyData';
import ChatCard from '../Components/ChatCard';

const MessageList = () => {
  const [serachData, setSearchData] = useState('')

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingBottom: moderateScale(20, 0.6),
        alignItems: 'center'
      }}>
      <CustomHeader
        text={'message'}
        leftIcon
      />
      <SearchContainer
        style={{
          height: windowHeight * 0.06
        }}
        data={serachData}
        setData={setSearchData}
        input={true}
        inputStyle={{
          // height:windowHeight*0.03

        }}
        //  height={windowHeight*0.02}
        // placeholder={'search'}
        width={windowWidth * 0.86} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: windowHeight * 0.02,
        }}
        numColumns={1}
        data={chatlist}
        renderItem={(item, index) => {
          return (
            <ChatCard item={item?.item} />
          )
        }}
      />
    </ScrollView>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F9F9F9',
  },
  //   chatcard
});
