import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../Components/CustomHeader'
import { windowHeight, windowWidth } from '../Utillity/utils'
import NotificationCard from '../Components/NotificationCard'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { notificationArray } from '../Config/dummyData'

const NotificationsScreen = () => {
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
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingTop:windowHeight*0.02,
    }}
    numColumns={1}
    data={notificationArray}
    renderItem={(item ,index) => {
      console.log("🚀 ~ MessageList ~ item:", item?.item)
      return(
          <NotificationCard item={item?.item}/>
      )
    }}
    />
  </ScrollView>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(20, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:windowHeight*0.03
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
})
