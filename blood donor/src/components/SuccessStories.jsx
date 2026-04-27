import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, Star, Calendar, MapPin } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Vikram Rathore",
      location: "Malviya Nagar, Jaipur",
      date: "March 12, 2026",
      story: "My father needed O- blood urgently at midnight. Within 10 minutes of broadcasting SOS on BloodGold, a donor was matched and reached the hospital. Truly life-saving!",
      avatar: "VR"
    },
    {
      id: 2,
      name: "Sonia Meena",
      location: "Vaishali Nagar, Jaipur",
      date: "April 05, 2026",
      story: "Being a regular donor, the reward system keeps me motivated. But knowing my donation saved a 5-year-old girl is the biggest reward I've ever earned.",
      avatar: "SM"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-900/50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <div className="flex items-center space-x-2 text-primary-500 mb-4">
            <Heart className="w-5 h-5 fill-primary-500" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Real Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
            SUCCESS <span className="text-primary-500">STORIES</span>
          </h2>
        </div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-4 md:mt-0">
          12,450+ Lives Impacted in 2026
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] relative group hover:bg-slate-900/60 transition-all"
          >
            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-800 group-hover:text-primary-900/30 transition-colors" />
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center text-white font-black text-xl shadow-lg">
                {story.avatar}
              </div>
              <div>
                <h4 className="font-black text-white text-lg">{story.name}</h4>
                <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3 mr-1" /> {story.location}
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
              "{story.story}"
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
              <div className="flex items-center space-x-1 text-amber-500">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-500" />)}
              </div>
              <div className="flex items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                <Calendar className="w-3 h-3 mr-1" /> {story.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
