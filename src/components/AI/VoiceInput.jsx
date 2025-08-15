// src/components/AI/VoiceInput.jsx
import React, { useState } from 'react';
import axios from 'axios';

const VoiceInputBox = ({ onAddTask }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser. Use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);

      try {
        const res = await axios.post('http://localhost:5000/api/ai/voice', { text: spoken });
        if (res.data?.success) {
          const reply = res.data.reply;

          // Play reply with browser TTS
          const utter = new SpeechSynthesisUtterance(reply);
          utter.lang = 'en-US';
          window.speechSynthesis.speak(utter);

          // Add the task to UI
          if (typeof onAddTask === 'function') {
            onAddTask(spoken);
          }
        } else {
          alert('AI returned error: ' + (res.data?.error || 'unknown'));
        }
      } catch (err) {
        console.error('AI call failed:', err);
        alert('AI call failed. See console.');
      }
    };

    recognition.start();
  };

  return (
    <div>
      <button
        onClick={startListening}
        className={`
          w-full py-3 rounded-2xl text-white font-bold mb-4
          ${listening ? 'bg-green-500 animate-pulse shadow-lg shadow-green-400/50' : 'bg-green-600 hover:bg-green-700'}
          transition-all duration-300
        `}
      >
        {listening ? 'Listening...' : 'Start Voice Input'}
      </button>

      <div className="border-2 border-green-400 p-3 rounded-xl min-h-[50px] bg-green-50 text-green-800 animate-fade-in">
        {transcript || 'Your voice input will appear here...'}
      </div>
    </div>
  );
};

export default VoiceInputBox;
