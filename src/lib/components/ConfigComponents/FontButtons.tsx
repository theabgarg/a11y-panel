import React, { useContext } from "react";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";
import BoldIcon from "../assets/BoldIcon";
import TextAlignLeftIcon from "../assets/TextAlignLeftIcon";
import TextAlignCenterIcon from "../assets/TextAlignCenterIcon";
import TextAlignRightIcon from "../assets/TextAlignRightIcon";
import ItalicIcon from "../assets/ItalicIcon";
import styled from "styled-components";

export default function FontButtons() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Font Style"}>
      <Row>
        <Button
          type="button"
          $active={globalState.textBold}
          onClick={() => dispatch({ type: "TOGGLE_BOLD" })}
          aria-label="Toggle bold text"
        >
          <BoldIcon />
        </Button>
        <Button
          type="button"
          $active={globalState.textItalic}
          onClick={() => dispatch({ type: "TOGGLE_ITALIC" })}
          aria-label="Toggle italic text"
        >
          <ItalicIcon />
        </Button>
        <Button
          type="button"
          $active={globalState.textAlignment === "left"}
          onClick={() => dispatch({ type: "SET_TEXT_ALIGNMENT", data: "left" })}
          aria-label="Align text left"
        >
          <TextAlignLeftIcon />
        </Button>
        <Button
          type="button"
          $active={globalState.textAlignment === "center"}
          onClick={() =>
            dispatch({ type: "SET_TEXT_ALIGNMENT", data: "center" })
          }
          aria-label="Align text center"
        >
          <TextAlignCenterIcon />
        </Button>
        <Button
          type="button"
          $active={globalState.textAlignment === "right"}
          onClick={() =>
            dispatch({ type: "SET_TEXT_ALIGNMENT", data: "right" })
          }
          aria-label="Align text right"
        >
          <TextAlignRightIcon />
        </Button>
      </Row>
    </SettingsBox>
  );
}

const Button = styled.button<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.primary : "#d7dee7")};
  background: ${({ $active }) => ($active ? "#eaf3ff" : "#ffffff")};
  color: ${({ $active, theme }) => ($active ? theme.primary : "#64748b")};
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
