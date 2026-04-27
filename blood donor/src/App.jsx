import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HospitalFinder from './components/HospitalFinder';
import RewardsDashboard from './components/RewardsDashboard';
import SignInModal from './components/SignInModal';
import AIMatchFinder from './components/AIMatchFinder';
import Leaderboard from './components/Leaderboard';
import SuccessStories from './components/SuccessStories';
import LiveImpact from './components/LiveImpact';
import DonorRegistration from './components/DonorRegistration';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <LiveImpact />
            <div id="ai-match">
              <AIMatchFinder />
            </div>
            <div id="leaderboard">
              <Leaderboard />
            </div>
            <SuccessStories />
          </>
        );
      case 'hospitals':
        return <HospitalFinder />;
      case 'rewards':
        return <RewardsDashboard user={user} onOpenSignIn={() => setIsSignInModalOpen(true)} />;
      case 'aimatch':
        return <AIMatchFinder />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-primary-500/30 selection:text-primary-200">
      <Navbar 
        onNavigate={setCurrentPage} 
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        user={user}
        onSignOut={handleSignOut}
      />
      
      <main className="relative pt-16">
        {/* Abstract Background Shapes */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary-900/10 blur-[120px] rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-money-900/10 blur-[150px] rounded-full opacity-50"></div>
        </div>

        {renderPage()}
      </main>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />

      <DonorRegistration
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      <footer className="bg-slate-900/50 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex items-center">
              <div className="p-2 bg-primary-600 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white fill-white">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary-500 to-money-500 bg-clip-text text-transparent">
                BloodGold
              </span>
            </div>
            
            <div className="flex space-x-12">
              <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Platform</h4>
                <ul className="space-y-2 text-slate-500 text-sm font-medium">
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">How it Works</li>
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">Safety Protocols</li>
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">Incentives</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Company</h4>
                <ul className="space-y-2 text-slate-500 text-sm font-medium">
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">Partners</li>
                  <li className="hover:text-primary-400 cursor-pointer transition-colors">Contact</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 max-w-sm">
              <p className="text-slate-300 text-sm font-medium mb-4">
                Join our newsletter for updates on donation camps and bonus reward events.
              </p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none flex-1"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs font-bold uppercase tracking-widest">
            <p>© 2026 BloodGold Technologies Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
