'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form
      className="fixed bottom-0 left-0 right-0 z-10 px-5 py-3 bg-white max-w-[560px] mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex items-center space-x-2 w-full">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="오픈톡에 참여해보세요"
          containerClassName="bg-gray-100"
        />
        <button
          type="submit"
          className="rounded-full bg-primary w-10 min-w-10 h-10 min-h-10 flex items-center justify-center"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
};
