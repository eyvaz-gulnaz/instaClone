import React, { useCallback } from 'react';
import { IInput, Input } from './Input';
import { Controller, ControllerProps } from 'react-hook-form';
import { Manipulators } from '../utils/manipulators';

interface IInputController extends IInput, Partial<ControllerProps> {
  control?: any;
  disabledControl?: boolean;
  manipulator?: 'cardNumber';
}

export const InputControlled: React.FC<IInputController> = ({
  name,
  control,
  defaultValue,
  rules,
  disabled,
  disabledControl,
  manipulator,
  ...inputProps
}) => {
  const handleValueChange = useCallback(
    (value: string, onChange: (value: string) => void) => {
      if (manipulator === 'cardNumber') {
        onChange(Manipulators.cardNumber(value));
      } else {
        onChange(value);
      }
    },
    [manipulator],
  );
  return (
    <Controller
      disabled={disabledControl}
      control={control}
      name={name as string}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          disabled={disabled}
          setValue={value => handleValueChange(value, field.onChange)}
          value={field.value}
          onBlur={field.onBlur}
          {...inputProps}
        />
      )}
    />
  );
};
