import { useState } from "react";

import Button from "./components/Button";
import Stats from "./components/Stats";
import store from "./reducers/store";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  store.subscribe(() => {
    const currentState = store.getState();
    setGood(currentState.good);
    setNeutral(currentState.ok);
    setBad(currentState.bad);
  });
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => store.dispatch({ type: "GOOD" })} text={"good"} />
      <Button handleClick={() => store.dispatch({ type: "OK" })} text={"neutral"} />
      <Button handleClick={() => store.dispatch({ type: "BAD" })} text={"bad"} />
      <Button handleClick={() => store.dispatch({ type: "ZERO" })} text={"reset stats"} />
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
