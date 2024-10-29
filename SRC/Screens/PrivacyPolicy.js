
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomText from '../Components/CustomText'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color'


const PrivacyPolicy = () => {
  // const navigation = useNavigation();
  const privacyPolicy = [
    {
      id: 1,
      heading: "Lorem Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nisi nec ante pellentesque vehicula. Nunc ultricies augue at varius varius. Curabitur pharetra turpis vel mi blandit dictum."
    },
    {
      id: 2,
      heading: "Nulla Facilisi",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies enim vitae purus vestibulum, vel fermentum lacus sollicitudin. Sed at dictum eros. Integer consectetur tortor vel urna cursus, at sollicitudin libero feugiat."
    },
    {
      id: 3,
      heading: "Vivamus Consectetur",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget justo id est pulvinar sodales ac in orci. Phasellus dictum leo vel arcu pulvinar, sed tristique metus malesuada. Vivamus laoreet consequat risus."
    },
    {
      id: 4,
      heading: "Curabitur Auctor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare magna id neque posuere, in malesuada mi suscipit. Maecenas id lacus ut sapien consequat vestibulum id ac libero. Nam ut arcu orci."
    },
    {
      id: 5,
      heading: "Aliquam Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula odio ut arcu bibendum, sed ullamcorper libero lacinia. Nullam facilisis, nisi sit amet iaculis tincidunt, leo risus aliquam ligula, nec pharetra nulla nisi sit amet magna."
    },
    {
      id: 6,
      heading: "Suspendisse Faucibus",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, eros id sodales dignissim, ligula dui ultrices ligula, sit amet dapibus velit eros sed odio. Donec aliquet turpis id sapien ultricies euismod."
    },
    {
      id: 7,
      heading: "Integer Venenatis",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque lectus at enim blandit, ac cursus velit volutpat. Donec a felis eget urna congue vestibulum a sit amet lacus. Phasellus a tellus nec turpis interdum luctus."
    }
];

  

  return (
    <View
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
          }}
          >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.back}>
            <Icon
              name="arrowleft"
              as={AntDesign}
              style={styles.icon2}
              color={Color.black}
              size={moderateScale(20, 0.3)}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}
          style={{
            marginTop : windowHeight * 0.1,
          }}
          contentContainerStyle={{
            // padding : moderateScale(10,0.6),


          }}
          >
            <CustomText isBold style={{
                color : Color.black,
                width : windowWidth , 
                textAlign : 'center',
                fontSize : moderateScale(20,0.6),
            }}>Privacy Policy</CustomText>
             {privacyPolicy.map((item,index) =>{
              return(
                <View>
                     <CustomText
  isBold
  style={{
    marginTop: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.black,
    // width : windowWidth ,
    textAlign: 'justify',
    fontSize: moderateScale(14, 0.6),
  }}>

{item?.id}. {item?.heading}

</CustomText>
<CustomText
  style={{
    marginTop: moderateScale(5, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.black,
    // width : windowWidth ,
    textAlign: 'justify',
    fontSize: moderateScale(12, 0.6),
  }}>
{item.description}
</CustomText>
                </View>
              );
             })}
</ScrollView>
        </View>
  )
}

export default PrivacyPolicy

const styles = ScaledSheet.create({
    back: {
                    width: moderateScale(35, 0.6),
                    height: moderateScale(35, 0.6),
                    borderRadius: moderateScale(5, 0.6),
                    borderWidth: 0.5,
                    borderColor: '#FFFFFF',
                    position: 'absolute',
                    left: moderateScale(10, 0.6),
                    top: moderateScale(10, 0.6),
                    zIndex: 1,
                    margin: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
})

