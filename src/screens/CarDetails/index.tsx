import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent, 
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { StatusBar } from 'expo-status-bar';
import { CarDTO } from '../../dto/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';


interface Params{
  car: CarDTO
}

interface NavigationProps{
  goBack?: () => void,
  navigate:(
    screen?: string,
    carObject?:{
      car: CarDTO
    }
  ) => void
}

export function CarDetails(){
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const {car} = route.params as Params;
  
  const scrollY = useSharedValue(0);

  const theme = useTheme();

  const scrollHandler = useAnimatedScrollHandler(event=>{
    scrollY.value = event.contentOffset.y
    //console.log(event.contentOffset.y)
  })

  const headerStyleAnimation = useAnimatedStyle(()=>{
    return{
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,70],
        Extrapolate.CLAMP

      )
    }
  })

  const slideCarsStyleAnimation = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(
        scrollY.value,
        [0,150],
        [1,0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental(){
    navigation.navigate('Scheduling',{car})
  }

  function handleBack(){
    navigation.goBack();
  }
  
  return (
    <Container>
       <StatusBar
        style='dark'
        translucent
        backgroundColor='transparent'
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {backgroundColor:theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>

        <Animated.View style={slideCarsStyleAnimation}>
          <CarImages>
            <ImageSlider
              imagesUrl={car.photos}
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
            alignItems: 'center'
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
      >

        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory =>(
               <Accessory 
                  key={accessory.type} 
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)} 
              />
            ))

          }
        </Accessories>
          
        <About>{car.about} </About>
        <About>{car.about} </About>
        <About>{car.about} </About>

      </Animated.ScrollView>

      <Footer>
        <Button
         title={'Escolher período do aluguel'}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header:{
    position:'absolute',
    overflow: 'hidden',
    zIndex:1,
  }
})