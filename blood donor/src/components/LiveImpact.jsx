import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Users, Heart, ArrowUpRight, Zap } from 'lucide-react';
import API_URL from '../config';

const AnimatedCounter = ({ value }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const LiveImpact = () => {
  const [stats, setStats] = useState({
    livesSaved: 12450,
    activeDonors: 842,
    emergencyRequests: 12
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'donation', text: 'Rahul S. just donated O+ in Jaipur', time: '2m ago' },
    { id: 2, type: 'request', text: 'Emergency A- request at SMS Hospital', time: 'Just now' },
    { id: 3, type: 'match', text: 'AI matched donor for AB- request', time: '5m ago' },
  ]);

  // Fetch real-time updates from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/20 border-y border-slate-800/50 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          
          {/* Stats Section */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 group hover:border-primary-500/30 transition-all">
              <div className="flex items-center space-x-4 mb-2">
                <div className="p-2 bg-primary-950/30 rounded-lg text-primary-500">
                  <Heart className="w-5 h-5 fill-primary-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lives Saved</span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                <AnimatedCounter value={stats.livesSaved} />
              </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 group hover:border-money-500/30 transition-all">
              <div className="flex items-center space-x-4 mb-2">
                <div className="p-2 bg-money-950/30 rounded-lg text-money-500">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Donors</span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                <AnimatedCounter value={stats.activeDonors} />
              </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 group hover:border-amber-500/30 transition-all">
              <div className="flex items-center space-x-4 mb-2">
                <div className="p-2 bg-amber-950/30 rounded-lg text-amber-500">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active SOS</span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                <AnimatedCounter value={stats.emergencyRequests} />
              </div>
            </div>
          </div>

          {/* Activity Ticker */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] h-full overflow-hidden relative">
            <div className="flex items-center space-x-2 mb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
              <Activity className="w-4 h-4 text-primary-500" />
              <span>Live Activity</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping ml-auto"></span>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${activity.type === 'request' ? 'bg-red-500' : 'bg-money-500'}`} />
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium leading-tight">{activity.text}</p>
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">{activity.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveImpact;
