"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { callHelloAPI } from "./services/test";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await callHelloAPI();
      setMessage(data);
      console.log(data);
    }
    fetchData();
  }, []);
  return <main className={styles.main}></main>;
}
