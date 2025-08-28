import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Download, AlertTriangle, Smartphone, Settings } from 'lucide-react';

import './ModAppFAQ.css';

const ModAppFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      category: 'Installation & Safety',
      icon: Shield,
      questions: [
        {
          question: 'How to install Instagram mod apk safely?',
          answer: 'To install Instagram mod apk safely: 1) Download from trusted sources like MODZY, 2) Enable "Unknown Sources" in Android settings, 3) Uninstall original Instagram first, 4) Install the mod apk file, 5) Grant necessary permissions. Always scan files with antivirus before installation.',
          keywords: 'Instagram mod apk installation, safe Instagram mod, how to install Instagram mod'
        },
        {
          question: 'Are mod apk files safe to download?',
          answer: 'Mod apk files from reputable sources like MODZY are generally safe. We scan all files for malware and viruses. However, always download from trusted mod apk sites, avoid suspicious sources, and use antivirus protection on your device.',
          keywords: 'safe mod apk sites, mod apk safety, trusted mod downloads'
        },
        {
          question: 'Which are the best mod apk sites for safe downloads in 2025?',
          answer: 'MODZY ranks among the top mod apk sites for 2025, offering verified downloads of Instagram mod apk, Telegram mod apk, WhatsApp mod apk, and educational mod apps like Brainly mod apk and Photomath mod apk. We provide malware-free mod apk downloads with regular updates and 24/7 community support.',
          keywords: 'best mod apk sites 2025, safe mod apk download, top mod apps sites, trusted mod apk sites'
        },
        {
          question: 'How to download Instagram mod apk latest version safely?',
          answer: 'To download Instagram mod apk latest version safely: 1) Visit MODZY mod apps site, 2) Find Instagram mod apk in our verified collection, 3) Check app details and version info, 4) Download from our secure servers, 5) Follow installation guide. All Instagram mod apk files are scanned for safety.',
          keywords: 'Instagram mod apk latest version, Instagram mod apk download, Instagram mod apk 2025'
        }
      ]
    },
    {
      id: 2,
      category: 'Instagram Mods',
      icon: Smartphone,
      questions: [
        {
          question: 'What features does Instagram mod apk offer?',
          answer: 'Instagram mod apk includes: story downloader, reels downloader, no ads experience, hide online status, copy captions, zoom profile pictures, download photos/videos, privacy mode, and premium themes. All features work without root access.',
          keywords: 'Instagram mod apk features, Instagram mod premium, Instagram story downloader'
        },
        {
          question: 'Will Instagram mod apk get my account banned?',
          answer: 'Using Instagram mod apk carries some risk of account suspension. To minimize risk: use a secondary account, avoid excessive automation, don\'t spam or violate Instagram policies, and keep the mod app updated to latest version.',
          keywords: 'Instagram mod ban risk, Instagram mod account safety, Instagram mod apk ban'
        },
        {
          question: 'How to update Instagram mod apk to latest version?',
          answer: 'To update Instagram mod apk: 1) Download latest version from MODZY, 2) Uninstall current mod version, 3) Install new apk file, 4) Login with your credentials. Your data and settings will be preserved in most cases.',
          keywords: 'Instagram mod apk update, latest Instagram mod version, Instagram mod 2025'
        }
      ]
    },
    {
      id: 3,
      category: 'Telegram Mods',
      icon: Download,
      questions: [
        {
          question: 'What are the benefits of Telegram mod apk?',
          answer: 'Telegram mod apk offers: multiple account support, extra themes and customization, privacy lock with fingerprint, secret chat enhancements, unlimited file sharing, advanced message scheduling, and premium features unlocked.',
          keywords: 'Telegram mod apk benefits, Telegram mod features, Telegram premium mod'
        },
        {
          question: 'Is Telegram mod apk better than official Telegram?',
          answer: 'Telegram mod apk provides additional features not available in official app like multiple accounts, enhanced privacy controls, and custom themes. However, official Telegram offers better security updates and official support.',
          keywords: 'Telegram mod vs official, best Telegram mod 2025, Telegram mod comparison'
        },
        {
          question: 'How to use multiple accounts in Telegram mod?',
          answer: 'Telegram mod apk allows multiple accounts: 1) Install Telegram mod from MODZY, 2) Login with first account, 3) Go to Settings > Add Account, 4) Login with second account, 5) Switch between accounts using the account switcher in sidebar.',
          keywords: 'Telegram mod multiple accounts, Telegram multi-account setup, Telegram mod accounts'
        }
      ]
    },
    {
      id: 4,
      category: 'Educational Mods',
      icon: HelpCircle,
      questions: [
        {
          question: 'Which educational mod apps are available?',
          answer: 'Popular educational mod apps include: Brainly mod apk (premium unlocked), Photomath mod apk (no ads), Duolingo mod apk (lifetime premium), Physics Wallah mod apk, Khan Academy mod, and various exam prep mod apps with premium features unlocked.',
          keywords: 'educational mod apps, Brainly mod apk, Photomath mod apk, Duolingo mod premium'
        },
        {
          question: 'How does Brainly mod apk premium unlocked work?',
          answer: 'Brainly mod apk premium unlocked provides: unlimited question asking, access to expert answers, no ads, offline access to solutions, priority support, and advanced search features. Perfect for students needing homework help.',
          keywords: 'Brainly mod apk premium unlocked, Brainly mod features, Brainly premium free'
        },
        {
          question: 'How to download Brainly mod apk premium unlocked for free?',
          answer: 'Download Brainly mod apk premium unlocked from MODZY: 1) Visit our educational mod apps section, 2) Find Brainly mod apk with premium features unlocked, 3) Download the latest version, 4) Install following our safety guide. Get unlimited answers, no ads, and premium features for free.',
          keywords: 'Brainly mod apk premium unlocked, Brainly mod apk download, Brainly premium free'
        },
        {
          question: 'Is Photomath mod apk available with all premium features unlocked?',
          answer: 'Yes, Photomath mod apk with premium features unlocked is available on MODZY. Get step-by-step solutions, advanced calculator features, no ads, and unlimited problem solving. Download Photomath mod apk from our verified educational mod apps collection.',
          keywords: 'Photomath mod apk premium unlocked, Photomath mod apk download, math solver mod apk'
        },
        {
          question: 'Where to download Duolingo mod apk with lifetime premium unlocked?',
          answer: 'Download Duolingo mod apk with lifetime premium unlocked from MODZY educational section. Get unlimited hearts, no ads, offline lessons, progress tracking, and all premium features free. Our Duolingo mod apk is regularly updated and virus-free.',
          keywords: 'Duolingo mod apk premium unlocked, Duolingo mod apk download, language learning mod apps'
        }
      ]
    },
    {
      id: 5,
      category: 'Troubleshooting',
      icon: AlertTriangle,
      questions: [
        {
          question: 'Why is my mod app crashing or not working?',
          answer: 'Common solutions for mod app crashes: 1) Clear app cache and data, 2) Restart your device, 3) Ensure sufficient storage space, 4) Update to latest mod version, 5) Check Android version compatibility, 6) Reinstall the mod app.',
          keywords: 'mod app crashing, fix mod app issues, mod app troubleshooting'
        },
        {
          question: 'How to fix "App not installed" error for mod apk?',
          answer: 'To fix installation errors: 1) Enable "Install from Unknown Sources", 2) Clear Google Play Store cache, 3) Uninstall original app first, 4) Check available storage space, 5) Ensure apk file is not corrupted, 6) Try installing in safe mode.',
          keywords: 'mod apk installation error, app not installed fix, mod apk install issues'
        },
        {
          question: 'What to do if mod app asks for suspicious permissions?',
          answer: 'If mod app requests suspicious permissions: 1) Don\'t grant unnecessary permissions, 2) Research the app thoroughly, 3) Download only from trusted sources like MODZY, 4) Use permission manager to control access, 5) Consider using app in restricted mode.',
          keywords: 'mod app permissions, mod apk security, safe mod app usage'
        }
      ]
    },
    {
      id: 6,
      category: 'General Questions',
      icon: Settings,
      questions: [
        {
          question: 'What\'s the difference between mod apps and original apps?',
          answer: 'Mod apps are modified versions of original apps with additional features like premium unlocked, no ads, extra customization options, and enhanced functionality. Original apps are official versions from developers with standard features.',
          keywords: 'mod apps vs original apps, what are mod apps, mod apk benefits'
        },
        {
          question: 'Do mod apps receive regular updates?',
          answer: 'Yes, popular mod apps like Instagram mod apk, Telegram mod apk receive regular updates on MODZY. We update mods when new original app versions release, ensuring compatibility and new features.',
          keywords: 'mod app updates, latest mod apps 2025, mod apk new versions'
        },
        {
          question: 'Can I use mod apps without rooting my Android device?',
          answer: 'Yes, most mod apps including Instagram mod apk, Telegram mod apk, and educational mod apps work without root access. Simply enable "Unknown Sources" in settings and install the apk file normally.',
          keywords: 'mod apps without root, non-root mod apk, mod apps no root required'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryId, questionIndex) => {
    const faqKey = `${categoryId}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqKey ? null : faqKey);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="mod-faq" className="mod-faq-section">
      <div className="container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="faq-title">
            <HelpCircle className="title-icon" />
            Mod Apps FAQ - Everything You Need to Know
          </h2>
          <p className="faq-subtitle">
            Get answers to common questions about Instagram mod apk, Telegram mod apk, 
            educational mod apps, and safe mod apk downloads. Learn how to install and use mod apps safely.
          </p>
        </motion.div>

        <motion.div
          className="faq-categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqData.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <React.Fragment key={category.id}>
                <motion.div
                  className="faq-category"
                  variants={itemVariants}
                >

                <div className="category-header">
                  <div className="category-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="category-title">{category.category}</h3>
                </div>

                <div className="faq-questions">
                  {category.questions.map((faq, index) => {
                    const faqKey = `${category.id}-${index}`;
                    const isOpen = openFAQ === faqKey;

                    return (
                      <div key={index} className="faq-item">
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(category.id, index)}
                          aria-expanded={isOpen}
                        >
                          <span className="question-text">{faq.question}</span>
                          <span className="question-icon">
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className="faq-answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="answer-content">
                                <p>{faq.answer}</p>
                                <div className="answer-keywords">
                                  <small><strong>Related:</strong> {faq.keywords}</small>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* Additional SEO Content */}
        <motion.div
          className="faq-seo-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h4>Why Choose MODZY for Mod Apps Download?</h4>
          <div className="seo-grid">
            <div className="seo-item">
              <Shield className="seo-icon" />
              <h5>Safe & Verified</h5>
              <p>All mod apk files are scanned for malware and verified for safety before upload.</p>
            </div>
            <div className="seo-item">
              <Download className="seo-icon" />
              <h5>Latest Versions</h5>
              <p>Get the newest Instagram mod apk, Telegram mod apk, and educational mod apps.</p>
            </div>
            <div className="seo-item">
              <HelpCircle className="seo-icon" />
              <h5>24/7 Support</h5>
              <p>Community support for installation help and troubleshooting mod app issues.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModAppFAQ;