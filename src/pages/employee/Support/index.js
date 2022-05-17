import React, { useState } from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import '@progress/kendo-theme-material/dist/all.css';
import './mobile.css';

const SupportMobile = props => {
  const [messages, setMessages] = useState([
    {
      author: {
        id: 2,
        name: 'Admin'
      },
      selectionIndex: 1,
      text: 'Hello my name is Admin, how can I help you?'
    }
  ]);

  const user = {
    id: 1,
    name: 'John'
  };

  const addNewMessage = event => {
    return setMessages([...messages, event.message]);
  };

  return (
    <div style={{ padding: '0px' }}>
      <Chat messages={messages} user={user} onMessageSend={addNewMessage} />
    </div>
  );
};

export default SupportMobile;
