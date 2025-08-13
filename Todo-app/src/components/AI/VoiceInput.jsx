// src/components/VoiceInputBox.jsx
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

          // Add a task to UI: you can choose reply or original spoken text
          if (typeof onAddTask === 'function') {
            // heuristic: if reply contains instruction "your task is: ..." you might parse it.
            onAddTask(spoken); // or use reply if you prefer
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
        className={`w-full py-2 rounded ${listening ? 'bg-red-500' : 'bg-green-600'} text-white mb-2`}
      >
        {listening ? 'Listening...' : 'Start Voice Input'}
      </button>

      <div className="border border-gray-300 p-2 rounded min-h-[40px]">
        {transcript || 'Your voice input will appear here...'}
      </div>
    </div>
  );
};

export default VoiceInputBox;
