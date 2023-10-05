import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER, GET_ALL } from "../graphQueries";

const Recommendations = () => {
  const [getAll, { loading, data }] = useLazyQuery(GET_ALL);
  const { loading: loadingUser, data: userData } = useQuery(GET_USER, {
    onCompleted: (data) => {
      getAll({ variables: { genre: data.me.favoriteGenre } });
    },
  });

  if (loadingUser || loading) {
    return <div>Loading Recommendations...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <span style={{ fontWeight: "bold" }}>{userData.me.favoriteGenre}</span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
