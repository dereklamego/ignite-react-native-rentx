import React from 'react';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer

} from './styles'
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params{
  title: string;
  message: string;
  nextScreenRoute: string
}

interface NavigateProps{
  navigate:(
    nextScreenRoute: string
  ) => void
  
}

export function Confirmation(){

  const route = useRoute();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigateProps>();
  const {title, message, nextScreenRoute} = route.params as Params;

  function handleConfirm(){
    navigation.navigate(nextScreenRoute)
    console.log(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar
        style='inverted'
        translucent
        backgroundColor='transparent'
      />

      
      <LogoSvg  width={width}/>

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>{title}</Title>

        <Message>
         {message}
        </Message>
      </Content>

      <Footer>

        <ConfirmButton 
        title='Ok'
        onPress={handleConfirm}/>
      </Footer>
    </Container>
  );
}