'use client';
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8nChatWidget = () => {
  useEffect(() => {
    const webhookUrl =
      process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK ||
      'https://mentorn8n-e0f02b9eb5c1.herokuapp.com/webhook/5e767a5d-ee39-4a2f-8581-ca8b8fd23f73/chat';
    createChat({
      webhookUrl,
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
      target: '#n8n-chat', // Opcional: selector donde se monta el chat
      mode: 'window', // 'window' o 'embed'
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      initialMessages: ['¡Hola! 👋', 'Soy Nathan. ¿En qué puedo ayudarte hoy?'],

      enableStreaming: false,
    });
  }, []);

  return <div id="n8n-chat" />; // El chat se monta aquí si usas target
};

export default N8nChatWidget;
