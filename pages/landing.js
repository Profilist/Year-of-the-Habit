import illustration from '../public/illustration.svg';
import styles from './landing.module.css';
import { useState } from "react";

const landing = () => {
  const [click, setClick] = useState();
  return (
    <div class={styles.frame}>
        <img class={styles.illustration} src={illustration.src} alt="illustration"/>
        <div class={styles.text}>
            <div class={styles.header}>THIS IS</div>
            <div class={styles.header}>YOUR YEAR</div>
            <div class={styles.paragraph}>As the new year begins, it's time to reflect on the past and set our sights on the future.</div>
            <div class={styles.paragraph}>This is your year to make your dreams a reality... </div>
            <button class={styles.button} onClick={setClick(true)}>Take Your First Step</button>
        </div>
    </div>
  );
}

export default landing;