import React,{useState} from 'react';
import { useTheme } from 'styled-components';
import {Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { BorderlessButton} from 'react-native-gesture-handler';

import{
  Container,
  InputText,
  IconContainer,
  
}from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?:string
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: Props){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled]= useState(false);
  const [isPasswordVisible,setIsPasswordVisible] = useState(true)
  const theme = useTheme();

  function handlePasswordVisibilityChange(){
    setIsPasswordVisible(prevState => !prevState);
  }

  function handleInputFocus(){
    setIsFocused(true)
  }

  function handleInputBlur(){
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled)? theme.colors.main:theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather 
            name={isPasswordVisible?'eye':'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
         </IconContainer>
      </BorderlessButton>
    </Container>
  );
}