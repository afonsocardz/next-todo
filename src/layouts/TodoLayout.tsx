import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

interface TodoLayoutProps {
  children: ReactNode;
}

export default function TodoLayout({ children }: TodoLayoutProps) {
  return (
    <>
      <div style={containerStyle}>{children}</div>
      <footer style={footerStyle}>
        <span>Todo Layout</span>
        <Link href={"/"}>
          <button>Voltar</button>
        </Link>
      </footer>
    </>
  );
}

const footerStyle: CSSProperties = {
  position: "fixed",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "12px",
  bottom: 0,
  left: 0,
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  height: "60px",
};

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "gray",
  paddingBottom: footerStyle.height,
};
