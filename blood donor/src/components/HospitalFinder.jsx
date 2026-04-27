import React, { useState, useEffect } from 'react';
import { Search, MapPin, Hospital, Clock, Phone, Navigation, Compass, Target, Info, Droplets } from 'lucide-react';
import { MapContainer, TileLayer, ZoomControl, Circle, Marker, Popup } from 'react-leaflet';
import API_URL from '../config';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InventoryStatus = () => {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/inventory`);
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  if (!inventory) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 text-primary-500 mb-4">
        <Droplets className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Inventory</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(inventory).map(([group, count]) => (
          <div key={group} className="bg-slate-900/50 border border-slate-800 p-2 rounded-xl text-center">
            <div className="text-[10px] font-black text-slate-500">{group}</div>
            <div className={`text-sm font-black ${count < 5 ? 'text-red-500' : 'text-white'}`}>{count}u</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HospitalFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('A+');
  const [radius, setRadius] = useState(10);
  const jaipurCenter = [26.9124, 75.7873];
  
  const mockHospitals = [
    {
      id: 1,
      name: "SMS Hospital, Jaipur",
      address: "JLN Marg, Jaipur, Rajasthan",
      coords: [26.8916, 75.8154],
      distance: "1.2 km",
      reward: "₹500",
      status: "Open Now",
      phone: "+91 141 256 0291"
    },
    {
      id: 2,
      name: "Fortis Escorts Hospital",
      address: "Jawahar Lal Nehru Marg, Jaipur",
      coords: [26.8529, 75.8051],
      distance: "2.5 km",
      reward: "₹750",
      status: "Open Now",
      phone: "+91 141 254 7000"
    },
    {
      id: 3,
      name: "Santokba Durlabhji Hospital",
      address: "Bhawani Singh Lall Singh Marg, Jaipur",
      coords: [26.8967, 75.7951],
      distance: "4.8 km",
      reward: "₹450",
      status: "Closing Soon",
      phone: "+91 141 256 6251"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col lg:flex-row">
      {/* Left Sidebar - GPS Blood Finder */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-96 bg-slate-950 border-r border-slate-900 p-6 z-20 flex flex-col h-full lg:h-screen overflow-y-auto"
      >
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-primary-500 mb-2">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">GPS Location Based</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-none mb-6">NEAR ME</h2>

          {/* GPS Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] text-center mb-8 backdrop-blur-md relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-primary-950/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-900/50 relative z-10">
              <Target className="w-8 h-8 text-primary-500 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight relative z-10">GPS Blood Finder</h3>
            <p className="text-slate-500 text-xs leading-relaxed relative z-10">
              Detects your real location and instantly finds the nearest available blood donors & banks.
            </p>
          </motion.div>

          <InventoryStatus />

          {/* Filters */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">My Blood Group</span>
                <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center border border-slate-800">
                  <div className="w-3 h-[1px] bg-slate-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <button 
                    key={bg}
                    onClick={() => setSelectedBloodGroup(bg)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all border ${selectedBloodGroup === bg ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-900/40' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>Search Radius</span>
                <span className="text-primary-500">{radius} km</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center group"
            >
              <MapPin className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Locate Me & Find Nearest
            </motion.button>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="mt-auto pt-8 border-t border-slate-900/50 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-800"
          >
            <Hospital className="w-6 h-6 text-slate-500" />
          </motion.div>
          <p className="text-slate-600 text-[10px] leading-relaxed">
            Select your blood group, set search radius, then tap <span className="text-primary-500">Locate Me</span> to find donors & banks near you.
          </p>
        </div>
      </motion.div>

      {/* Main Map Area */}
      <div className="flex-1 relative h-[50vh] lg:h-screen">
        {/* The Map */}
        <div className="absolute inset-0 grayscale invert opacity-50 contrast-125 z-0">
          <MapContainer 
            center={jaipurCenter} 
            zoom={13} 
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position="topright" />
            <Circle 
              center={jaipurCenter}
              pathOptions={{ color: '#10b981', fillColor: '#10b981' }}
              radius={radius * 1000}
            />
            {mockHospitals.map(hospital => (
              <Marker key={hospital.id} position={hospital.coords}>
                <Popup>
                  <div className="p-2">
                    <h5 className="font-black text-slate-900">{hospital.name}</h5>
                    <p className="text-xs text-slate-600">{hospital.address}</p>
                    <div className="mt-2 text-[10px] font-black text-primary-600 uppercase">Reward: {hospital.reward}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Map Legend/Overlay */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-8 left-8 z-20"
        >
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-3xl">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Available Donor</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Busy Donor</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Blood Bank</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Your Location</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Hospital Cards - Horizontal on Mobile, Vertical list overlay on desktop if needed */}
        <div className="absolute top-8 right-8 z-20 hidden lg:block w-96 max-h-[80vh] overflow-y-auto space-y-4 no-scrollbar">
          {mockHospitals.map((hospital, index) => (
            <motion.div 
              key={hospital.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ x: -10 }}
              className="bg-slate-950/90 border border-slate-800 p-5 rounded-[2rem] backdrop-blur-xl group hover:border-primary-900/50 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary-950/30 rounded-2xl border border-primary-900/20">
                    <Hospital className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white leading-tight group-hover:text-primary-400 transition-colors">
                      {hospital.name}
                    </h4>
                    <p className="text-slate-500 text-[10px] flex items-center mt-1 font-bold">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hospital.distance}
                    </p>
                  </div>
                </div>
                <div className="bg-money-950/30 text-money-400 px-3 py-1 rounded-full text-[10px] font-black border border-money-900/30 uppercase tracking-widest">
                  {hospital.reward}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
                  Book Appointment
                </button>
                <button className="px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800 transition-all">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalFinder;