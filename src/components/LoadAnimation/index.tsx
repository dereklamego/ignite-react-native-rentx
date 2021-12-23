import React from 'react';
import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json'

import{
  Container
}from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function LoadAnimation(){
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{height: RFValue(200)}}
        resizeMode='contain'
        autoPlay
        loop
      />
    </Container>
  );
}