// src/components/AI/VoiceInputBox.jsx
import React, { useState } from 'react';
import axios from 'axios';

const VoiceInputBox = ({ tasks, setTasks }) => {
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
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onerror = (e) => {
      setListening(false);
      if (e.error === 'no-speech') {
        console.warn('No speech detected. Retrying...');
        setTimeout(() => startListening(), 500); // retry automatically
      } else {
        console.error('Speech recognition error:', e.error);
        alert(`Speech recognition error: ${e.error}`);
      }
    };

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript.trim();
      setTranscript(spoken);

      if (!spoken) {
        console.warn('Empty speech detected. Retrying...');
        setTimeout(() => startListening(), 500);
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/ai/voice', { text: spoken });
        if (res.data?.success) {
          const reply = res.data.reply;

          // Update tasks: parse numbered tasks from Gemini response
          const newTasks = reply
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && /^\d+\./.test(line)) // lines starting with numbers
            .map(line => line.replace(/^\d+\.\s*/, ''));

          if (newTasks.length > 0) {
            setTasks(prev => [...prev, ...newTasks]);
          }

          // Play Gemini reply via browser TTS
          const utter = new SpeechSynthesisUtterance(reply);
          utter.lang = 'en-US';
          window.speechSynthesis.speak(utter);
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
        className={`w-full py-2 rounded-lg font-semibold text-white mb-2
          transition-transform duration-300 transform hover:scale-105 active:scale-95
          ${listening ? 'bg-red-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {listening ? 'Listening...' : 'Start Voice Input'}
      </button>

      <div className="border border-gray-300 p-2 rounded min-h-[40px] bg-gray-50">
        {transcript || 'Your voice input will appear here...'}
      </div>
    </div>
  );
};

export default VoiceInputBox;
