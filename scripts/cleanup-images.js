#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

// Patterns for generated images to clean up
const CLEANUP_PATTERNS = [
  /_\d+w\.(webp|avif)$/,  // Generated responsive images
  /_320w\.(jpg|jpeg|png)$/,  // Small size originals
  /_1920w\.(jpg|jpeg|png)$/,  // Large size originals
  /_640w\.(jpg|jpeg|png)$/,   // Medium size originals
  /_1024w\.(jpg|jpeg|png)$/   // Large size originals
];

const DIRECTORIES = ['./public', './src'];

/**
 * Check if a filename matches cleanup patterns
 */
const shouldCleanup = (filename) => {
  return CLEANUP_PATTERNS.some(pattern => pattern.test(filename));
};

/**
 * Recursively find and clean up generated images
 */
const cleanupDirectory = async (dirPath) => {
  try {
    const items = await readdir(dirPath);
    let cleanedCount = 0;
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        // Recursively clean subdirectories
        cleanedCount += await cleanupDirectory(fullPath);
      } else if (stats.isFile() && shouldCleanup(item)) {
        try {
          await unlink(fullPath);
          console.log(`🗑️  Removed: ${fullPath}`);
          cleanedCount++;
        } catch (error) {
          console.error(`❌ Failed to remove ${fullPath}:`, error.message);
        }
      }
    }
    
    return cleanedCount;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`❌ Error reading directory ${dirPath}:`, error.message);
    }
    return 0;
  }
};

/**
 * Main cleanup function
 */
const cleanupImages = async () => {
  console.log('🧹 Starting image cleanup...');
  console.log(`📁 Cleaning directories: ${DIRECTORIES.join(', ')}`);
  console.log('\n');
  
  let totalCleaned = 0;
  
  for (const dir of DIRECTORIES) {
    console.log(`🔍 Scanning ${dir}...`);
    const cleaned = await cleanupDirectory(dir);
    totalCleaned += cleaned;
    console.log(`✅ Cleaned ${cleaned} files from ${dir}\n`);
  }
  
  console.log(`🎉 Cleanup complete!`);
  console.log(`📊 Total files removed: ${totalCleaned}`);
  
  if (totalCleaned > 0) {
    console.log('\n💡 Tip: Use "npm run build:with-images" only when you need to regenerate optimized images.');
  }
};

// Run cleanup
cleanupImages()
  .catch(error => {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  });