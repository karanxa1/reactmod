import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import './ToastNotification.css';

const Toast = ({ 
  id,
  type = 'info', 
  title, 
  message, 
  duration = 5000,
  position = 'top-right',
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(id), 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <AlertCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      default: return <Info size={20} />;
    }
  };

  const getPositionVariants = () => {
    switch (position) {
      case 'top-left':
        return {
          initial: { x: -300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      case 'top-right':
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 }
        };
      case 'bottom-left':
        return {
          initial: { x: -300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      case 'bottom-right':
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 }
        };
      case 'top-center':
        return {
          initial: { y: -100, opacity: 0, scale: 0.8 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -100, opacity: 0, scale: 0.8 }
        };
      case 'bottom-center':
        return {
          initial: { y: 100, opacity: 0, scale: 0.8 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: 100, opacity: 0, scale: 0.8 }
        };
      default:
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 }
        };
    }
  };

  const variants = getPositionVariants();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`toast toast-${type}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="toast-icon">
            {getIcon()}
          </div>
          <div className="toast-content">
            {title && <div className="toast-title">{title}</div>}
            <div className="toast-message">{message}</div>
          </div>
          <motion.button
            className="toast-close"
            onClick={handleClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
          <motion.div
            className="toast-progress"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ToastContainer = ({ position = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Expose addToast function globally
  useEffect(() => {
    window.showToast = addToast;
    return () => {
      delete window.showToast;
    };
  }, []);

  return (
    <div className={`toast-container toast-position-${position}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              position={position}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Helper functions for easy toast usage
const showToast = {
  success: (message, title, options = {}) => {
    if (window.showToast) {
      window.showToast({ type: 'success', title, message, ...options });
    }
  },
  error: (message, title, options = {}) => {
    if (window.showToast) {
      window.showToast({ type: 'error', title, message, ...options });
    }
  },
  warning: (message, title, options = {}) => {
    if (window.showToast) {
      window.showToast({ type: 'warning', title, message, ...options });
    }
  },
  info: (message, title, options = {}) => {
    if (window.showToast) {
      window.showToast({ type: 'info', title, message, ...options });
    }
  }
};

export { Toast, ToastContainer, showToast };
export default ToastContainer; 