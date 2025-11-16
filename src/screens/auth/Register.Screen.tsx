import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { FormRules } from '../../constants/formRules';
import { Routes } from '../../router/routes';
import { NavigationParamList } from '../../types/nav.type';
import { TextLink } from '../../components/TextLink';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { InputControlled } from '../../components/InputControlled';
import { Button } from '../../components/Button';

interface IRegister {
  name: string;
  email: string;
  password: string;
}
export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {
      name: 'Gulnaz',
      email: 'gul.bax@mail.ru',
      password: 'instaClone2025$',
    },
  });
  const onSubmit = async (data: IRegister) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email.trim(),
        data.password,
      );

      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        name: data.name,
        email: data.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log('Registration successful!');
      navigation.navigate(Routes.login);
    } catch (error: any) {
      console.log('Firebase register error:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Registration Error', 'This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Registration Error', 'Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert(
          'Registration Error',
          'Password must be at least 6 characters.',
        );
      } else {
        Alert.alert(
          'Registration Error',
          'Something went wrong. Please try again.',
        );
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <InputControlled
            keyboardType="email-address"
            control={control}
            style={styles.input}
            errorMessage={errors.email?.message}
            rules={FormRules.email}
            name="email"
            type="text"
            captionStyle={styles.caption}
            placeholder="Email"
          />
          <InputControlled
            style={styles.input}
            control={control}
            placeholder="Password"
            name="password"
            errorMessage={errors.password?.message}
            type="password"
            captionStyle={styles.caption}
            rules={FormRules.password}
          />
          <View style={styles.actions}>
            <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
            <TextLink
              content="Already have an account? Login"
              center
              highlighted={[
                {
                  text: 'Login',
                  callback: () => navigation.navigate(Routes.login),
                },
              ]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 12,
  },
  register: {
    flex: 1,
    paddingHorizontal: 20,
  },
  caption: {
    position: 'absolute',
    bottom: -20,
  },
  actions: {
    gap: 24,
    marginTop: 24,
  },
});
