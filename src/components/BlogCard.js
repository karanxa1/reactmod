import React from 'react';
import useTilt from '../hooks/useTilt';

const BlogCard = ({ post, index }) => {
  const tiltRef = useTilt({
    max: 5,
    speed: 300,
    glare: true,
    'max-glare': 0.1,
    perspective: 1000,
  });

  return (
    <article 
      className="blog-card" 
      ref={tiltRef}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="blog-card-header">
        <span className="blog-category">{post.category}</span>
        <span className="blog-date">{post.date}</span>
      </div>
      <div className="blog-card-content">
        <h2 className="blog-title">{post.title}</h2>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-card-footer">
          <span className="blog-author">By {post.author}</span>
          <button className="read-more-btn">Read More</button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard; 