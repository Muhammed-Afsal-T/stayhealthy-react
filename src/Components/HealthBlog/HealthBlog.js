import React from 'react';
import './HealthBlog.css';

const HealthBlog = () => {
    const healthArticles = [
        {
            id: 1,
            title: "10 Tips for Healthy Living",
            excerpt: "Discover simple ways to improve your daily health routine...",
            category: "Wellness"
        },
        {
            id: 2,
            title: "Understanding Heart Health",
            excerpt: "Learn about maintaining a healthy heart through diet and exercise...",
            category: "Cardiology"
        },
        {
            id: 3,
            title: "Mental Health Matters",
            excerpt: "The importance of mental wellbeing in overall health...",
            category: "Mental Health"
        },
        {
            id: 4,
            title: "Nutrition Guide 2024",
            excerpt: "Latest research on balanced nutrition and healthy eating...",
            category: "Nutrition"
        }
    ];

    return (
        <div className="mobile-content-spacing">
        <div className="health-blog-container">
            <div className="blog-header">
                <h1>Health Blog</h1>
                <p>Your source for health tips, medical insights, and wellness advice</p>
            </div>

            <div className="blog-articles">
                {healthArticles.map(article => (
                    <div key={article.id} className="article-card">
                        <div className="article-category">{article.category}</div>
                        <h3 className="article-title">{article.title}</h3>
                        <p className="article-excerpt">{article.excerpt}</p>
                        <button className="read-more-btn">Read More</button>
                    </div>
                ))}
            </div>

            <div className="blog-sidebar">
                <h3>Health Categories</h3>
                <ul>
                    <li>Wellness & Prevention</li>
                    <li>Nutrition & Diet</li>
                    <li>Mental Health</li>
                    <li>Fitness & Exercise</li>
                    <li>Chronic Conditions</li>
                </ul>
            </div>
        </div>
    </div> 
    );
};

export default HealthBlog;