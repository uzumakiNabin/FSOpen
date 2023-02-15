import { useState } from "react";

import Button from "./Button";
import Stats from "./Stats";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={setGood} text={"good"} />
      <Button handleClick={setNeutral} text={"neutral"} />
      <Button handleClick={setBad} text={"bad"} />
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
