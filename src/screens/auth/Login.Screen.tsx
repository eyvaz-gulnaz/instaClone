import {
  View,
  Text,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { FormRules } from '../../constants/formRules';
import { Routes } from '../../router/routes';
import { NavigationParamList } from '../../types/nav.type';
import { TextLink } from '../../components/TextLink';
import axios from 'axios';
import { Endpoints } from '../../services/Endpoints';

import { InputControlled } from '../../components/InputControlled';
import { Button } from '../../components/Button';

interface IRegister {
  name?: string;
  surname?: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.login>
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<IRegister>({
    defaultValues: {
      name: 'Gulnaz',
      surname: 'Bakhshiyeva',
      email: 'gul.bax@mail.ru',
      password: 'instaClone2025$',
      confirmPassword: 'instaClone2025$',
    },
  });
  const onSubmit = async (data: IRegister) => {
    try {
      const res = await axios({
        url: Endpoints.auth.register,
        method: 'POST',
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
          comfirmPassword: data.confirmPassword,
        },
      });
      console.log({ Rres: res.data });

      if (res.status === 201) {
        console.log('Login successfull');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error details - An error occurred');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.register]}
      >
        <Image
          height={50}
          width={180}
          style={{
            alignSelf: 'center',
            marginTop: 124,
          }}
          source={require('../../assets/image/InstagramLogo.png')}
        />
        <View style={[{ flexDirection: 'row' }, styles.fullName]}>
          <InputControlled
            control={control}
            style={styles.input}
            errorMessage={errors.name?.message}
            rules={FormRules.name}
            placeholder="Name"
            name="name"
            type="text"
            captionStyle={styles.caption}
          />
        </View>
        <InputControlled
          keyboardType="email-address"
          control={control}
          style={styles.controller}
          errorMessage={errors.email?.message}
          rules={FormRules.email}
          name="email"
          type="text"
          captionStyle={styles.caption}
          placeholder="Email"
        />
        <InputControlled
          style={styles.controller}
          control={control}
          placeholder="Password"
          name="password"
          errorMessage={errors.password?.message}
          type="password"
          captionStyle={styles.caption}
          rules={FormRules.password}
        />
        <View style={styles.container}>
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
          <Button
            icon={require('../../assets/image/fb.png')}
            type="outlined"
            title="Log in with Facebook"
            textStyle={styles.socialButton}
            onPress={handleSubmit(() =>
              Linking.openURL('https://www.facebook.com/'),
            )}
          />
          <TextLink
            content="Don't have account? Signup"
            center
            highlighted={[
              {
                text: 'Signup',
                callback: () => navigation.navigate(Routes.register),
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullName: {
    gap: 12,
    marginTop: 40,
    marginBottom: 8,
  },
  input: {
    flex: 1,
  },
  controller: {
    marginVertical: 12,
  },
  register: {
    flex: 1,
  },
  socialButton: {
    color: '#3797ef',
  },
  circle: {
    top: -240,
    left: -240,
  },
  caption: {
    position: 'absolute',
    bottom: -20,
  },
  container: {
    gap: 24,
    bottom: -20,
  },
});
