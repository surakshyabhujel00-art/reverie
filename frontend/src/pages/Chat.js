import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { characterId } = useParams();
  const [chat, setChat] = useState(null);
  const [character, setCharacter] = useState(null);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchChat();
    fetchCharacter();
  }, [characterId]);

  const fetchChat = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`http://localhost:5000/api/chat/${characterId}`, config);
      setChat(res.data);
    } catch (err) {
      console.error('Error fetching chat:', err);
    }
  };

  const fetchCharacter = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/characters/${characterId}`);
      setCharacter(res.data);
    } catch (err) {
      console.error('Error fetching character:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post(`http://localhost:5000/api/chat/${characterId}/message`, { text: message }, config);
      setChat(res.data);
      setMessage('');
    } catch (err) {
      alert('Error sending message: ' + err.response.data.message);
    }
  };

  if (!chat || !character) return <div>Loading...</div>;

  return (
    <div className="chat-container">
      <h2>Chatting with {character.name}</h2>
      <p>Relationship Level: {character.relationshipLevel.toFixed(1)}/10</p>
      
      <div className="messages">
        {chat.messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
