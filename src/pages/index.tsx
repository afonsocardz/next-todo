import Link from "next/link";
import { CSSProperties } from "react";

export default function Home() {
  return (
    <div style={homeStyle}>
      <div>Home</div>
      <Link href={"/todos"}>
        <button>Enter Todo App</button>
      </Link>
    </div>
  );
}

const homeStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
