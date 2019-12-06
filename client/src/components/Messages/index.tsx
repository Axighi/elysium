import React, { Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, Skeleton, Avatar } from "antd";

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

const DELETE_MESSAGE = gql`
  mutation deleteMessage($msg: MessageWhereUniqueInput!) {
    deleteMessage(where: $msg) {
      id
      description
    }
  }
`;

const Messages: React.FC = () => {
  const { loading, error, data = { messages: [] } } = useQuery(MESSAGES);
  const [createMessage, createdResult] = useMutation(CREATE_MESSAGE);
  const [deleteMessage, deletedResult] = useMutation(DELETE_MESSAGE);

  let input: any;

  if (error) return <p>Error :(</p>;

  const handleClickDelete = (id: string) => {
    deleteMessage({ variables: { msg: { id } } });
  };

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
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={data.messages}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-delete" onClick={() => handleClickDelete(item.id)}>
                delete
              </a>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.id}</a>}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default Messages;
