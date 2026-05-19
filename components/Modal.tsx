import React, { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, MotionButton, m } from './Motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <m.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <m.div
            ref={dialogRef}
            tabIndex={-1}
            className="relative bg-surface-1 border border-emphasis rounded-lg w-full max-w-lg overflow-hidden outline-none"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-DEFAULT">
              <h3 id="modal-title" className="text-lg font-semibold text-text-1 tracking-tight">
                {title || 'Solicitud'}
              </h3>
              <MotionButton
                onClick={onClose}
                aria-label="Cerrar diálogo"
                className="text-text-3 hover:text-copper p-1 rounded focus-visible:outline-copper"
              >
                <X size={20} />
              </MotionButton>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
