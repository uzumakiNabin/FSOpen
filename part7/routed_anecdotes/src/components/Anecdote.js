const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} <em>by {anecdote.author}</em>
      </h2>
      <p>
        has {anecdote.vote} {anecdote.vote === 1 ? "vote" : "votes"}
      </p>
      <p>
        for more info see <a href={anecdote.url}>{anecdote.url}</a>
      </p>
    </div>
  );
};

export default Anecdote;
