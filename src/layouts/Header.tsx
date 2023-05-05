import { CSSProperties } from "react";

export default function Header() {
  return (
    <>
      <header style={headerStyles}>Default Layout</header>
    </>
  );
}

export const headerStyles: CSSProperties = {
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  width: "100%",
  backgroundColor: "black",
  height: "56px",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
};
