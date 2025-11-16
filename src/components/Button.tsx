import {
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
  StyleSheet,
  Image,
  ImageProps,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';

type TType = 'outlined' | 'normal' | 'disabled';
export interface IButton {
  type?: TType;
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  icon?: ImageProps;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<IButton> = ({
  title,
  onPress,
  style,
  loading,
  type = 'normal',
  icon,
  textStyle,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const renderLoading = () => {
    return loading ? (
      <ActivityIndicator
        size={'small'}
        color={'orange'}
        style={StyleSheet.absoluteFillObject}
      />
    ) : null;
  };

  return (
    <Pressable
      style={[
        styles.root,
        type === 'outlined' && styles.outline,
        type === 'disabled' && styles.disabled,
        isPressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {icon ? <Image style={styles.image} source={icon} /> : null}

      <Text
        style={[
          styles.title,
          type === 'outlined' && styles.outlineText,
          textStyle,
        ]}
      >
        {title}
      </Text>
      {renderLoading()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#3797ef',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  outline: {
    backgroundColor: 'white',
  },
  disabled: {
    backgroundColor: 'rgba(128, 189, 52, 0.4)',
  },
  outlineText: {
    color: 'green',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  pressed: {
    backgroundColor: '#137c13',
  },
  image: {
    width: 24,
    height: 24,
  },
});
