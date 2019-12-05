import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MESSAGES = gql`
  {
    messages {
      id
      description
    }
  }
`;

const Post: React.FC = () => {
  const { loading, error, data } = useQuery(MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data.messages.map((post: any) => (
          <li key={post.id}>
            <h2>{post.id}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
