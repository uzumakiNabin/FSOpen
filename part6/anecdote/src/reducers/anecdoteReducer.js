const initialState = [
  {
    id: 1,
    content: "If it hurts, do it more often.",
    vote: 0,
  },
  {
    id: 2,
    content: "Adding manpower to a late software project makes it later!",
    vote: 0,
  },
  {
    id: 3,
    content:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    vote: 0,
  },
  {
    id: 4,
    content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    vote: 0,
  },
  {
    id: 5,
    content: "Premature optimization is the root of all evil.",
    vote: 0,
  },
  {
    id: 6,
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    vote: 0,
  },
  {
    id: 7,
    content:
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    vote: 0,
  },
  {
    id: 8,
    content: "The only way to go fast, is to go well.",
    vote: 0,
  },
];

const generateId = (currentState) => {
  return currentState.sort((first, second) => second.id - first.id)[0].id + 1;
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.voteId) {
          return { ...anecdote, vote: anecdote.vote + 1 };
        } else {
          return anecdote;
        }
      });
    case "ADD_ANECDOTE":
      return [...state, { id: generateId(state), content: action.payload.content, vote: 0 }];
    case "RESET_VOTES":
      return initialState;
    default:
      return state;
  }
};

export default anecdoteReducer;

export const voteAnecdote = (voteId) => {
  return { type: "VOTE", payload: { voteId } };
};

export const resetVotes = () => {
  return { type: "RESET_VOTES" };
};

export const addNewAnecdote = (content) => {
  return { type: "ADD_ANECDOTE", payload: { content } };
};
