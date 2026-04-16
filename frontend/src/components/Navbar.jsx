import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/20 dark:border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-500 font-bold text-xl tracking-tight">
            <BrainCircuit className="w-8 h-8" />
            <span>AI StudyPlanner</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/create" className="hidden sm:block text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  New Roadmap
                </Link>
                <div className="flex items-center space-x-3 border-l border-slate-300 dark:border-slate-700 pl-4">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-3 py-2">Login</Link>
                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
