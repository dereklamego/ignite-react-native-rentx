import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

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

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;
  
  function handleConfirmRental(){
    navigation.navigate('Scheduling')
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
       <StatusBar
        style='inverted'
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
                  icon={speedSvg} 
              />
            ))

          }
        </Accessories>
          
        <About>
        Este é automóvel desportivo. Surgiu do lendário 
        touro de lide indultado na praça Real Maestranza de Sevilla. 
        É um belíssimo carro para quem gosta de acelerar.
        </About>

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