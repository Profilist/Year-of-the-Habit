import styles from "./index.module.css";
import Plan from "./plan";

export default function Steps(props) {
  let display = props.display;
  return (
    <table
      class={styles.collapses}
      style={display == "" ? { display: "none" } : { display: "table" }}
    >
      <tr>
        <td>
          <Plan
            step={display.substring(0, display.indexOf("2. ")).split(": ")[0]}
            detail={display.substring(0, display.indexOf("2. ")).split(": ")[1]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <Plan
            step={
              display
                .substring(display.indexOf("2. "), display.indexOf("3. "))
                .split(": ")[0]
            }
            detail={
              display
                .substring(display.indexOf("2. ") + 3, display.indexOf("3. "))
                .split(": ")[1]
            }
          />
        </td>
      </tr>
      <tr>
        <td>
          <Plan
            step={display.substring(display.indexOf("3. ")).split(": ")[0]}
            detail={
              display.substring(display.indexOf("3. ") + 3).split(": ")[1]
            }
          />
        </td>
      </tr>
    </table>
  );
}
