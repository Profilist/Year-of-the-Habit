import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Steps from "./steps";

export default function Home() {
  const [resolutionInput, setResolutionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: resolutionInput }),
      });

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  let display = result == null ? "" : result;

  return (
    <div>
      <Head>
        <title>Year of the Habit</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>
      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>What do you want to achieve in 2023?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="resolution"
            placeholder="Enter your resolution"
            value={resolutionInput}
            onChange={(e) => setResolutionInput(e.target.value)}
          />
          <input type="submit" value="Generate plan" />
        </form>

        <Steps display={display} />

        <button
          className={styles.progress}
          style={display == "" ? { display: "none" } : { display: "flex" }}
        >
          Track your Progress
        </button>
      </main>
    </div>
  );
}
