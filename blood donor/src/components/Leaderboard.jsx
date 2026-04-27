import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Heart, TrendingUp, Download } from 'lucide-react';
import API_URL from '../config';

const Leaderboard = () => {
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_URL}/api/leaderboard`);
        const data = await response.json();
        // Add ranks and avatars dynamically if not present
        const rankedData = data.map((d, i) => ({
          ...d,
          rank: i + 1,
          avatar: d.name.charAt(0)
        }));
        setTopDonors(rankedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-slate-950">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-money-950/30 rounded-full mb-6 border border-money-900/50"
        >
          <Trophy className="w-8 h-8 text-money-500" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
          SAVIOUR <span className="text-money-500">LEADERBOARD</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Honoring our top contributors who are leading the way in saving lives in Jaipur.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top 3 Podium */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center">
            <Medal className="mr-2 text-primary-500" /> Top Saviours
          </h3>
          {topDonors.slice(0, 3).map((donor, index) => (
            <motion.div
              key={donor.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-[2rem] border ${index === 0 ? 'bg-money-950/20 border-money-500/50 shadow-lg shadow-money-900/10' : 'bg-slate-900/50 border-slate-800'} flex items-center justify-between group hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${index === 0 ? 'bg-money-500 text-slate-950' : index === 1 ? 'bg-slate-400 text-slate-950' : 'bg-amber-600 text-slate-950'}`}>
                  {donor.rank}
                </div>
                <div>
                  <h4 className="font-black text-white group-hover:text-money-400 transition-colors">{donor.name}</h4>
                  <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <Heart className="w-3 h-3 mr-1 text-primary-500" /> {donor.lives} Lives Saved
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-xl font-black text-white">{donor.points}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Points</div>
                <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-money-500 hover:bg-money-950/30 transition-all group/btn">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rank & Donor</th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Lives Saved</th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Activity</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {topDonors.map((donor, index) => (
                  <tr key={donor.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-slate-600 font-black w-4">{donor.rank}</span>
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-slate-300 group-hover:bg-primary-900/30 group-hover:text-primary-400 transition-all">
                          {donor.avatar}
                        </div>
                        <span className="font-bold text-white group-hover:text-primary-400 transition-colors">{donor.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-white">
                      <div className="flex items-center justify-center space-x-1">
                        <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
                        <span>{donor.lives}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center space-x-1 text-money-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-white group-hover:text-money-400 transition-colors">
                      {donor.points.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-slate-900/50 text-center">
              <button className="text-primary-500 font-black text-xs uppercase tracking-[0.2em] hover:text-primary-400 transition-colors">
                View All Time Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
