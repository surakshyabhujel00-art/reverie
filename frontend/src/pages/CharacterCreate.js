import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CharacterCreate = () => {
  const [formData, setFormData] = useState({ name: '', bio: '', personality: '', relationship: '', traits: '' });
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/characters', {
        ...formData,
        traits: formData.traits.split(',')
      }, config);
      alert('Character created!');
      setFormData({ name: '', bio: '', personality: '', relationship: '', traits: '' });
    } catch (err) {
      alert('Error creating character: ' + err.response.data.message);
    }
  };

  return (
    <div className="create-character">
      <h2>Create Your AI Character</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Character Name" onChange={handleChange} required />
        <textarea name="bio" placeholder="Bio (describe your character)" onChange={handleChange} required />
        <input type="text" name="personality" placeholder="Personality (romantic, teasing, protective)" onChange={handleChange} required />
        <select name="relationship" onChange={handleChange} required>
          <option>Relationship Type</option>
          <option>Boyfriend</option>
          <option>Husband</option>
          <option>Love Interest</option>
        </select>
        <input type="text" name="traits" placeholder="Traits (comma separated: romantic, teasing, protective)" onChange={handleChange} required />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CharacterCreate;
