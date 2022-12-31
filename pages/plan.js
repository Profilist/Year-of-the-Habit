import { useState, useRef } from "react";
import styles from "./plan.module.css";

export default function Plan(props) {
  const [collapse, setCollapse] = useState(false);
  const contentRef = useRef();

  return (
    <div>
      <button
        type="button"
        className={styles.collapsible}
        onClick={() => setCollapse(!collapse)}
      >
        {props.step}
      </button>
      <div
        class={styles.content}
        ref={contentRef}
        style={collapse ? { height: contentRef.current.scrollHeight +
          "px" } : { height: "0px" }
        }
      >
        <p>{props.detail}</p>
      </div>
    </div>
  );
}
