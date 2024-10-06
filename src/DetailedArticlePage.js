import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailedArticlePage.css'; // Create some CSS to style your page

const sentimentEmoji = {
  positive: '😊',
  neutral: '😐',
  negative: '😞',
};

const DetailedArticlePage = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Use backticks to interpolate the id variable
        const response = await axios.get(`http://localhost:5000/article/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const sentimentIcon = sentimentEmoji[article.sentiment] || '😐'; // Default to neutral if sentiment is unknown

  return (
    <div className="article-container">
      {/* Heading */}
      <h1 className="article-heading">{article.headline}</h1>

      {/* Date on the left and sentiment emoji on the right */}
      <div className="article-metadata">
        <span className="article-date">{article.date}</span>
        <span className="article-sentiment">Sentiment {sentimentIcon}</span>
      </div>

      {/* Image */}
      {article.image && (
        <div className="article-image-container">
          <img src={article.image} alt={article.headline} className="article-image" />
        </div>
      )}

      {/* Summary */}
      <div className="article-summary" style={{ fontSize: '1.2em' }}>
        <strong>Summary</strong>
      </div>
      <div className="article-summary">
        <p>{article.summary}</p>
      </div>

      {/* Tags */}
      <div className="article-tags" style={{ fontSize: '1.2em' }}>
        <strong>Tags</strong>
      </div>
      <div className="article-tags">
        {article.tags.map((tag, index) => (
          <span key={index} className="article-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-classification" style={{ fontSize: '1.1em' }}>
        Shortify's predicted category: <strong>{article.classification}</strong>
      </div>

      {/* Link to original article */}
      <div className="article-link">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read full article
        </a>
      </div>
    </div>
  );
};

export default DetailedArticlePage;
