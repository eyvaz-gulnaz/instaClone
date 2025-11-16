import { RegisterOptions } from 'react-hook-form';
import { Regex } from './regex';

export class FormRules {
  public static name = {
    required: {
      message: 'Name is required',
      value: true,
    },
    pattern: {
      value: Regex.name,
      message: 'Name is not valid',
    },
  } as RegisterOptions;

  public static email = {
    required: {
      message: 'Email is required',
      value: true,
    },
    pattern: {
      value: Regex.email,
      message: 'Email is not valid',
    },
  } as RegisterOptions;

  public static password = {
    required: {
      message: 'Password is required',
      value: true,
    },
    pattern: {
      value: Regex.password,
      message: 'Password is not valid',
    },
  } as RegisterOptions;
}
