import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null); // Seller's details
  const { postDetails } = useContext(PostContext); // Post details from context
  const { firebase } = useContext(FirebaseContext); // Firebase instance

  useEffect(() => {
    // Check if postDetails and userId are available
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;

      // Fetch seller's details from Firestore
      firebase
        .firestore()
        .collection('user') // Replace 'user' with the exact collection name
        .where('id', '==', userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data()); // Save user data to state
          });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [firebase, postDetails]); // Add dependencies to re-run if they change

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {/* Replace with dynamic post image if available */}
        <img src="../../../Images/R15V3.jpg" alt="Product" />
      </div>

      <div className="rightSection">
        {/* Product Details */}
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name || 'Product Name'}</span>
          <p>{postDetails?.category || 'Category'}</p>
          <span>{postDetails?.createdAt || 'Creation Date'}</span>
        </div>

        {/* Seller Details */}
        {userDetails && (
          <div className="contactDetails">
            <p>Seller Details</p>
            <p>Name: {userDetails.username || 'N/A'}</p>
            <p>Phone: {userDetails.phone || 'N/A'}</p>
            <p>Email: {userDetails.email || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
