import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";
import Steps from "./steps";
import ProgBar from "./progressBarComponent";
import illustration from "../public/illustration.svg";
import landingStyles from "./landing.module.css";
import { Link } from "react-scroll";

export default function Home() {
  const [resolutionInput, setResolutionInput] = useState("");
  const [result, setResult] = useState();
  const [list, setList] = useState([""]);
  const [click, setClick] = useState(false);
  const scrollRef = useRef(null);

  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false)
  );
  const [total, setTotal] = useState(0);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generatePlan", {
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
      console.error(error);
      alert(error.message);
    }
  }

  async function onProgress(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateChecklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: result }),
      });

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const steps = data.result.split("\n");
      for (var i in steps) {
        if (steps[i].includes(":")) {
          steps.splice(i, 1);
        }
      }
      steps.shift();

      setList(steps);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleOnChange = (position) => {
    checkedState[position] = !checkedState[position];

    const totalNum = checkedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);

    setTotal(totalNum);
  };

  function changePage() {
    setClick(true);
    // scrollRef.current.scrollIntoView();
  }

  let display = result == null ? "" : result;
  return (
    <div>
      <Head>
        <title>Year of the Habit</title>
        <link rel="icon" href="/yoth.png" />
      </Head>
      <div 
      // style={click ? { display: "none", transitionDelay: "2s" } : { display: "flex" }} 
      className={landingStyles.frame}>
        <img
          className={landingStyles.illustration}
          src={illustration.src}
          alt="illustration"
        />
        <div className={landingStyles.text}>
          <div className={landingStyles.header}>THIS IS</div>
          <div className={landingStyles.header}>YOUR YEAR</div>
          <div className={landingStyles.paragraph}>
            As the new year begins, it's time to reflect on the past and set our
            sights on the future.
          </div>
          <div className={landingStyles.paragraph}>
            This is your year to make your dreams a reality...{" "}
          </div>
          <Link
            activeClass="active"
            to="form"
            spy={true}
            smooth={true}
            offset={-100}
            duration={700}
            className={landingStyles.button} onClick={changePage}>Take Your
            First Step
          </Link>
        </div>
      </div>
      <main
        ref={scrollRef}
        style={click ? { display: "flex" } : { display: "none" }}
        className={styles.main}
      >
        <img src="/yoth.png" className={styles.icon} />
        <div id="form"/>
        <h3>What do you want to achieve in 2023?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="resolution"
            placeholder="Enter your resolution"
            value={resolutionInput}
            onChange={(e) => setResolutionInput(e.target.value)}
          />
          <input type="submit" value="Generate Plan" />
        </form>

        <Steps display={display} />

        <button
          className={styles.progressButton}
          style={display == "" ? { display: "none" } : { display: "flex" }}
          onClick={onProgress}
        >
          Track your Progress
        </button>

        <ul
          className="list"
          style={
            list.toString() == [""].toString()
              ? { display: "none" }
              : { display: "inline-block" }
          }
        >
          {list.map((value, index) => {
            return (
              <li key={index}>
                <div className="item">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={value}
                      value={value}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{value}</label>
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            <div className="item">
              <div className="total">Total:</div>
              <div>{total}</div>
            </div>
          </li>
        </ul>
        {list.toString() == [""].toString() ? (
          <div />
        ) : (
          <ProgBar total={total} num={list.length} />
        )}
      </main>
    </div>
  );
}
