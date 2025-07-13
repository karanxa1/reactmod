import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Welcome to MODZ Blog",
      excerpt: "Stay updated with the latest app releases, tutorials, and community news.",
      date: "2024-01-15",
              author: "MODZ Team",
      category: "News"
    },
    {
      id: 2,
      title: "How to Install APK Files Safely",
      excerpt: "A comprehensive guide to installing APK files securely on your Android device.",
      date: "2024-01-10",
      author: "Tech Support",
      category: "Tutorial"
    },
    {
      id: 3,
      title: "Premium Apps vs Free Apps",
      excerpt: "Understanding the differences and benefits of premium mobile applications.",
      date: "2024-01-05",
      author: "App Review Team",
      category: "Review"
    }
  ];

  return (
    <div className="blog-page">
      <Header />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">
            Latest news, tutorials, and insights from the MODZ community
          </p>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-header">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-author">By {post.author}</span>
                <button className="read-more-btn">Read More</button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="blog-cta">
          <div className="blog-cta-content">
            <h3>Want to stay updated?</h3>
            <p>Join our Telegram channel for instant updates on new blog posts and app releases</p>
            <button 
              className="btn-primary"
              onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}
            >
              Join Telegram Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 