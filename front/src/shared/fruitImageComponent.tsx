import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const getFruitImage = (
  fruitName: string,
  backgroundColor: string,
  isDetailPage: boolean,
) => {
  switch (fruitName) {
    case 'Banana':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Banana.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Banana.png')}
            />
          </View>
        </View>
      );
    case 'Kiwi':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Kiwi.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Kiwi.png')}
            />
          </View>
        </View>
      );
    case 'Lemon':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Lemon.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Lemon.png')}
            />
          </View>
        </View>
      );
    case 'Mango':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Mango.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Mango.png')}
            />
          </View>
        </View>
      );
    case 'Orange':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Orange.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Orange.png')}
            />
          </View>
        </View>
      );
    case 'Pineapple':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Pineapple.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Pineapple.png')}
            />
          </View>
        </View>
      );
    case 'Raspberry':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Raspberry.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Raspberry.png')}
            />
          </View>
        </View>
      );
    case 'Strawberry':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Strawberry.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Strawberry.png')}
            />
          </View>
        </View>
      );
    case 'Watermelon':
      return (
        <View
          style={[
            styles(backgroundColor).imageContainer,
            isDetailPage ? detailStyles.imageContainer : {},
          ]}>
          <View
            style={[
              styles(backgroundColor).imageInnerContainer,
              isDetailPage ? detailStyles.imageInnerContainer : {},
            ]}>
            <Image
              style={[
                styles(backgroundColor).image,
                isDetailPage ? detailStyles.image : {},
              ]}
              source={require('../../assets/img/Watermelon.png')}
            />
            <Image
              style={[
                styles(backgroundColor).imageShadow,
                isDetailPage ? detailStyles.imageShadow : {},
              ]}
              source={require('../../assets/img/Watermelon.png')}
            />
          </View>
        </View>
      );
  }
};

const styles = (imageContainerColor: string) =>
  StyleSheet.create({
    image: {
      resizeMode: 'contain',
      width: 70,
      height: 70,
      shadowColor: '#000',
      shadowOffset: {width: 50, height: 10},
      shadowOpacity: 0.8,
      shadowRadius: 10,
      borderRadius: 15,
    },
    imageShadow: {
      resizeMode: 'contain',
      width: 70,
      height: 70,
      position: 'absolute',
      left: -3.5,
      top: -3.5,
      zIndex: -1,
      tintColor: 'black',
      opacity: 0.4,
    },
    imageContainer: {
      borderRadius: 50,
      backgroundColor: imageContainerColor,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageInnerContainer: {
      borderRadius: 50,
      backgroundColor: imageContainerColor,
      width: 60,
      height: 60,
      borderColor: 'white',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

const detailStyles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  imageShadow: {
    width: 150,
    height: 150,
    left: -7,
    top: -5,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  imageInnerContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});
