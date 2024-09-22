import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myAxios } from '../utils/api';
import { Button } from 'reactstrap';
import './FullPost.css'; // Import custom CSS

const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await myAxios.get(`/allPosts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch the post.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="post-container">
      {post.image && (
        <img
          className="post-image"
          src={post.image}
          alt={post.headline}
        />
      )}
      <h1 className="post-title">{post.headline}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Button color="secondary" className="go-back-button" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default FullPost;
