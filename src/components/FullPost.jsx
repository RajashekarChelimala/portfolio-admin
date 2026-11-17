import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myAxios } from "../utils/api";
import { Container } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineCalendar, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { DEFAULT_POSTS } from "../utils/fallbackData";
import "./FullPost.css";

const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchPost = async () => {
      try {
        const response = await myAxios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="status-pill mb-3">Loading Article...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <Container className="py-5 text-center">
        <h2>Article not found.</h2>
        <button onClick={() => navigate("/posts")} className="btn-modern-primary mt-3">
          <AiOutlineArrowLeft className="me-2" /> Back to Articles
        </button>
      </Container>
    );
  }

  return (
    <div className="full-post-page">
      <Container className="max-w-prose">
        <button onClick={() => navigate("/posts")} className="btn-back-nav mb-4">
          <AiOutlineArrowLeft className="me-2" /> All Articles
        </button>

        <article className="post-article glass-panel p-4 p-md-5">
          {post.image && (
            <div className="post-hero-image-wrap mb-4">
              <img
                src={post.image}
                alt={post.headline}
                className="post-hero-img"
              />
            </div>
          )}

          <div className="post-header-meta mb-3">
            <span className="post-meta-item">
              <AiOutlineCalendar className="me-1" />
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent"}
            </span>
            <span className="post-meta-item">
              <AiOutlineEye className="me-1" /> {post.views || 0} views
            </span>
            <span className="post-meta-item text-danger">
              <AiFillHeart className="me-1" /> {post.likes || 0} likes
            </span>
          </div>

          <h1 className="post-main-title mb-4">{post.headline}</h1>

          <div
            className="post-prose-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr className="my-5 border-secondary" />

          {/* Author Byline Card */}
          <div className="post-author-card d-flex align-items-center gap-3">
            <div className="author-avatar-badge">RC</div>
            <div>
              <div className="fw-bold">Rajashekar Chelimala</div>
              <p className="text-muted small mb-0">Full Stack Software Engineer & Technical Author</p>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default FullPost;
