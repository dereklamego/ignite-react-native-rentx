import React,{useEffect} from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  StyleSheet
} from 'react-native'

import Animated,{
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

//const WIDTH = Dimensions.get('window').width

import{
  Container
}from './styles';
import { useNavigation } from '@react-navigation/core';

export function Splash(){
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(splashAnimation.value,[0,50],[1,0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0,50],
            [0,-50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(splashAnimation.value, [0,25,50],[0,.3,1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0,50],
            [-50,0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  function startApp(){
    navigation.navigate('SignIn')
  }

  useEffect(()=>{
    // Primeiro parametro é o 100% da animação, esse valor pode ser diferente com sua escolha
    // Segundo parametro é o tempo que leva até chegar no valor do primeiro parametro
    splashAnimation.value = withTiming(
      50,
      {duration:1000},
      ()=>{
        'worklet'
        runOnJS(startApp)();
      }
    ) 
    
  },[]);

  return(
    <Container>
      <Animated.View style={[brandStyle, styles.iconsContainer]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle, styles.iconsContainer]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  )
}

const styles = StyleSheet.create({
  iconsContainer:{
    position: 'absolute'
  }
})

// Move view with click 

// export function Splash(){

//   const animation = useSharedValue(0);
  
//   const animatedStyles = useAnimatedStyle(()=>{
//     return{
//       transform: [
//         {
//           translateX : withTiming( animation.value,{
//             duration: 500,
//             easing: Easing.bezier(.89,-0.05,0,.99)
//           })
//         }
//       ]
//     }
//   })

//   function handleAnimatedPosition(){
//     animation.value = Math.random()*(WIDTH-100);
    
//   }

//   return (
//     <Container>
//       <Animated.View style={[styles.box,animatedStyles]}/> 

//       <Button title='Mover' onPress={handleAnimatedPosition}/>
//     </Container>
//   );
// }

// const styles = StyleSheet.create({
//   box:{
//     width: 100,
//     height: 100,
//     backgroundColor: 'red'
//   }
// })