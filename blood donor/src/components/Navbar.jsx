import React, { useState } from 'react';
import { Heart, Wallet, MapPin, User, LogIn, LogOut, ChevronDown, Brain, Trophy, UserPlus } from 'lucide-react';

const Navbar = ({ onNavigate, onOpenSignIn, onOpenRegister, user, onSignOut }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Heart className="h-8 w-8 text-primary-500 fill-primary-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-500 to-money-500 bg-clip-text text-transparent">
              BloodGold
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => onNavigate('home')}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('hospitals')}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Find Hospitals
              </button>
              <button 
                onClick={() => onNavigate('aimatch')}
                className="px-3 py-2 rounded-md text-sm font-medium text-primary-400 hover:text-primary-300 hover:bg-primary-950/20 transition-colors flex items-center"
              >
                <Brain className="w-4 h-4 mr-1" />
                AI Match
              </button>
              <button 
                onClick={() => onNavigate('leaderboard')}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center"
              >
                <Trophy className="w-4 h-4 mr-1 text-money-500" />
                Leaderboard
              </button>
              <button 
                onClick={() => onNavigate('rewards')}
                className="px-3 py-2 rounded-md text-sm font-medium text-money-400 hover:text-money-300 hover:bg-money-900/20 transition-colors flex items-center"
              >
                <Wallet className="w-4 h-4 mr-1" />
                Earn Rewards
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 overflow-hidden">
                    <button 
                      onClick={() => { onNavigate('rewards'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>
                    <button 
                      onClick={() => { onSignOut(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onOpenRegister}
                  className="hidden sm:flex bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm font-medium transition-colors items-center border border-slate-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </button>
                <button 
                  onClick={onOpenSignIn}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center shadow-lg shadow-primary-900/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
