import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/items/return')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, description };
    fetch('http://localhost:8000/items/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => setItems([...items, data]));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/items/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className="add" type="submit">Add Item</button>
      </form>
      {items.length === 0 ? (
        <p>Sorry, no items...... </p>
      ) :
      (<ul>
      {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>)}
    </div>
  );
}

export default App;
