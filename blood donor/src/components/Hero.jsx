import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import API_URL from '../config';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const JaipurMap = () => {
  const position = [26.9124, 75.7873]; // Jaipur coordinates
  
  return (
    <div className="absolute inset-0 w-full h-full grayscale invert opacity-40 contrast-125 z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle 
          center={position}
          pathOptions={{ color: '#ef4444', fillColor: '#ef4444' }}
          radius={2000}
        />
        <Marker position={position}>
          <Popup>
            Jaipur BloodGold Hub
          </Popup>
        </Marker>
      </MapContainer>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950 pointer-events-none"></div>
    </div>
  );
};

const SOSOverlay = () => {
  const [selectedGroup, setSelectedGroup] = useState('A+');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleBroadcast = async () => {
    setIsBroadcasting(true);
    try {
      const response = await fetch(`${API_URL}/api/sos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodGroup: selectedGroup,
          patientName: "Emergency Patient", // Simulated for now
          hospital: "Nearby Hospital"
        }),
      });

      if (response.ok) {
        setIsBroadcasting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error broadcasting SOS:", error);
      setIsBroadcasting(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl shadow-red-900/40 flex items-center justify-center animate-bounce"
      >
        <AlertCircle className="w-8 h-8" />
      </button>

      <div className={`fixed lg:absolute left-4 top-24 z-20 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-slate-950/90 border border-red-900/50 backdrop-blur-xl p-6 rounded-[2rem] w-80 shadow-2xl shadow-red-900/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Emergency Request</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-white">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            {isSuccess && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="bg-emerald-500/20 text-emerald-500 p-1 rounded-full"
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        
        <h3 className="text-4xl font-black text-white mb-6">BLOOD SOS</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-red-500 font-bold text-xl">15</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Donors</div>
          </div>
          <div className="text-center">
            <div className="text-red-500 font-bold text-xl">6</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Banks</div>
          </div>
          <div className="text-center">
            <div className="text-red-500 font-bold text-xl">12</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Active</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Blood Group Required</div>
            <div className="grid grid-cols-4 gap-2">
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <button 
                  key={bg} 
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-1 py-1.5 rounded-md text-[10px] font-black transition-all ${selectedGroup === bg ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleBroadcast}
            disabled={isBroadcasting}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center ${isBroadcasting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/40'}`}
          >
            {isBroadcasting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Broadcasting...
              </div>
            ) : isSuccess ? 'SOS Sent!' : 'Broadcast SOS Alert'}
          </button>
          
          {isSuccess && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-emerald-500 text-center font-bold uppercase tracking-wider"
            >
              Alert sent to 15 nearby donors
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
    </>
  );
};

const Hero = ({ onNavigate }) => {
  return (
    <div className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      <JaipurMap />
      <SOSOverlay />
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/10 blur-[100px] rounded-full -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-money-900/10 blur-[100px] rounded-full -ml-20 -mb-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-ping"></span>
            <span className="text-sm font-medium text-slate-300">
              Live in Jaipur: ₹500 bonus for emergency donors!
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white block leading-none"
            >
              DONATE BLOOD.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-primary-500 via-red-500 to-money-400 bg-clip-text text-transparent block"
            >
              EARN REWARDS.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Join Jaipur's elite donor network. Find real-time SOS requests, 
            book instant appointments, and get rewarded for saving lives.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button 
              onClick={() => onNavigate('hospitals')}
              className="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-red-900/40 transition-all flex items-center justify-center group"
            >
              Start Donating
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('rewards')}
              className="w-full sm:w-auto px-10 py-5 bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-800 rounded-[2rem] font-black text-xl backdrop-blur-md transition-all flex items-center justify-center group"
            >
              <Coins className="mr-2 w-6 h-6 text-money-400" />
              Check Earnings
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-slate-800/50 backdrop-blur-sm bg-slate-950/30 rounded-[3rem]"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1 uppercase">2.5k+</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Local Donors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1 uppercase">₹10Cr+</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Rewards Paid</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1 uppercase">45+</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Jaipur Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1 uppercase">12k+</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Emergencies Solved</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;