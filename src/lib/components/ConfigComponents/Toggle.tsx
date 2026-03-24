import React from 'react';
import Switch, { ReactSwitchProps } from 'react-switch';

interface ToggleProps extends ReactSwitchProps {}

export default function Toggle({ onChange, checked, ...rest }: ToggleProps) {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      height={25}
      width={45}
      {...rest}
    />
  );
}
