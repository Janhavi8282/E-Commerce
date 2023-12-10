import { View, Text } from 'react-native'
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import styles from './carousel.style';
import { COLORS } from '../../constants';

const Carousel = () => {
    const slides = [
        require('../../assets/images/tv.png'),
        require('../../assets/images/carousel4.jpg'),
        require('../../assets/images/carousel6.png')

    ]
  return (
    <View style={styles.carousel}>
      <SliderBox images={slides}
      dotColor={COLORS.primary}
      inactiveDotColor={COLORS.secondary}
      ImageComponentStyle={{borderRadius: 15, width: "90%", marginTop: 15}}
      sliderBoxHeight={300}
      autoplay
      circleLoop

      />
    </View>
  )
}

export default Carousel