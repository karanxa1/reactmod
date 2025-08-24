import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link2, Check } from 'lucide-react';
import './SocialShare.css';

const SocialShare = ({ 
  url = window.location.href, 
  title = document.title, 
  description = '', 
  image = '',
  hashtags = '',
  className = '',
  showLabel = true,
  size = 'medium',
  variant = 'default'
}) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Encode URL components for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = encodeURIComponent(image);
  const encodedHashtags = encodeURIComponent(hashtags);

  // Social sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`
  };

  // Handle native sharing (Web Share API)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copy link
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Failed to copy link:', error);
    }
  };

  // Open share URL in new window
  const openShareWindow = (shareUrl) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      shareUrl,
      'share',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: shareUrls.facebook,
      color: '#1877F2',
      className: 'facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareUrls.twitter,
      color: '#1DA1F2',
      className: 'twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareUrls.linkedin,
      color: '#0A66C2',
      className: 'linkedin'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: shareUrls.telegram,
      color: '#0088CC',
      className: 'telegram'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: shareUrls.whatsapp,
      color: '#25D366',
      className: 'whatsapp'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`social-share-compact ${className}`}>
        <button 
          className="share-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
          title="Share this content"
        >
          <Share2 size={size === 'small' ? 16 : 20} />
          {showLabel && <span>Share</span>}
        </button>
        
        {isOpen && (
          <div className="share-dropdown">
            <div className="share-options">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <button
                    key={platform.name}
                    className={`share-option ${platform.className}`}
                    onClick={() => {
                      openShareWindow(platform.url);
                      setIsOpen(false);
                    }}
                    title={`Share on ${platform.name}`}
                  >
                    <IconComponent size={16} />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
              
              <button
                className="share-option copy-link"
                onClick={() => {
                  handleCopyLink();
                  setIsOpen(false);
                }}
                title="Copy link"
              >
                {copied ? <Check size={16} /> : <Link2 size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`social-share ${size} ${variant} ${className}`}>
      {showLabel && (
        <h3 className="share-title">
          <Share2 size={20} />
          Share this content
        </h3>
      )}
      
      <div className="share-buttons">
        {/* Native Share Button (Mobile) */}
        {navigator.share && (
          <button
            className="share-btn native-share"
            onClick={handleNativeShare}
            title="Share via device"
          >
            <Share2 size={size === 'small' ? 16 : 20} />
            <span>Share</span>
          </button>
        )}
        
        {/* Social Platform Buttons */}
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <button
              key={platform.name}
              className={`share-btn ${platform.className}`}
              onClick={() => openShareWindow(platform.url)}
              title={`Share on ${platform.name}`}
              style={{ '--platform-color': platform.color }}
            >
              <IconComponent size={size === 'small' ? 16 : 20} />
              <span>{platform.name}</span>
            </button>
          );
        })}
        
        {/* Copy Link Button */}
        <button
          className={`share-btn copy-link ${copied ? 'copied' : ''}`}
          onClick={handleCopyLink}
          title="Copy link to clipboard"
        >
          {copied ? <Check size={size === 'small' ? 16 : 20} /> : <Link2 size={size === 'small' ? 16 : 20} />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;