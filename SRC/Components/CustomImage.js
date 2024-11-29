import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Color from '../Assets/Utilities/Color';

const CustomImage = props => {
  const {
    resizeMode,
    source,
    errorImageSource = require(`../Assets/Images/man1.jpg`),
    style,
    onPress,
    tintColor,
    onLoadEnd,
    onLoadStart,
  } = props;
  const [errorLoadingProfileImage, setErrorLoadingProfileImage] =
    useState(false);
  return (
    <TouchableOpacity onPress={onPress && onPress} activeOpacity={0.9}>
      <Image
        tintColor={tintColor}
        resizeMode={resizeMode}
        style={style}
        source={errorLoadingProfileImage ? errorImageSource : source}
        onLoadStart={onLoadStart && onLoadStart}
        onLoadEnd={onLoadEnd && onLoadEnd}
        onError={p => {
          // console.log('errorrrrrrrrr',p);
          setErrorLoadingProfileImage(true);
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomImage;

// require(`../Assets/Images/defualtProfile.png`)
