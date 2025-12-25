
import React, { useState } from 'react';
import { suggestBuild } from '../services/geminiService';
import { AIGeneratedStats } from '../types';

interface AIGeneratorProps {
  onGenerate: (build: AIGeneratedStats) => void;
  firstMastery: string;
  secondMastery: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
);

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onGenerate, firstMastery, secondMastery }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await suggestBuild(prompt, firstMastery, secondMastery);
      onGenerate(result);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 my-16 shadow-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-indigo-600 p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <label htmlFor="ai-prompt" className="text-3xl font-title text-white tracking-tighter uppercase">
            Neural Architect
        </label>
      </div>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8 max-w-lg leading-relaxed">Specify combat objectives for algorithmic stat synthesis.</p>
      
      <div className="relative">
        <input
          id="ai-prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ENTER PLAYSTYLE PARAMETERS..."
          className="w-full bg-black border border-zinc-800 rounded-none px-6 py-5 pr-40 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-zinc-700 font-bold"
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-black px-8 rounded-none transition-all flex items-center gap-3 uppercase text-xs tracking-widest"
        >
          {isLoading ? <LoadingSpinner /> : 'Synthesize'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4 text-[10px] font-black uppercase tracking-widest bg-red-950/20 px-4 py-3 border-l-2 border-red-600 inline-block">{error}</p>}
    </div>
  );
};
