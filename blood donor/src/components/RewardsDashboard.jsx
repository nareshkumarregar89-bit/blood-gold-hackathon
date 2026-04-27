import React from 'react';
import { Wallet, TrendingUp, Calendar, CreditCard, Gift, ArrowRight, History, LogIn } from 'lucide-react';

const RewardsDashboard = ({ user, onOpenSignIn }) => {
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-[3rem] max-w-2xl mx-auto backdrop-blur-sm">
          <div className="w-20 h-20 bg-primary-950/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Wallet className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Access Your Rewards</h2>
          <p className="text-slate-400 text-lg mb-10">
            Please sign in to view your lifetime earnings, donation history, and available rewards.
          </p>
          <button 
            onClick={onOpenSignIn}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center mx-auto group"
          >
            Sign In Now
            <LogIn className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  const transactions = [
    { id: 1, type: 'Donation Reward', amount: '+₹500.00', date: 'Oct 15, 2023', status: 'Completed' },
    { id: 2, type: 'Bonus Incentive', amount: '+₹150.00', date: 'Oct 15, 2023', status: 'Completed' },
    { id: 3, type: 'Bank Withdrawal', amount: '-₹400.00', date: 'Oct 10, 2023', status: 'Pending' },
    { id: 4, type: 'Referral Bonus', amount: '+₹250.00', date: 'Sep 28, 2023', status: 'Completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center">
          <Wallet className="mr-3 text-money-500" />
          Donor Rewards Dashboard
        </h2>
        <p className="text-slate-400 text-lg">
          Track your contributions and manage your earned incentives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-money-600 to-money-900 p-8 rounded-[2.5rem] shadow-2xl shadow-money-900/20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <p className="text-money-100 text-sm font-bold uppercase tracking-widest mb-2">Available Balance</p>
            <h3 className="text-5xl font-black mb-6">₹1,250.50</h3>
            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-money-700 font-bold py-3 rounded-2xl hover:bg-money-50 transition-colors flex items-center justify-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Withdraw
              </button>
              <button className="px-4 bg-money-800/50 text-white rounded-2xl border border-money-500/50 hover:bg-money-800 transition-colors">
                <Gift className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center space-x-4">
            <div className="p-4 bg-primary-950/30 rounded-2xl">
              <Calendar className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Next Donation Eligibility</p>
              <h4 className="text-xl font-bold text-white">Nov 24, 2023</h4>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center space-x-4">
            <div className="p-4 bg-money-950/30 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-money-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Lifetime Earnings</p>
              <h4 className="text-xl font-bold text-white">₹14,500.00</h4>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center space-x-4">
            <div className="p-4 bg-blue-950/30 rounded-2xl">
              <Heart className="w-8 h-8 text-blue-500 fill-blue-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Donations</p>
              <h4 className="text-xl font-bold text-white">12 Pints</h4>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center space-x-4">
            <div className="p-4 bg-purple-950/30 rounded-2xl">
              <Gift className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Referral Credits</p>
              <h4 className="text-xl font-bold text-white">3 Available</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <History className="mr-3 text-slate-500" />
            Recent Activity
          </h3>
          <button className="text-primary-500 font-bold flex items-center hover:text-primary-400 transition-colors">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-2xl transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${tx.amount.startsWith('+') ? 'bg-money-950/30 text-money-500' : 'bg-red-950/30 text-red-500'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{tx.type}</h4>
                    <p className="text-slate-500 text-sm">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${tx.amount.startsWith('+') ? 'text-money-400' : 'text-white'}`}>
                    {tx.amount}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${tx.status === 'Completed' ? 'text-money-600' : 'text-amber-600'}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Heart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

export default RewardsDashboard;
