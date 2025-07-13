import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import AppCard from './AppCard';
import SkeletonCard from './SkeletonCard';
import { apps } from '../data/apps';
import './Apps.css';

const Apps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState('name-asc');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Shorter loading time for this page
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => ['All', ...new Set(apps.map(app => app.category))], []);

  const filteredAndSortedApps = useMemo(() => {
    return apps
      .filter(app => filterCategory === 'All' || app.category === filterCategory)
      .sort((a, b) => {
        const [sortBy, order] = sortType.split('-');
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (order === 'asc') {
          return aVal.localeCompare(bVal, undefined, { numeric: true });
        } else {
          return bVal.localeCompare(aVal, undefined, { numeric: true });
        }
      });
  }, [apps, sortType, filterCategory]);

  return (
    <div className="apps-page">
      <Header />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Premium Apps</h1>
          <p className="page-subtitle">
            Discover our carefully curated collection of premium mobile applications
          </p>
        </div>
        
        <div className="controls-container">
          <div className="filter-controls">
            <span>Filter by:</span>
            {categories.map(category => (
              <button
                key={category}
                className={`control-btn ${filterCategory === category ? 'active' : ''}`}
                onClick={() => setFilterCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="sort-controls">
            <span>Sort by:</span>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="sort-select">
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="version-desc">Version (Newest)</option>
              <option value="version-asc">Version (Oldest)</option>
            </select>
          </div>
        </div>

        <div className="apps-grid">
          {isLoading
            ? Array.from({ length: filteredAndSortedApps.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : filteredAndSortedApps.map((app, index) => (
                <AppCard key={app.id} app={app} index={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Apps; 