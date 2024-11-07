import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {homeListData} from '../Config/dummyData';
import {moderateScale} from 'react-native-size-matters';
import Card from './Card';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Video from 'react-native-video';
import ProfileComponent from './ProfileComponent';
import ImageViewingModal from './ImageViewingModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const Myposts = ({setSelected, selected, seSelectedAssets, selectedAssets}) => {
  console.log('🚀 ~ Myposts ~ selected:', selected);
  const token = useSelector(state => state.authReducer.token)
  const isFocused =useIsFocused()
  const navigation = useNavigation();
  const [imageIndex, setimageIndex] = useState(0);
  const [myPostData ,setMyPostdata ] =useState([])
  const [isVisible, setIsVisible] = useState(false);
  const imageArray = [
    {id: 1, uri: require('../Assets/Images/dummyman5.png')},
    {id: 2, uri: require('../Assets/Images/scoter_image.png')},
    {id: 3, uri: require('../Assets/Images/dummyman5.png')},
    {id: 4, uri: require('../Assets/Images/scoter_image.png')},
    {id: 5, uri: require('../Assets/Images/dummyman5.png')},
    {id: 6, uri: require('../Assets/Images/dummyman5.png')},
  {id: 7, uri: require('../Assets/Images/dummyman5.png')},
    {id: 8, uri: require('../Assets/Images/scoter_image.png')},
  ];

  const videodata = [
    require('../Assets/Images/video1.mp4'),
    require('../Assets/Images/video2.mp4'),

    require('../Assets/Images/video1.mp4'),
    require('../Assets/Images/video2.mp4'),
    require('../Assets/Images/video1.mp4'),
    require('../Assets/Images/video2.mp4'),
    require('../Assets/Images/video1.mp4'),
    require('../Assets/Images/video2.mp4'),
  ];
  const stolenAssetsArray = [
    {
      id: 1,
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/Bike.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 2,
      assetsName: '4 Wheels Rapters Broklyn',
      assetsimage: require('../Assets/Images/bike2.png'),
      members: '2K members',
      post: '4K Posts',
    },
    {
      id: 3,
      assetsName: 'Washington Trails    ',
      assetsimage: require('../Assets/Images/car.png'),
      members: '38K members',
      post: '100K Posts',
    },
    {
      id: 4,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
  ];



  const myPostApi = async ( ) =>{
    const url='auth/post'
    const response = await Get(url ,token)
    if(response != undefined ){
      setMyPostdata(response?.data?.post_list)

    }

  }

useEffect(() => {
  myPostApi()
}, [isFocused])










  return (
    <View>
      {selected == 'photo' ? (
        <FlatList
          key={'photo'}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          numColumns={3}
          data={imageArray}
          keyExtractor={(item ,index) => index.toString()}
          contentContainerStyle={{
            paddingTop: moderateScale(10, 0.6),
            paddingBottom: moderateScale(50, 0.6),
          }}
          style={{
            alignSelf: 'center',
            width: windowWidth * 0.9,
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {}}
                onLongPress={() => {}}>
                <CustomImage
                  onPress={() => {
                    console.log('hetttttttttttttttttttttttttttttttttttttttttt');
                    setIsVisible(true);
                    setimageIndex(index);
                  }}
                  style={{height: '100%', width: '100%'}}
                  source={item?.uri}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : selected == 'videos' || selected == 'saved' ? (
        <FlatList
          key={'videos'}
          numColumns={3}
          data={videodata}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: moderateScale(10, 0.6),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.activityImage}
                onPress={() => {
                  console.log('hello this console  from video component ');
                  navigation.navigate('MediaPlayerScreen');
                }}>
                <Video
                  repeat={true}
                  resizeMode={'stretch'}
                  mute={true}
                  // poster={"cover"}
                  // controls={true}
                  // source={require('../Assets/Images/video2.mp4')}
                  source={{uri: item}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  onBuffer={(e) =>{
                    console.log('=---------------> ',e)
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : selected == 'posts' ? (
        <FlatList
          key={'posts'}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          style={{
            marginVertical: moderateScale(20, 0.6),
            marginBottom: moderateScale(10, 0.6),
          }}
          data={homeListData}
          renderItem={({item, index}) => {
            return (
              <Card
                setSelected={seSelectedAssets}
                selected={selectedAssets}
                fromProfile={true}
                item={item}
              />
            );
          }}
        />
      ) : (
        <ProfileComponent
        myPostData={myPostData}
          selected={selected}
          setSelected={setSelected}
          fromProfile={true}

          stolenAssetsArray={stolenAssetsArray}
        />
      )}
      <ImageViewingModal
        setIsVisible={setIsVisible}
        visible={isVisible}
        selectedImageIndex={imageIndex}
        multiImages={imageArray}
        fromgallery={true}
      />
    </View>
  );
};

export default Myposts;

const styles = StyleSheet.create({
  imageContainer: {
    width: windowWidth * 0.29,
    height: windowHeight * 0.12,
    margin: moderateScale(2, 0.6),
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 1,
  },
  activityImage: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.29,
    backgroundColor: Color.white,
    overflow: 'hidden',
    marginVertical: moderateScale(2, 0.3),
    marginHorizontal: moderateScale(2, 0.3),
  },
});
