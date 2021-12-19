import React from 'react';
import { Button, StyleSheet, Dimensions} from 'react-native';

import Animated,{
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  Easing 
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width


import{
  Container
}from './styles';

export function Splash(){

  const animation = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(()=>{
    return{
      transform: [
        {
          translateX : withTiming( animation.value,{
            duration: 500,
            easing: Easing.bezier(.89,-0.05,0,.99)
          })
        }
      ]
    }
  })

  function handleAnimatedPosition(){
    animation.value = Math.random()*(WIDTH-100);
    
  }

  return (
    <Container>
      <Animated.View style={[styles.box,animatedStyles]}/> 

      <Button title='Mover' onPress={handleAnimatedPosition}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  box:{
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})