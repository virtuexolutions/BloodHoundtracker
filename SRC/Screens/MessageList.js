import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import SearchContainer from '../Components/SearchContainer';
import { chatlist } from '../Config/dummyData';
import ChatCard from '../Components/ChatCard';

const MessageList = () => {

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingBottom: moderateScale(20, 0.6),
          alignItems:'center'
      }}>
      <CustomHeader
        text={'message'}
        leftIcon
      />
      <SearchContainer
      placeholder={'search'}
      width={windowWidth*0.86}/>
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop:windowHeight*0.02,
      }}
      numColumns={1}
      data={chatlist}
      renderItem={(item ,index) => {
        console.log("🚀 ~ MessageList ~ item:", item?.item)
        return(
            <ChatCard item={item?.item}/>
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
