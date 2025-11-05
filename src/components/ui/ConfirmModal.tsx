'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <XCircle className="w-12 h-12 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-400" />;
      case 'info':
      default:
        return <Info className="w-12 h-12 text-blue-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'from-red-600 to-red-500',
          border: 'border-red-500/50',
          button: 'bg-red-600 hover:bg-red-700',
        };
      case 'warning':
        return {
          bg: 'from-yellow-600 to-orange-500',
          border: 'border-yellow-500/50',
          button: 'bg-yellow-600 hover:bg-yellow-700',
        };
      case 'success':
        return {
          bg: 'from-green-600 to-emerald-500',
          border: 'border-green-500/50',
          button: 'bg-green-600 hover:bg-green-700',
        };
      case 'info':
      default:
        return {
          bg: 'from-blue-600 to-cyan-500',
          border: 'border-blue-500/50',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md"
            >
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Gradient Header */}
                <div className={`h-1 bg-gradient-to-r ${colors.bg}`}></div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring' }}
                      className="mb-4"
                    >
                      {getIcon()}
                    </motion.div>

                    <h2 className="text-2xl font-bold text-white mb-2">
                      {title}
                    </h2>

                    <p className="text-slate-400 text-base">
                      {message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {cancelText}
                    </Button>
                    <Button
                      onClick={onConfirm}
                      className={`flex-1 ${colors.button}`}
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {confirmText}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
