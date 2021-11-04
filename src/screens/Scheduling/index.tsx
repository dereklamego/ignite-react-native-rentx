import React from 'react';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

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
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function Scheduling(){

  const navigation = useNavigation();
  const theme = useTheme();


  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails')
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
        <BackButton
          color={theme.colors.shape}
          onPress={handleBack}
        />

        <Title>
          Escolha uma {'\n'}
          data de ínicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}> 
              20/10/2021
            </DateValue>
          </DateInfo>
          
          <ArrowSvg/>

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}> 
              20/10/2021
            </DateValue>
          </DateInfo>

        </RentalPeriod>

      </Header>

      <Content>
        <Calendar/>
      </Content>

      <Footer>
        <Button 
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>

    </Container>
  );
}