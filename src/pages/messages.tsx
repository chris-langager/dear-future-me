import { type NextPage } from 'next';

import { trpc } from '../utils/trpc';

const Messages: NextPage = () => {
  const messagesResponse = trpc.messages.list.useQuery();

  if (!messagesResponse.data) {
    return <div>loading...</div>;
  }

  if (messagesResponse.error) {
    console.log(messagesResponse.error);
    return <div>error</div>;
  }

  return <pre>{JSON.stringify(messagesResponse.data, null, 2)}</pre>;
};

export default Messages;
