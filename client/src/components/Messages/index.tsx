import React, { Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, Button } from "antd";

const MESSAGES = gql`
  {
    messages {
      id
      description
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($msg: MessageCreateInput!) {
    createMessage(data: $msg) {
      id
      description
    }
  }
`;

const Messages: React.FC = () => {
  const { loading, error, data } = useQuery(MESSAGES);
  const [createMessage, createdResult] = useMutation(CREATE_MESSAGE);

  let input: any;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          createMessage({ variables: { msg: { description: input.value } } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">New Message</button>
      </form>
      <List
        itemLayout="horizontal"
        dataSource={data.messages}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta title={<a href="https://ant.design">{item.id}</a>} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default Messages;
