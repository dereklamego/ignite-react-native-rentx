import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { format, parseISO } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dto/CarDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Content
} from './styles';


interface RentalPeriod{
  startFormatted: string;
  endFormatted: string;
}

interface NavigationProps{
  goBack?: () => void,
  navigate:(
    screen: string,
    carObject:{
      car: CarDTO,
      dates: string[]
    }
  ) => void
}

interface Params{
  car: CarDTO
}

export function Scheduling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] =useState<RentalPeriod>({} as RentalPeriod);

  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental(){
   
      navigation.navigate('SchedulingDetails',{
        car,
        dates:Object.keys(markedDates)
      })
    
  }

  function handleBack(){
    navigation.goBack();
  }

  function handleChangeDate(date:DayProps){
    let start = !lastSelectedDate.timestamp ? date: lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end); 
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate( parseISO(firstDate)),'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate( parseISO(lastDate)),'dd/MM/yyyy')
    })

  }

  return (
    <Container>
       <StatusBar
        style='inverted'
        translucent
        backgroundColor='transparent'
      />

      <Header>
        <BackButton
          color={theme.colors.shape}
          onPress={handleBack}
        />

        <Title>
          Escolha uma {'\n'}
          data de ??nicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}> 
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          
          <ArrowSvg/>

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}> 
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>

        </RentalPeriod>

      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>

    </Container>
  );
}