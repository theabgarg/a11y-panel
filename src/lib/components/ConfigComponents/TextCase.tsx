import React, { useContext } from "react";
import { store } from "../Context/Store";
import styled from "styled-components";
import SettingsBox from "./SettingsBox";

type TextCaseValue = "uppercase" | "lowercase" | "capitalize" | "initial";

const options: Array<{ label: string; value: TextCaseValue }> = [
  { label: "Default", value: "initial" },
  { label: "UPPERCASE", value: "uppercase" },
  { label: "lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" },
];

export default function TextCase() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Text Case"}>
      <ChipGroup>
        {options.map((option) => (
          <Chip
            key={option.value}
            type="button"
            $active={globalState.textCase === option.value}
            onClick={() =>
              dispatch({ type: "SET_TEXT_CASE", data: option.value })
            }
          >
            {option.label}
          </Chip>
        ))}
      </ChipGroup>
    </SettingsBox>
  );
}

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ $active: boolean }>`
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.primary : "#d7dee7")};
  border-radius: 999px;
  padding: 6px 10px;
  background: ${({ $active, theme }) => ($active ? theme.primary : "#ffffff")};
  color: ${({ $active, theme }) =>
    $active ? theme.iconColor || "#ffffff" : theme.text};
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
`;
