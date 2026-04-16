import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Clock, BarChart2, BookOpen, AlertTriangle } from 'lucide-react';

const ALL_TOPICS = [
  'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue',
  'Recursion', 'Dynamic Programming', 'Trees', 'Graphs',
  'Greedy', 'Backtracking'
];

const CreateRoadmap = () => {
  const [duration, setDuration] = useState(15);
  const [difficulty, setDifficulty] = useState('Beginner');
  const [mode, setMode] = useState('ALL'); 
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
      if (weakTopics.includes(topic)) {
        setWeakTopics(weakTopics.filter(t => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleWeakTopicToggle = (topic) => {
    if (weakTopics.includes(topic)) {
      setWeakTopics(weakTopics.filter(t => t !== topic));
    } else {
      setWeakTopics([...weakTopics, topic]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'CUSTOM' && selectedTopics.length === 0) {
      setError('Please select at least one topic.');
      return;
    }
    
    console.log({ mode, selectedTopics });
    
    setLoading(true);
    setError('');
    
    const payload = {
      duration,
      difficulty,
      mode,
      topics: selectedTopics,
      weakTopics
    };
    
    try {
      const res = await axios.post('/api/roadmap/generate', payload);
      navigate(`/roadmap/${res.data.roadmap._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate roadmap');
      setLoading(false);
    }
  };

  const availableForWeak = mode === 'ALL' ? ALL_TOPICS : selectedTopics;

  return (
    <div className="max-w-3xl mx-auto mt-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 sm:p-10 rounded-3xl"
      >
        <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Dynamic DSA Study Planner</h2>
            <p className="text-slate-500 dark:text-slate-400">Configure your learning constraints and let AI tailor the perfect path.</p>
          </div>
        </div>
        
        {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-blue-500" /> Duration (Days)
              </label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-bg border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-0 transition-all shadow-inner"
              >
                <option value={7}>7 Days (Crash Course)</option>
                <option value={15}>15 Days (Quick Prep)</option>
                <option value={30}>30 Days (Standard Prep)</option>
                <option value={60}>60 Days (Deep Dive)</option>
                <option value={90}>90 Days (Mastery)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <BarChart2 className="w-4 h-4 text-emerald-500" /> Difficulty Level
              </label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-bg border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-0 transition-all shadow-inner"
              >
                <option value="Beginner">Beginner (Focus on fundamentals)</option>
                <option value="Intermediate">Intermediate (Medium complexity)</option>
                <option value="Advanced">Advanced (Hard & Optimization)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-purple-500" /> Select Topics
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMode('ALL')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-colors ${mode === 'ALL' ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-300'}`}
              >
                All DSA Topics
              </button>
              <button
                type="button"
                onClick={() => setMode('CUSTOM')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-colors ${mode === 'CUSTOM' ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-300'}`}
              >
                Custom Selection
              </button>
            </div>

            <AnimatePresence>
              {mode === 'CUSTOM' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex flex-wrap gap-2">
                    {ALL_TOPICS.map(topic => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicToggle(topic)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTopics.includes(topic) ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Mark Weak Topics (Optional)
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">Select topics you struggle with. AI will allocate more days and easier practice curve for these.</p>
            <div className="flex flex-wrap gap-2">
              {availableForWeak.length === 0 ? (
                <span className="text-sm text-slate-500 italic">Select topics first to mark weaknesses.</span>
              ) : (
                availableForWeak.map(topic => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleWeakTopicToggle(topic)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${weakTopics.includes(topic) ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-800/50'}`}
                  >
                    {topic}
                  </button>
                ))
              )}
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div> Crafting your perfect plan...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate DSA Roadmap <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateRoadmap;
