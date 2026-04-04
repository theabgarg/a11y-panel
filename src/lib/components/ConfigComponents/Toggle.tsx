import React from "react";
import Switch, { ReactSwitchProps } from "react-switch";
import { useTheme } from "styled-components";

interface ToggleProps extends ReactSwitchProps {}

export default function Toggle({ onChange, checked, ...rest }: ToggleProps) {
  const theme = useTheme();

  return (
    <Switch
      onChange={onChange}
      checked={checked}
      height={22}
      width={42}
      handleDiameter={18}
      checkedIcon={false}
      uncheckedIcon={false}
      onColor={theme.primary}
      offColor="#cbd5e1"
      onHandleColor="#ffffff"
      offHandleColor="#ffffff"
      activeBoxShadow="0 0 0 3px rgba(14, 94, 177, 0.18)"
      {...rest}
    />
  );
}
