import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
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

      <Header>
        <BackButton onPress={handleBack}/>
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>

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

      </Content>

      <Footer>
        <Button
         title={'Escolher período do aluguel'}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}