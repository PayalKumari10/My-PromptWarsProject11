import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowLeft, Trash2, Calendar, Target, BookOpen, Code2 } from 'lucide-react';

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/roadmap/${id}`);
      console.log('API Response:', res.data);
      // Handle both formats
      const fetchedRoadmap = res.data.roadmap || res.data;
      setRoadmap(fetchedRoadmap);
    } catch (err) {
      console.error(err);
      setError("Failed to load roadmap. Please ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDayCompletion = (dayId, currentStatus) => {
    // Local optimistic UI toggle since DB saving for completion was removed
    const updatedRoadmap = { ...roadmap };
    const dayIndex = updatedRoadmap.days.findIndex(d => d._id === dayId);
    if (dayIndex !== -1) {
      updatedRoadmap.days[dayIndex].completed = !currentStatus;
      setRoadmap(updatedRoadmap);
    }
  };

  const deleteRoadmap = async () => {
    if (window.confirm('Are you sure you want to delete this study plan?')) {
      navigate('/'); // Just navigate away for now to keep it simple and clean
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading your roadmap...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-center">
        <div className="bg-red-100 text-red-500 p-4 rounded-full mb-4">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button onClick={() => navigate('/')} className="bg-primary-500 text-white px-6 py-2 rounded-xl">Go Back Home</button>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="text-center mt-32">
        <h2 className="text-2xl font-bold mb-2">Roadmap not found</h2>
        <button onClick={() => navigate('/')} className="text-primary-500 hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  // Calculate Progress locally
  const totalDays = roadmap?.days?.length || 0;
  const completedDays = roadmap?.days?.filter(d => d.completed)?.length || 0;
  const progressPercent = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      
      <div className="glass-panel p-8 rounded-3xl mb-8 relative overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="absolute -right-10 -top-10 opacity-[0.03] dark:opacity-10 pointer-events-none">
          <Target className="w-64 h-64 text-primary-500" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
              <Calendar className="w-4 h-4" /> 
              <span>Created {roadmap.createdAt ? new Date(roadmap.createdAt).toLocaleDateString() : 'Today'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
              {roadmap.topics?.length > 0 ? `${roadmap.duration} Days ${roadmap.difficulty} (${roadmap.topics.length} Topics)` : 'Your Custom DSA Roadmap'}
            </h1>
            
            <div className="flex items-center gap-4 w-full">
              <div className="w-full max-w-sm bg-slate-200 dark:bg-slate-700/50 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full"
                ></motion.div>
              </div>
              <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full text-sm">
                {progressPercent}% Done
              </span>
            </div>
          </div>
          <button onClick={deleteRoadmap} className="p-3 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-xl transition-colors shrink-0">
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {roadmap?.days?.map((day, dIdx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dIdx * 0.05 }}
            key={day._id || dIdx} 
            onClick={() => toggleDayCompletion(day._id, day.completed)}
            className={`group glass-panel rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${day.completed ? 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-800/50 dark:bg-emerald-900/10' : 'border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600'}`}
          >
            <div className={`px-6 py-4 border-b flex justify-between items-center transition-colors ${day.completed ? 'border-emerald-200/50 bg-emerald-100/50 dark:border-emerald-800/30 dark:bg-emerald-900/20' : 'border-slate-200/50 bg-slate-100/50 dark:border-slate-700/50 dark:bg-slate-800/50'}`}>
              <h3 className="font-bold text-lg flex items-center gap-3">
                <span className={`${day.completed ? 'text-emerald-600' : 'text-primary-600 dark:text-primary-400'}`}>
                  Day {day.day || dIdx + 1}
                </span> 
                <span className="text-slate-300 mx-1">•</span>
                <span className={`${day.completed ? 'text-slate-600 dark:text-slate-300 line-through' : ''}`}>
                  {day.topic || 'General Practice'}
                </span>
              </h3>
              <div>
                {day.completed ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-in zoom-in" />
                ) : (
                  <Circle className="w-7 h-7 text-slate-300 dark:text-slate-600 group-hover:text-primary-400 transition-colors" />
                )}
              </div>
            </div>
            
            <div className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${day.completed ? 'opacity-60' : 'opacity-100'}`}>
              
              {/* Concepts Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Concepts to Learn
                </h4>
                <ul className="space-y-2">
                  {day?.concepts?.length > 0 ? (
                    day.concepts.map((concept, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0"></div>
                        <span className="leading-snug">{concept}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500 italic text-sm p-3">No specific concepts mapped.</li>
                  )}
                </ul>
              </div>

              {/* Problem Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Core Practice Problem
                </h4>
                {day?.problem ? (
                  <div className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/10 dark:to-indigo-900/10 border border-primary-100 dark:border-primary-800/30 p-4 rounded-xl flex items-center gap-3">
                    <span className="font-semibold text-primary-700 dark:text-primary-300">{day.problem}</span>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50 p-4 rounded-xl text-slate-500 italic text-sm">
                    Review previously learned concepts.
                  </div>
                )}
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
      
      {(!roadmap?.days || roadmap.days.length === 0) && (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 mt-8">
          <p className="text-slate-500">No days populated in this roadmap.</p>
        </div>
      )}
    </div>
  );
};

export default RoadmapDetail;
