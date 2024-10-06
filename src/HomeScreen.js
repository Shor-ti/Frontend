import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomeScreen.css'; // Import custom styles

function HomeScreen() {
  const [groupedArticles, setGroupedArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then((response) => response.json())
      .then((data) => setGroupedArticles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container className="py-5">
      {groupedArticles.map((group) => {
        const filteredArticles = group.articles.filter(article => article.image_url); // Filter to include only articles with images

        // Skip categories that don't have articles with images
        if (filteredArticles.length === 0) {
          return null; // Don't render this category
        }

        return (
          <div key={group._id} className="my-4">
            <h2 className="category-title">{group._id}</h2>
            <Row>
              {filteredArticles.map((article) => (
                <Col md={4} sm={6} xs={12} key={article._id} className="mb-4">
                  <Card className="article-card">
                    <Card.Img variant="top" src={article.image_url} />
                    <Card.Body>
                      <Card.Title className="article-title">
                        {article.title.length > 50 ? `${article.title.substring(0, 47)}...` : article.title} {/* Truncate title */}
                      </Card.Title>
                      <Link to={`/article/${article._id.$oid}`} className="read-more-button">
                        Read More
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </Container>
  );
}

export default HomeScreen;
