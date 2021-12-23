import React,{useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { Ionicons} from '@expo/vector-icons';
import { CarDTO } from '../../dto/CarDTO';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import {StyleSheet, BackHandler} from 'react-native';
import { useTheme } from 'styled-components';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';


import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'; //componente para identificar quando o usuario está segurando e arrastando o componente 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';


interface NavigationProps{
  navigate:(
    screen: string,
    carObject?:{
      car: CarDTO
    }
  ) => void
}

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(()=>{
    return{
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_,ctx: any){ // como any pq escolhemos oq vamos colocar nele
      ctx.positionX = positionX.value //contexto da ultima posição 
      ctx.positionY = positionY.value
    },
    onActive(event, ctx:any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })
  
  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails',{car})
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars')
  }

  useEffect(()=>{

    async function fetchCars() {

      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }

    }
    fetchCars();
  },[])

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',()=>{
      return true
    })
  },[])

  return (
    <Container>
       <StatusBar
        style='inverted'
        translucent
        backgroundColor='transparent'
      />
      
      <Header>

       <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent> 

      </Header>
      { loading? <LoadAnimation/> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <Car data={item} onPress={() => handleCarDetails(item)}/>
          }
        />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22,
          }
        ]}>
          <ButtonAnimated 
            onPress={handleOpenMyCars} 
            style={[styles.button,{backgroundColor: theme.colors.main}]}
          >

            <Ionicons 
              name= "ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 60,
    height: 60,
    borderRadius:30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})