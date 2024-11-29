import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {imageUrl} from '../Config';
// import {Modal} from 'native-base';
import {Modal} from 'react-native-modal';
import SaveDataModal from './SaveDataModal';

const Myposts = ({setSelected, selected, seSelectedAssets, selectedAssets}) => {
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [imageIndex, setimageIndex] = useState(0);
  const [imageView, setImageView] = useState(false);
  const [myPostData, setMyPostdata] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [data, setdata] = useState({});
  const [selectedimage, setSelectedImage] = useState('');
  console.log(
    '🚀 ~ Myposts ~ selectedimage ==========================:',
    selectedimage,
  );
  const [selectedItem, setSelectedItem] = useState({});
  const [galleryData, setGalleryData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
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

  const myPostApi = async () => {
    const url = 'auth/post';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setMyPostdata(response?.data?.post_list);
    }
  };

  const usergalleryApi = async () => {
    const url = `auth/gallery`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setGalleryData(response?.data);
    }
  };

  useEffect(() => {
    if (selected == 'profile') {
      myPostApi();
    } else {
      usergalleryApi();
    }
  }, [selected, isFocused]);

  const flattenedData =
    galleryData?.data?.saved_post?.flatMap(post =>
      post?.images?.map(image => ({
        ...image,
        fileType: image.type,
        fileUrl: image.file,
      })),
    ) || [];

  return (
    <View>
      {selected == 'photo' ? (
        isloading ? (
          <ActivityIndicator
            style={{
              paddingTop: windowHeight * 0.15,
            }}
            size={'small'}
            color={Color.blue}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            key={'photo'}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            numColumns={3}
            data={galleryData?.data?.image}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingTop: moderateScale(10, 0.6),
              paddingBottom: moderateScale(50, 0.6),
            }}
            style={{
              alignSelf: 'center',
              width: windowWidth * 0.9,
            }}
            ListEmptyComponent={
              <CustomText
                style={{
                  color: Color.lightGrey,
                  textAlign: 'center',
                  paddingTop: windowHeight * 0.15,
                }}>
                no photo added yet!
              </CustomText>
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => {}}
                  onLongPress={() => {}}>
                  <CustomImage
                    onPress={() => {
                      setIsVisible(true);
                      setimageIndex(index);
                    }}
                    style={{height: '100%', width: '100%'}}
                    source={{uri: `${imageUrl}${item?.file}`}}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )
      ) : selected == 'videos' ? (
        isloading ? (
          <ActivityIndicator
            style={{
              paddingTop: windowHeight * 0.15,
            }}
            size={'small'}
            color={Color.blue}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            key={'videos'}
            numColumns={3}
            data={
              selected == 'videos'
                ? galleryData?.data?.video
                : galleryData?.data?.saved_post
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: moderateScale(10, 0.6),
            }}
            ListEmptyComponent={
              <CustomText
                style={{
                  color: Color.lightGrey,
                  textAlign: 'center',
                  paddingTop: windowHeight * 0.15,
                }}>
                no video added yet!
              </CustomText>
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.activityImage}
                  onPress={() => {
                    console.log('hello this console  from video component ');
                    navigation.navigate('MediaPlayerScreen', {
                      item:
                        selected == 'videos'
                          ? galleryData?.data?.video
                          : galleryData?.data?.saved_post,
                      index: index,
                    });
                  }}>
                  <Video
                    repeat={true}
                    resizeMode={'stretch'}
                    mute={true}
                    source={{uri: `${imageUrl}${item?.file}`}}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onBuffer={e => {
                      console.log('=---------------> ', e);
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )
      ) : selected == 'posts' ? (
        isloading ? (
          <ActivityIndicator
            style={{
              paddingTop: windowHeight * 0.2,
            }}
            size={'small'}
            color={Color.blue}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            key={'posts'}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            style={{
              marginVertical: moderateScale(20, 0.6),
              marginBottom: moderateScale(10, 0.6),
            }}
            data={galleryData?.data?.post}
            ListEmptyComponent={<CustomText>no post yet</CustomText>}
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
        )
      ) : selected == 'saved' ? (
        isloading ? (
          <ActivityIndicator
            style={{
              paddingTop: windowHeight * 0.2,
            }}
            size={'small'}
            color={Color.blue}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            key={'saved_post'}
            numColumns={3}
            style={{
              marginVertical: moderateScale(20, 0.6),
              marginBottom: moderateScale(10, 0.6),
            }}
            data={flattenedData}
            ListEmptyComponent={<CustomText>no post yet</CustomText>}
            renderItem={({item, index}) => {
              const postData = galleryData?.data?.saved_post.find(post =>
                post?.images?.some(image => image?.file === item?.file),
              );
              return item.fileType === 'image' ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setImageModal(true);
                      setSelectedImage(item);
                      setSelectedItem(postData);
                    }}
                    style={styles.activityImage}>
                    <CustomImage
                      onPress={() => {
                        setImageModal(true);
                        setSelectedImage(item);
                        setSelectedItem(postData);
                      }}
                      style={styles.save_image}
                      source={{uri: `${imageUrl}${item?.file}`}}
                    />
                  </TouchableOpacity>
                  <SaveDataModal
                    setImageModal={setImageModal}
                    imageModal={imageModal}
                    data={selectedItem}
                    image={selectedimage}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.activityImage}
                    onPress={() => {
                      setImageModal(true);
                      setImageModal(true);
                      setSelectedImage(item);
                      setSelectedItem(postData);
                    }}>
                    <Video
                      repeat={true}
                      resizeMode={'stretch'}
                      mute={true}
                      source={{uri: `${imageUrl}${item?.file}`}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      onBuffer={e => {
                        console.log('=---------------> ', e);
                      }}
                    />
                  </TouchableOpacity>
                  <SaveDataModal
                    setImageModal={setImageModal}
                    imageModal={imageModal}
                    data={selectedItem}
                    image={selectedimage}
                  />
                </>
              );
            }}
          />
        )
      ) : isloading ? (
        <ActivityIndicator
          style={{
            height: windowHeight * 0.5,
          }}
          size={'small'}
          color={Color.blue}
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
        multiImages={galleryData?.data?.image}
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

  save_image: {
    height: '100%',
    width: '100%',
  },
});
