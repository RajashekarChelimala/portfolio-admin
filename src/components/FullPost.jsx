import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myAxios } from '../utils/api';
import { Button } from 'reactstrap';
import './FullPost.css'; // Import custom CSS
import Loader from '../ui-elements/Loader';

const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await myAxios.get(`/allPosts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch the post.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-message">
        <Loader type="bars" /> {/* Loader here */}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="post-container">
      {post.image && (
        <img
          className="post-image"
          data-aos="fade-up"
          src={post.image}
          alt={post.headline}
        />
      )}
      <h1 className="post-title" data-aos="fade-up">{post.headline}</h1>
      <div
        className="post-content"
        data-aos="fade-up"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Button color="secondary" className="go-back-button" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default FullPost;
