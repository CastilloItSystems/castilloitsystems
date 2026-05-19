import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ChatState } from '../types';
import Badge from './Badge';
import { AnimatePresence, MotionButton, m } from './Motion';

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'seed',
    role: 'model',
    text: 'Hola. Soy el asistente técnico de Castillo IT. ¿Qué necesita resolver hoy?',
  },
];

const MessageBubble = memo(({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === 'user';
  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] px-3 py-2 rounded-md text-sm leading-relaxed ${
          isUser
            ? 'bg-copper text-ink'
            : 'bg-surface-2 border border-DEFAULT text-text-1'
        }`}
      >
        {msg.text}
      </div>
    </m.div>
  );
});
MessageBubble.displayName = 'MessageBubble';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [state, setState] = useState<ChatState>(ChatState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || state === ChatState.THINKING) return;

    const userMsg: ChatMessage = { id: makeId(), role: 'user', text: trimmed };
    setInput('');
    setMessages((prev) => [...prev, userMsg]);
    setState(ChatState.THINKING);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = messages.slice(-10).map((m) => ({ role: m.role, text: m.text }));
      const response = await sendMessageToGemini(history, trimmed, controller.signal);
      if (controller.signal.aborted) return;
      setMessages((prev) => [...prev, { id: makeId(), role: 'model', text: response }]);
      setState(ChatState.IDLE);
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return;
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'model', text: 'Lo siento, ha ocurrido un error.' },
      ]);
      setState(ChatState.ERROR);
    }
  }, [input, state, messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    abortRef.current?.abort();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="ai-chat-panel"
            role="dialog"
            aria-label="Asistente Castillo IT"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-ink border border-emphasis rounded-lg flex flex-col overflow-hidden origin-bottom-right"
          >
            <div className="bg-surface-1 px-4 py-3 flex justify-between items-center border-b border-DEFAULT">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-sm text-text-1 leading-none">
                  Asistente Castillo IT
                </h3>
                <Badge variant="ok" dot pulse className="self-start">En línea</Badge>
              </div>
              <MotionButton
                onClick={handleClose}
                aria-label="Cerrar chat"
                className="text-text-3 hover:text-brand p-1"
              >
                <X size={18} />
              </MotionButton>
            </div>

            <m.div
              ref={scrollContainerRef}
              layoutScroll
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-ink"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                {state === ChatState.THINKING && (
                  <m.div
                    key="thinking"
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex justify-start"
                  >
                    <div className="bg-surface-2 border border-DEFAULT px-3 py-2 rounded-md flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-copper" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                        Procesando
                      </span>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </m.div>

            <div className="p-3 border-t border-DEFAULT bg-surface-1">
              <div className="flex items-center gap-2 bg-surface-2 border border-DEFAULT focus-within:border-copper rounded px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe tu consulta…"
                  aria-label="Mensaje"
                  className="flex-1 bg-transparent focus:outline-none text-sm text-text-1 placeholder:text-text-mute"
                  disabled={state === ChatState.THINKING}
                />
                <MotionButton
                  onClick={handleSend}
                  disabled={!input.trim() || state === ChatState.THINKING}
                  aria-label="Enviar mensaje"
                  className="text-copper hover:text-copper-hi disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </MotionButton>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <MotionButton
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
        className={`${
          isOpen
            ? 'bg-surface-2 border border-emphasis text-text-1'
            : 'bg-copper hover:bg-copper-hi text-ink'
        } p-3.5 rounded transition-colors flex items-center justify-center`}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={22} />}
      </MotionButton>
    </div>
  );
};

export default AIChat;
