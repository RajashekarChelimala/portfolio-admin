import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap";
import { AiFillHeart, AiOutlineShareAlt, AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { myAxios } from "../utils/api";
import { DEFAULT_POSTS } from "../utils/fallbackData";
import likeSoundFile from "../assets/sounds/like-sound.mp3";
import useSocket from "../hooks/useSocket";
import { showSuccessToast } from "../ui-elements/toastConfig";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [sortOrder, setSortOrder] = useState("mostRecent");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("liked_posts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  const handleNewPost = (newPost) => {
    showSuccessToast(`Hey, a new article was published!`);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  useSocket("newPost", handleNewPost);
  useSocket("deletePost", handleDeletePost);
  useSocket("updatePost", handleUpdatePost);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await myAxios.get("/posts");
      if (Array.isArray(response.data) && response.data.length > 0) {
        setPosts(response.data);
      }
    } catch (err) {
      console.warn("Using default posts while backend wakes up:", err.message);
    }
  };

  const getVisitorId = () => {
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      visitorId = Date.now().toString();
      localStorage.setItem("visitorId", visitorId);
    }
    return visitorId;
  };

  const playLikeSound = () => {
    try {
      const likeSound = new Audio(likeSoundFile);
      likeSound.play();
    } catch {
      // Audio playback might be prevented by browser auto-play policy
    }
  };

  const likeCooldownRef = useRef({});
  const likeSeqRef = useRef({});

  const likePost = async (e, postId) => {
    e.stopPropagation();
    const now = Date.now();
    // Guard against rapid click spamming within 350ms
    if (likeCooldownRef.current[postId] && now - likeCooldownRef.current[postId] < 350) {
      return;
    }
    likeCooldownRef.current[postId] = now;

    const seq = (likeSeqRef.current[postId] || 0) + 1;
    likeSeqRef.current[postId] = seq;

    const visitorId = getVisitorId();
    const isCurrentlyLiked = likedPosts.includes(postId);
    const willBeLiked = !isCurrentlyLiked;

    // Optimistic toggle
    if (willBeLiked) {
      playLikeSound();
      const updated = [...likedPosts, postId];
      setLikedPosts(updated);
      localStorage.setItem("liked_posts", JSON.stringify(updated));
    } else {
      const updated = likedPosts.filter((id) => id !== postId);
      setLikedPosts(updated);
      localStorage.setItem("liked_posts", JSON.stringify(updated));
    }

    setPosts((prev) =>
      prev.map((p) => {
        if (p._id === postId) {
          const currentLikes = p.likes || 0;
          const finalLikes = willBeLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
          return { ...p, likes: finalLikes };
        }
        return p;
      })
    );

    // Sync with backend API
    try {
      const res = await myAxios.post(`/posts/${postId}/like`, { visitorId });
      // Guard against race conditions: only update if no newer click occurred
      if (likeSeqRef.current[postId] === seq && typeof res.data?.likes === "number") {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? { ...p, likes: res.data.likes } : p))
        );
      }
    } catch {
      // Offline fallback: keep optimistic local state
    }
  };

  const viewFullPost = (postId) => {
    const visitorId = getVisitorId();
    try {
      myAxios.post(`/posts/${postId}/engage`, { visitorId });
    } catch {
      // Background engage fire-and-forget
    }
    navigate(`/posts/${postId}`);
  };

  const copyLink = (e, postId) => {
    e.stopPropagation();
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl);
    showSuccessToast("Article link copied to clipboard!");
  };

  const calculateReadTime = (content) => {
    if (!content) return "2 min read";
    const words = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const sortedPosts = () => {
    let sorted = [...posts];
    switch (sortOrder) {
      case "mostRecent":
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case "liked":
        sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "mostEngaged":
        sorted.sort((a, b) => (b.engagementCount || 0) - (a.engagementCount || 0));
        break;
      default:
        break;
    }
    return sorted.filter(
      (post) =>
        post.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filtered = sortedPosts();

  return (
    <div className="posts-page">
      <Container>
        {/* Header Section */}
        <section className="posts-header text-center my-4" data-aos="fade-up">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Engineering Insights
          </span>
          <h1 className="section-title">
            Articles & <span className="gradient-text">Publications</span>
          </h1>
          <p className="section-subtitle">
            Deep dives into scalable architecture, modern full-stack workflows, performance, and best practices.
          </p>

          {/* Search & Sort Bar */}
          <div className="posts-control-bar glass-panel">
            <div className="search-wrap">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search articles by keyword or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />
            </div>

            <div className="sort-pills">
              {[
                { label: "Most Recent", val: "mostRecent" },
                { label: "Most Liked", val: "liked" },
                { label: "Most Engaged", val: "mostEngaged" }
              ].map((s) => (
                <button
                  key={s.val}
                  className={`sort-pill ${sortOrder === s.val ? "active" : ""}`}
                  onClick={() => setSortOrder(s.val)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <Row className="g-4 my-4">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <Col lg={4} md={6} sm={12} key={post._id} data-aos="fade-up">
                <article
                  className="article-modern-card glass-panel h-100"
                  onClick={() => viewFullPost(post._id)}
                >
                  {post.image ? (
                    <div className="article-cover-wrap">
                      <img
                        src={post.image}
                        alt={post.headline}
                        className="article-cover-img"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="article-placeholder-cover">
                      <span className="gradient-text fs-4 fw-bold">RC Tech</span>
                    </div>
                  )}

                  <div className="article-body">
                    <div className="article-meta">
                      <span className="read-time-badge">{calculateReadTime(post.content)}</span>
                      <span className="article-date">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </span>
                    </div>

                    <h3 className="article-title" title={post.headline}>
                      {post.headline}
                    </h3>

                    <p
                      className="article-snippet"
                      title={post.content ? post.content.replace(/<[^>]*>?/gm, "").trim() : ""}
                    >
                      {post.content
                        ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 120) + "..."
                        : "Click to read full publication."}
                    </p>

                    <div className="article-footer mt-auto pt-3">
                      <div className="article-stats">
                        <button
                          type="button"
                          className={`stat-btn heart ${likedPosts.includes(post._id) ? "liked text-danger" : ""}`}
                          onClick={(e) => likePost(e, post._id)}
                          title={likedPosts.includes(post._id) ? "Unlike article" : "Like article"}
                        >
                          <AiFillHeart className="stat-icon heart-icon" /> {post.likes || 0}
                        </button>

                        <span className="stat-item" title="Views">
                          <AiOutlineEye className="stat-icon" /> {post.views || 0}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="share-btn"
                        onClick={(e) => copyLink(e, post._id)}
                        title="Copy article link"
                      >
                        <AiOutlineShareAlt />
                      </button>
                    </div>
                  </div>
                </article>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center py-5">
              <div className="glass-panel p-5 max-w-md mx-auto">
                <h4>No articles matched your search.</h4>
                <p className="text-secondary mb-0">Try searching for other engineering keywords.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AllPosts;
