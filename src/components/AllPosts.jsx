import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Alert,
  Input,
} from "reactstrap";
import { AiFillHeart, AiOutlineLink } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { myAxios } from "../utils/api";
import AOS from "aos";
import "aos/dist/aos.css";
import likeSoundFile from "../assets/sounds/like-sound.mp3";
import "./AllPosts.css";
import Loader from "../ui-elements/Loader";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("mostRecent");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await myAxios.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedPosts = () => {
    let sorted = [...posts];
    switch (sortOrder) {
      case "mostRecent":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "liked":
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "mostEngaged":
        sorted.sort((a, b) => b.engagementCount - a.engagementCount);
        break;
      default:
        break;
    }
    return sorted.filter(
      (post) =>
        post.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    const likeSound = new Audio(likeSoundFile);
    likeSound.play();
  };

  const likePost = async (postId) => {
    const visitorId = getVisitorId();
    try {
      await myAxios.post(`/posts/${postId}/like`, { visitorId });
      playLikeSound();
      fetchPosts();
    } catch (err) {
      console.error("Failed to like post:", err);
      alert("Failed to like the post.");
    }
  };

  const viewFullPost = (postId) => {
    const visitorId = getVisitorId();
    myAxios.post(`/posts/${postId}/engage`, { visitorId });
    navigate(`/posts/${postId}`);
  };

  const copyLink = (postId) => {
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="container mt-4 all-posts">
      <h2 className="text-center">Posts</h2>

      {/* Sorting and Searching */}
      <Row className="d-flex justify-content-between mb-3">
        <Col md="4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </Col>
        <Col md="4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="mostRecent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="liked">Most Liked</option>
            <option value="mostEngaged">Most Engaged</option>
          </select>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loader type="bars" />
        </div>
      ) : (
        <Row>
          {sortedPosts().length > 0 ? (
            sortedPosts().map((post) => (
              <Col
                sm="12"
                md="6"
                lg="4"
                key={post._id}
                className="mb-4"
                data-aos="fade-up"
              >
                <Card
                  className="card-custom"
                  onClick={() => viewFullPost(post._id)}
                  style={{ cursor: "pointer" }}
                >
                  {post.image && (
                    <CardImg
                      top
                      width="100%"
                      src={post.image}
                      alt={post.headline}
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                  )}
                  <CardBody className="custom-card-body">
                    <CardTitle className="card-title-custom" tag="h5">
                      {post.headline}
                    </CardTitle>
                    <CardText
                      className="card-text-custom"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <div
                      className="interaction-section d-flex justify-content-between mt-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="interaction-icons d-flex gap-3">
                        <Button
                          color="danger"
                          className="rounded-pill d-flex align-items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            likePost(post._id);
                          }}
                        >
                          <AiFillHeart className="me-2" size={20} />{" "}
                          {post.likes || 0}
                        </Button>
                        <Button
                          color="warning"
                          className="rounded-pill d-flex align-items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewFullPost(post._id);
                          }}
                        >
                          <IoEye className="me-2" size={20} />{" "}
                          {post.engagementCount || 0}
                        </Button>
                      </div>
                      <div className="copy-link">
                        <Button
                          color="info"
                          className="rounded-pill d-flex align-items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyLink(post._id);
                          }}
                        >
                          <AiOutlineLink className="me-2" size={20} /> Copy Link
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert color="info" className="text-center">
                No posts available
              </Alert>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default AllPosts;
