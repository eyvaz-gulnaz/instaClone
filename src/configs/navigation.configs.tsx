import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  contentStyle: {
    backgroundColor: 'white',
  },
};

export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: '#Fff',
    paddingHorizontal: 16,
  },
};
