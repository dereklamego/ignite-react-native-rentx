import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dto/CarDTO';
import { Load } from '../../components/Load';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps{
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;

}

export function MyCars(){
  const [cars,setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(()=>{
    async function fetchCars(){
      try{
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    
    fetchCars();
  },[])

  return (
    <Container>
      
      <Header>
        <StatusBar
        style='inverted'
        translucent
        backgroundColor='transparent'
        />

        <BackButton
          color={theme.colors.shape}
          onPress={handleBack}
        />

        <Title>
          Seus agendamentos, estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
    
      </Header>

      {loading ? 
        <Load/> 
        :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car}/>

                <CarFooter>
                  <CarFooterTitle>{item.startDate}</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>18/06/2021</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal:10}}
                    />
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                  </CarFooterPeriod>

                </CarFooter>
              </CarWrapper>
              
            )}
          />
        </Content>
      }

      

    </Container>
  );
}