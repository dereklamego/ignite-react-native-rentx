import React, { useEffect, useState } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { CarDTO } from '../../dto/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';
import { Alert } from 'react-native';

interface Params{
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod{
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const {car, dates} = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price)


  async function handleConfirmRental(){
    setLoading(true)
    const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates =[
      ...scheduleByCar.data.unavailable_dates,
      ...dates
    ]

    await api.post('schedules_byuser',{
      user_id:1,
      car,
      startDate: format(getPlatformDate( parseISO(dates[0])),'dd/MM/yyyy'),
      endDate: format(getPlatformDate( parseISO(dates[dates.length -1])),'dd/MM/yyyy')
    })

    api.put(`/schedules_bycars/${car.id}`,{
      id: car.id,
      unavailable_dates
    })
    .then(()=> {
      navigation.navigate('Confirmation',{
        nextScreenRoute: 'Home',
        title:'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`
      })
    })
    .catch(() => {
      setLoading(false)
      Alert.alert("Não foi possível confimar o agendamento")
      
    })
    
  }

  function handleBack(){
    navigation.goBack();
   
  }

  useEffect(()=>{
    setRentalPeriod({
      start: format(getPlatformDate( parseISO(dates[0])),'dd/MM/yyyy'),
      end: format(getPlatformDate( parseISO(dates[dates.length -1])),'dd/MM/yyyy')
    })
  },[])

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
            <Price>R$ {car.rent.price} </Price>
          </Rent>
        </Details>

        <Accessories>
          { 
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
            
          }
      
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.background_primary}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />
         
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button 
          title={'Alugar agora'} 
          onPress={handleConfirmRental}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});