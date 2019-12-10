import React, { Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, Skeleton, Button } from "antd";

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

// const UPDATE_MESSAGE = gql`
//   mutation updateMessage($msg: MessageUpdateInput, $where: MessageWhereUniqueInput!) {
//     updateMessage(data: $msg, where: $where) {
//       id
//       description
//     }
//   }
// `;

const Messages: React.FC = () => {
  const { loading, error, data } = useQuery(MESSAGES, { fetchPolicy: "cache-and-network" });
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    update(cache, { data: { createMessage } }) {
      const result: any = cache.readQuery({ query: MESSAGES });
      cache.writeQuery({
        query: MESSAGES,
        data: { messages: result.messages.concat([createMessage]) }
      });
    }
  });

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    update(cache, { data: { deleteMessage } }) {
      const result: any = cache.readQuery({ query: MESSAGES });
      cache.writeQuery({
        query: MESSAGES,
        data: { messages: result.messages.filter((msg: any) => msg.id !== deleteMessage.id) } // TODO: update messages
      });
    }
  });

  // const [updateMessage] = useMutation(UPDATE_MESSAGE, {
  //   update(cache, { data: { updateMessage } }) {
  //     const result: any = cache.readQuery({ query: MESSAGES });
  //     cache.writeQuery({
  //       query: MESSAGES,
  //       data: { messages: result.messages } // TODO: update messages
  //     });
  //   }
  // });

  if (error) return <p>Error :(</p>;

  let createInput: any;

  const handleClickDelete = (id: string) => {
    deleteMessage({ variables: { msg: { id } } });
  };

  // const handleClickUpdate = (id: string, payload: any) => {
  //   updateMessage;
  // };

  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          createMessage({ variables: { msg: { description: createInput.value } } });
          createInput.value = "";
        }}
      >
        <input
          ref={node => {
            createInput = node;
          }}
        />
        <button type="submit">New Message</button>
      </form>
      {data && (
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={data.messages}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                // <Button key="list-loadmore-edit">edit</Button>,
                <Button key="list-loadmore-delete" onClick={() => handleClickDelete(item.id)}>
                  delete
                </Button>
              ]}
            >
              <Skeleton title={false} loading={item.loading}>
                <List.Item.Meta title={item.id} description={item.description} />
              </Skeleton>
            </List.Item>
          )}
        />
      )}
    </Fragment>
  );
};

export default Messages;
