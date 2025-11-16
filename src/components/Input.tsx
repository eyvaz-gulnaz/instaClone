import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  Pressable,
  FlatList,
  TextStyle,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SvgImage } from './SvgImages';
export type TIcon = {
  source: NodeRequire;
  color?: string;
  width?: number;
  height?: number;
  position?: 'left' | 'right';
};

export interface IInput {
  type?: 'text' | 'phone' | 'password' | 'select';
  label?: string;
  caption?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: TIcon | NodeRequire;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  setValue?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onInputPress?: () => void;
  onIconPress?: () => void;
  multiLine?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  captionStyle?: StyleProp<TextStyle>;
}
export const Input: React.FC<IInput> = ({
  value,
  type = 'text',
  setValue,
  icon,
  inputStyle,
  multiLine,
  onIconPress,
  labelStyle,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    type === 'password',
  );
  const [open, setOpen] = useState<boolean>(false);

  const isMoreIcon = useMemo(
    () =>
      ('position' in (icon ?? {}) && (icon as TIcon)?.position === 'right') ||
      type === 'password' ||
      type === 'select',
    [icon, type],
  );

  const isPressable = props.onInputPress instanceof Function;

  const renderIcon = useMemo(() => {
    if (type === 'password') {
      return (
        <Pressable
          onPress={() => setSecureTextEntry(state => !state)}
          hitSlop={30}
        >
          <SvgImage
            color={'black'}
            source={
              secureTextEntry
                ? require('../assets/vector/eye-off.svg')
                : require('../assets/vector/eye.svg')
            }
            width={24}
            height={24}
          />
        </Pressable>
      );
    }
    if (type === 'select') {
      return (
        <Pressable onPress={() => setOpen(state => !state)} hitSlop={12}>
          <SvgImage
            source={
              open
                ? require('../assets/vector/chevron-up.svg')
                : require('../assets/vector/chevron-down.svg')
            }
            width={24}
            height={24}
          />
        </Pressable>
      );
    }
    if (!icon) {
      return null;
    }
    if ('source' in icon) {
      return (
        <SvgImage
          source={icon.source}
          width={icon.width}
          color={icon.color}
          height={icon.height}
        />
      );
    }
    return (
      <Pressable onPress={onIconPress}>
        <SvgImage source={icon} />
      </Pressable>
    );
  }, [icon, props.disabled, secureTextEntry, open, type]);

  const handleOnFocused = () => {
    setFocused(true);
    props?.onFocus?.();
  };
  const handleOnBlur = () => {
    setFocused(false);
    props?.onBlur?.();
  };

  return (
    <View style={[styles.root, props?.style]}>
      {props.label ? (
        <Text style={[styles.label, labelStyle]}>{props.label}</Text>
      ) : null}
      <View
        style={[
          styles.wrapper,
          focused && styles.focused,
          props?.errorMessage && styles.error,
          props.disabled && styles.wrapperDisabled,
          isMoreIcon && { flexDirection: 'row-reverse' },
          inputStyle,
        ]}
      >
        {renderIcon}
        <TextInput
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          value={value}
          onFocus={handleOnFocused}
          onBlur={handleOnBlur}
          onPressIn={props.onInputPress}
          autoCapitalize="none"
          maxLength={props.maxLength}
          // editable={!isPressable ?? !props.disabled}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          multiline={multiLine}
          placeholderTextColor={props.disabled ? 'red' : '#d0cfd1'}
          style={styles.input}
        />
      </View>

      {props.caption || props.errorMessage ? (
        <Text
          style={[
            styles.caption,
            props?.errorMessage ? styles.error : undefined,
            props.captionStyle,
          ]}
        >
          {props.errorMessage ?? props.caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  focused: {
    borderWidth: 2,
    borderColor: '#6e6e6e',
  },
  wrapperDisabled: {},
  error: {
    color: '#FF1F00',
    borderColor: '#FF1F00',
  },
  label: {
    fontSize: 16,
    paddingBottom: 8,
  },
  caption: {},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderColor: 'white',
    backgroundColor: '#fafafa',
    gap: 12,
    height: 48,
  },
  input: {
    height: '100%',
    flex: 1,
    flexGrow: 1,
    borderColor: 'red',
    color: '#6e6e6e',
  },
  flatlist: {
    maxHeight: 200,
    gap: 6,
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,
    backgroundColor: 'white',
  },
  option: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
