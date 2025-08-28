const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script
 * Generates WebP and AVIF versions of images in multiple sizes
 */

const INPUT_DIRS = ['./public', './src'];
const SIZES = [640, 1024]; // Essential responsive breakpoints only
const FORMATS = [
  { ext: 'webp', options: { quality: 85 } } // WebP only for better build performance
];

// Image file extensions to process
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png)$/i;

/**
 * Get all image files from directories
 */
const getImageFiles = (dirs) => {
  const imageFiles = [];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} does not exist, skipping...`);
      return;
    }
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (IMAGE_EXTENSIONS.test(file)) {
        imageFiles.push({
          inputPath: path.join(dir, file),
          outputDir: dir,
          filename: file,
          baseName: path.parse(file).name
        });
      }
    });
  });
  
  return imageFiles;
};

/**
 * Optimize a single image
 */
const optimizeImage = async (imageFile, size, format) => {
  const { inputPath, outputDir, baseName } = imageFile;
  const outputFilename = `${baseName}_${size}w.${format.ext}`;
  const outputPath = path.join(outputDir, outputFilename);
  
  try {
    // Skip if output file already exists and is newer than input
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`⏭️  Skipping ${outputFilename} (already up to date)`);
        return;
      }
    }
    
    await sharp(inputPath)
      .resize(size, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFormat(format.ext, format.options)
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`✅ Generated ${outputFilename} (${savings}% smaller)`);
  } catch (error) {
    console.error(`❌ Error processing ${outputFilename}:`, error.message);
  }
};

/**
 * Generate responsive versions of original format
 */
const generateResponsiveOriginal = async (imageFile, size) => {
  const { inputPath, outputDir, baseName, filename } = imageFile;
  const extension = path.extname(filename).substring(1);
  const outputFilename = `${baseName}_${size}w.${extension}`;
  const outputPath = path.join(outputDir, outputFilename);
  
  try {
    // Skip if output file already exists and is newer than input
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`⏭️  Skipping ${outputFilename} (already up to date)`);
        return;
      }
    }
    
    await sharp(inputPath)
      .resize(size, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(outputPath);
    
    console.log(`✅ Generated responsive ${outputFilename}`);
  } catch (error) {
    console.error(`❌ Error processing ${outputFilename}:`, error.message);
  }
};

/**
 * Main optimization function
 */
const optimizeImages = async () => {
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Processing directories: ${INPUT_DIRS.join(', ')}`);
  console.log(`📐 Generating sizes: ${SIZES.join(', ')}px`);
  console.log(`🎨 Formats: ${FORMATS.map(f => f.ext).join(', ')}`);
  console.log('\n');
  
  const imageFiles = getImageFiles(INPUT_DIRS);
  
  if (imageFiles.length === 0) {
    console.log('❌ No image files found to process.');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} image(s) to process:\n`);
  imageFiles.forEach(file => {
    console.log(`   • ${file.filename}`);
  });
  console.log('\n');
  
  let processedCount = 0;
  const totalOperations = imageFiles.length * SIZES.length * (FORMATS.length + 1); // +1 for responsive original
  
  for (const imageFile of imageFiles) {
    console.log(`🔄 Processing: ${imageFile.filename}`);
    
    for (const size of SIZES) {
      // Generate modern formats
      for (const format of FORMATS) {
        await optimizeImage(imageFile, size, format);
        processedCount++;
      }
      
      // Generate responsive version of original format
      await generateResponsiveOriginal(imageFile, size);
      processedCount++;
    }
    
    console.log(`✨ Completed: ${imageFile.filename}\n`);
  }
  
  console.log(`🎉 Image optimization complete!`);
  console.log(`📊 Processed ${processedCount}/${totalOperations} operations`);
  console.log(`\n💡 Tip: Add these optimized images to your .gitignore if they're too large for your repository.`);
};

/**
 * Generate .gitignore entries for optimized images
 */
const generateGitignoreEntries = () => {
  const entries = [];
  
  SIZES.forEach(size => {
    FORMATS.forEach(format => {
      entries.push(`*_${size}w.${format.ext}`);
    });
    entries.push(`*_${size}w.jpg`);
    entries.push(`*_${size}w.jpeg`);
    entries.push(`*_${size}w.png`);
  });
  
  console.log('\n📝 Add these entries to your .gitignore if needed:');
  console.log('# Optimized images');
  entries.forEach(entry => console.log(entry));
};

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Sharp is not installed. Please run: npm install --save-dev sharp');
  process.exit(1);
}

// Run optimization
optimizeImages()
  .then(() => {
    generateGitignoreEntries();
  })
  .catch(error => {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  });