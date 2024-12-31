import React, { useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext); // Access the Firebase instance
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Stores the selected image file
  const date = new Date();
  const history = useHistory()

  const handleSubmit = () => {
    // Create a Firestore document with the form data
    firebase
      .firestore()
      .collection('products') // Replace 'products' with your desired Firestore collection name
      .add({
        name,
        category,
        price,
        createdAt: date.toDateString(),
      })
      history.push('/')
    };

  return (
    <div>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          name="Name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          name="Category"
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
        />
        <br />
        <br />
        <img
          alt="Preview"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Create;
