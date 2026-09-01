import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StoryFeed = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', content: '', characterId: '' });
  const [characters, setCharacters] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchStories();
    fetchCharacters();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stories/feed/all');
      setStories(res.data);
    } catch (err) {
      console.error('Error fetching stories:', err);
    }
  };

  const fetchCharacters = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://localhost:5000/api/characters', config);
      setCharacters(res.data);
    } catch (err) {
      console.error('Error fetching characters:', err);
    }
  };

  const handlePostStory = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/stories', newStory, config);
      alert('Story posted! Your character will comment on it.');
      setNewStory({ title: '', content: '', characterId: '' });
      fetchStories();
    } catch (err) {
      alert('Error posting story: ' + err.response.data.message);
    }
  };

  return (
    <div className="story-feed">
      <h2>Story Feed</h2>
      
      <div className="create-story">
        <h3>Share Your Story</h3>
        <form onSubmit={handlePostStory}>
          <input type="text" placeholder="Story Title" value={newStory.title} onChange={(e) => setNewStory({ ...newStory, title: e.target.value })} required />
          <textarea placeholder="Write your story..." value={newStory.content} onChange={(e) => setNewStory({ ...newStory, content: e.target.value })} required />
          <select value={newStory.characterId} onChange={(e) => setNewStory({ ...newStory, characterId: e.target.value })} required>
            <option>Select a character to comment</option>
            {characters.map(char => <option key={char._id} value={char._id}>{char.name}</option>)}
          </select>
          <button type="submit">Post Story</button>
        </form>
      </div>

      <div className="stories-list">
        {stories.map(story => (
          <div key={story._id} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <div className="comments">
              {story.comments.map((comment, idx) => (
                <div key={idx} className="comment">
                  <strong>{comment.characterName}:</strong> {comment.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryFeed;
