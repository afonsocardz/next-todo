import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import useSwr from "swr";
import { TodoReturnData } from "@/interfaces/todoInterfaces";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (url: string) =>
  fetch(url).then<TodoReturnData[]>((res) => res.json());

export default function Home() {
  const { data } = useSwr("/api/todos", fetcher);
  return (
    <>
      <Head>
        <title>Simple Todo</title>
        <meta name="description" content="Simple Todo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {data !== undefined ? (
          data.map((todo) => <p key={todo.id}>{todo.text}</p>)
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
