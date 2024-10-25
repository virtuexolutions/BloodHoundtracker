import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {homeListData} from '../Config/dummyData';
import {moderateScale} from 'react-native-size-matters';
import Card from './Card';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Video from 'react-native-video';
import ProfileComponent from './ProfileComponent';

const Myposts = ({setSelected, selected}) => {
  console.log('🚀 ~ Myposts ~ selected:', selected);
  const [isVisible, setIsVisible] = useState(false);
  const imageArray = [
    require('../Assets/Images/dummyman5.png'),
    require('../Assets/Images/scoter_image.png'),
    require('../Assets/Images/dummyman5.png'),
    require('../Assets/Images/scoter_image.png'),
    require('../Assets/Images/dummyman5.png'),
    require('../Assets/Images/dummyman5.png'),
    require('../Assets/Images/dummyman5.png'),
    require('../Assets/Images/scoter_image.png'),
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
  return (
    <View>
      {selected == 'photo' ? (
        <FlatList
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          numColumns={3}
          data={imageArray}
          keyExtractor={item => item}
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
                onPress={() => {
                  console.log('hetttttttttttttttttttttttttttttttttttttttttt');
                  //   setIsVisible(true);
                }}
                onLongPress={() => {}}>
                <CustomImage style={styles.image} source={item} />
              </TouchableOpacity>
            );
          }}
        />
      ) : selected == 'videos' || selected == 'saved' ? (
        <FlatList
          numColumns={3}
          data={videodata}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: moderateScale(10, 0.6),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.activityImage} onPress={() => {}}>
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
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : selected == 'posts' ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginVertical: moderateScale(20, 0.6),
            marginBottom: moderateScale(10, 0.6),
          }}
          data={homeListData}
          renderItem={({item, index}) => {
            return (
              <Card
                setSelected={setSelected}
                selected={selected}
                fromProfile={true}
                item={item}
              />
            );
          }}
        />
      ) : (
        <ProfileComponent
          selected={selected}
          setSelected={setSelected}
          stolenAssetsArray={stolenAssetsArray}
        />
      )}
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
