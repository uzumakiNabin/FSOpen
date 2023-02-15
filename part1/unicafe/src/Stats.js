import StatisticsLine from "./StatisticsLine";

const Stats = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverage = () => (good * 1 - bad * 1) / getAll();
  const getPositive = () => (good / getAll()) * 100;
  return good > 0 || neutral > 0 || bad > 0 ? (
    <div>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={getAll()} />
          <StatisticsLine text={"average"} value={getAverage()} />
          <StatisticsLine text={"positive"} value={getPositive()} />
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given.</p>
  );
};

export default Stats;
