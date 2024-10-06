import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { myPrivateAxios } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import { InfinitySpin } from "react-loader-spinner"; // Import InfinitySpin
import "./ManagePosts.css";

const ManagePosts = ({ placeholder }) => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
    image: "",
    _id: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const editor = useRef(null);

  // Correct useMemo implementation
  const config = useMemo(
    () => ({
      readonly: false, 
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true }); // Initialize AOS
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await myPrivateAxios.get("/posts");
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        setPosts([]);
        setError("Unexpected response format.");
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await myPrivateAxios.put(`/posts`, formData);
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Post updated successfully!",
        });
      } else {
        await myPrivateAxios.post("/posts", formData);
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Post created successfully!",
        });
      }
      setFormData({ headline: "", content: "", image: "", _id: "" });
      fetchPosts();
    } catch (err) {
      setError("Error occurred while submitting");
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was a problem saving your post.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await myPrivateAxios.delete(`/posts/${id}`);
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Post deleted successfully.",
        });
        fetchPosts();
      } catch (err) {
        setError("Failed to delete post");
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete the post.",
        });
      }
    }
  };

  const handleEdit = (post) => {
    setFormData({
      headline: post.headline,
      content: post.content,
      image: post.image,
      _id: post._id,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewFullPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Posts</h2>

      {error && <Alert color="danger">{error}</Alert>}

      {/* Post Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <FormGroup>
          <Label for="headline">
            Headline
          </Label>
          <Input
            type="text"
            name="headline"
            id="headline"
            value={formData.headline}
            onChange={handleInputChange}
            required
            maxLength="100"
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">
            Content
          </Label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            config={config}
            tabIndex={1}
            onChange={handleContentChange}
          
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">
            Thumbnail
          </Label>
          <Input
            type="url"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          {formData._id ? "Update Post" : "Create Post"}
        </Button>
      </Form>

      {/* Loader while fetching posts */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <InfinitySpin width="200" color="#ffffff" />
        </div>
      ) : (
        <Row>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Col
                sm="12"
                md="6"
                lg="4"
                key={post._id}
                className="mb-4"
                data-aos="fade-up"
              >
                <Card className="card-custom">
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
                    <div className="card-button">
                      <Button color="warning" onClick={() => handleEdit(post)}>
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="info"
                        onClick={() => viewFullPost(post._id)}
                      >
                        View Full Post
                      </Button>
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

export default ManagePosts;
