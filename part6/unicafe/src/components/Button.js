const Button = ({ handleClick, text }) => {
  return (
    <button onClick={() => handleClick((prev) => prev + 1)}>{text}</button>
  );
};

export default Button;
