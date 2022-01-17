import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';
import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import {Button} from '../../../components/Button';
import { Confirmation } from '../../Confirmation';

import{
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
}from './styles';

interface Params{
  user:{
    name:string;
    email: string;
    driverLicense: string
  }
}

export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const {user} = route.params as Params;
  
  function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação')
    }

    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais')
    }

    navigation.navigate('Confirmation',{
      nextScreenRoute: 'SignIn',
      title:'Conta Criada!',
      message: `Agora é só fazer login\ne aproveitar`
    })

  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    > 
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active={true}/>
              <Bullet active={false}/>
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
          Faça seu cadastro de{'\n'}
          forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}