import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, PlusCircle, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const res = await axios.get('/api/roadmap');
      setRoadmaps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div></div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><LayoutDashboard className="text-primary-500" /> My Study Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your progress and stay consistent</p>
        </div>
        <Link to="/create" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-1">
          <PlusCircle className="w-5 h-5"/> Generate New AI Plan
        </Link>
      </div>

      {roadmaps.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 glass-panel rounded-2xl"
        >
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-primary-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No upskilling plans yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Create your first AI-generated DSA roadmap to get started.</p>
          <Link to="/create" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Create One Now &rarr;</Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((r, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={r._id} 
              className="glass-panel p-6 rounded-2xl hover:border-primary-500/50 hover:shadow-primary-500/10 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              
              <h3 className="text-xl font-bold mb-2 pr-8">{r.goal}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{new Date(r.createdAt).toLocaleDateString()}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium flex items-center gap-1"><TrendingUp className="w-4 h-4 text-emerald-500" /> Progress</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">{r.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${r.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-primary-400 to-primary-600 h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </div>
              
              <Link to={`/roadmap/${r._id}`} className="block w-full py-2.5 text-center border-2 border-primary-100 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-lg text-primary-600 dark:text-primary-400 font-medium transition-colors">
                View Roadmap
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
