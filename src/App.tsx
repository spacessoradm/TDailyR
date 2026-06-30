import React, { useState, useEffect } from 'react';
import { Coffee, Sunrise, Palmtree, Film, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { articles } from './data/articles';
import { Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

type Category = 'food' | 'culture' | 'nature' | 'entertainment';

export const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; activeBg: string; hoverText: string }[] = [
  { id: 'food', label: 'Culinary', icon: <Coffee size={18} strokeWidth={2.5} />, activeBg: 'bg-orange-500', hoverText: 'hover:text-orange-600' },
  { id: 'culture', label: 'Culture', icon: <Sunrise size={18} strokeWidth={2.5} />, activeBg: 'bg-violet-500', hoverText: 'hover:text-violet-600' },
  { id: 'nature', label: 'Nature', icon: <Palmtree size={18} strokeWidth={2.5} />, activeBg: 'bg-emerald-500', hoverText: 'hover:text-emerald-600' },
  { id: 'entertainment', label: 'Entertainment', icon: <Film size={18} strokeWidth={2.5} />, activeBg: 'bg-pink-500', hoverText: 'hover:text-pink-600' },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

function Home() {
  const [activeTab, setActiveTab] = useState<Category>('food');

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 selection:bg-rose-500 selection:text-white pb-24 font-sans">
      <Helmet>
        <title>The Daily Rhythm - Exploring Malaysian Lifestyle</title>
        <meta name="description" content="Explore the vibrant intersection of modern living, rich traditions, and colorful everyday moments in Malaysia." />
      </Helmet>
      {/* Minimal Header */}
      <nav className="w-full py-8 px-8 flex justify-center items-center">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-600 bg-rose-100 px-5 py-2.5 rounded-full shadow-sm">
          Malaysian Lifestyle
        </span>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 mt-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-orange-500 via-rose-500 to-violet-500 text-transparent bg-clip-text drop-shadow-sm">
          The Daily Rhythm.
        </h1>
        <p className="text-lg md:text-2xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Exploring the vibrant intersection of modern living, rich traditions, and colorful everyday moments.
        </p>
      </header>

      {/* Navigation Pill */}
      <div className="max-w-max mx-auto mt-16 px-2 py-2 bg-white rounded-full shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-out ${
              activeTab === cat.id
                ? `${cat.activeBg} text-white shadow-md scale-100`
                : `bg-transparent text-stone-500 ${cat.hoverText} hover:bg-stone-50 scale-95 hover:scale-100`
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content Stage */}
      <main className="max-w-5xl mx-auto px-6 mt-16">
        <div className="transition-all duration-500 ease-in-out">
          {activeTab === 'food' && <FoodSection />}
          {activeTab === 'culture' && <CultureSection />}
          {activeTab === 'nature' && <NatureSection />}
          {activeTab === 'entertainment' && <EntertainmentSection />}
        </div>
      </main>
    </div>
  );
}

function FoodSection() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-orange-500/20 border border-orange-300/30">
        <div className="flex items-center gap-3 mb-6 text-orange-100">
          <Clock size={20} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-widest">Morning Rituals</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-sm">The Kopitiam Hub.</h2>
        <p className="text-lg md:text-xl text-orange-50 leading-relaxed max-w-3xl font-medium">
          Life begins at the traditional coffee shop. Half-boiled eggs, thick soy sauce, kaya spread on charcoal-toasted bread, and the unmistakable aroma of rich, pulled tea (Teh Tarik). It is where communities converge before the city wakes up.
        </p>
      </div>

      <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-rose-500/20 border border-rose-400/30">
        <div className="flex items-center gap-3 mb-6 text-rose-200">
          <MapPin size={20} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-widest">Street Level</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Pasar Malam</h2>
        <p className="text-rose-50 leading-relaxed text-lg font-medium">
          When the sun sets, neighborhoods transform. The night markets emerge, offering a sensory overload of sizzling woks, fresh produce, and endless rows of street food like Apam Balik and Satay.
        </p>
      </div>

      <div className="bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-amber-400/20 border border-amber-200/50">
        <div className="flex items-center gap-3 mb-6 text-amber-800">
           <Coffee size={20} strokeWidth={2.5} />
           <span className="text-xs font-bold uppercase tracking-widest">Mamak Culture</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Late Night Suppers</h2>
        <p className="text-amber-900 leading-relaxed text-lg font-medium">
          The 24-hour Mamak stall is the unofficial meeting room of Malaysia. Lit by fluorescent lights, it's a place for sports, politics, and catching up over crispy Roti Canai.
        </p>
      </div>
    </div>
  );
}

function CultureSection() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-violet-500 to-purple-700 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-violet-500/20 border border-violet-400/30">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-sm">Festive Open Houses.</h2>
        <p className="text-lg md:text-xl text-violet-100 leading-relaxed font-medium">
          A cornerstone of Malaysian harmony is the "Open House". During major celebrations—Raya, Lunar New Year, Deepavali, and Christmas—doors are thrown open. Neighbors of all races cross thresholds to share meals, stories, and laughter.
        </p>
      </div>

      <div className="bg-gradient-to-br from-fuchsia-200 to-pink-200 text-fuchsia-950 rounded-[2.5rem] p-10 shadow-xl shadow-fuchsia-200/50 flex flex-col justify-center border border-white/50">
         <h3 className="text-2xl font-extrabold mb-4 drop-shadow-sm">Gotong-Royong</h3>
         <p className="text-fuchsia-900 leading-relaxed font-medium">The enduring spirit of mutual assistance. Communities gathering to clean, build, or prepare for local events.</p>
      </div>

      <div className="col-span-1 md:col-span-3 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-indigo-500/20 border border-indigo-400/30">
         <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 drop-shadow-sm">Everyday Harmony</h2>
         <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-4xl font-medium">
           It is seen in the casual blending of languages in a single sentence (Manglish), the shared respect for different religious callings echoing through the city, and the unified passion for local sports.
         </p>
      </div>
    </div>
  );
}

function NatureSection() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-emerald-500 to-green-700 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-emerald-500/20 border border-emerald-400/30">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-sm">Urban Jungles.</h2>
        <p className="text-lg md:text-xl text-emerald-100 leading-relaxed max-w-3xl font-medium">
          Even in the heart of metropolitan Kuala Lumpur, nature insists on being present. Sprawling botanical gardens and canopy walks offer immediate refuge from the concrete, hosting morning Tai Chi and evening joggers.
        </p>
      </div>

      <div className="bg-gradient-to-br from-teal-200 to-emerald-200 text-teal-950 rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-teal-200/50 border border-white/50">
         <h3 className="text-3xl font-extrabold mb-4 drop-shadow-sm">Highland Retreats</h3>
         <p className="text-teal-900 leading-relaxed text-lg font-medium">
           When the tropical heat peaks, the winding roads to the highlands become packed. Strawberries, tea plantations, and crisp, cool air provide the perfect weekend escape.
         </p>
      </div>

      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-cyan-400/20 border border-cyan-300/30">
         <h3 className="text-3xl font-extrabold mb-4 drop-shadow-sm">Coastal Evenings</h3>
         <p className="text-cyan-50 leading-relaxed text-lg font-medium">
           With extensive coastlines, evening strolls by the beach are a staple in coastal towns, accompanied by the sea breeze and fresh coconut water.
         </p>
      </div>
    </div>
  );
}

function EntertainmentSection() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-pink-500/20 border border-pink-400/30 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-sm">Digital Entertainment.</h2>
        <p className="text-lg md:text-xl text-pink-100 leading-relaxed font-medium max-w-3xl mx-auto">
          Explore the modern ways Malaysians unwind and find excitement in the digital age. Discover daily leisure insights from 3 Jun to 29 Jun 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => navigate(`/${generateSlug(article.title)}`)}
            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-pink-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                {article.date}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-extrabold text-stone-800 mb-4 leading-tight">{article.title}</h3>
              <div 
                className="text-stone-600 leading-relaxed font-medium text-sm flex-1 space-y-4 line-clamp-3 relative z-10"
                onClick={(e) => {
                  // If they clicked a link, let them go to the link instead of the article
                  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') {
                    e.stopPropagation();
                  }
                }}
              >
                {article.content}
              </div>
              <div className="mt-6 text-pink-500 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                Read Article <ArrowLeft size={16} className="rotate-180" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => generateSlug(a.title) === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-extrabold mb-4">Article Not Found</h1>
        <Link to="/" className="text-rose-500 hover:text-rose-600 font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 selection:bg-pink-500 selection:text-white pb-24 font-sans">
      <Helmet>
        <title>{article.title} | The Daily Rhythm</title>
        <meta name="description" content={`Read about ${article.title} on The Daily Rhythm. Malaysian lifestyle, entertainment, and more.`} />
      </Helmet>
      <nav className="w-full py-8 px-6 md:px-12 flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold transition-colors">
          <ArrowLeft size={20} />
          Back
        </Link>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-pink-600 bg-pink-100 px-5 py-2.5 rounded-full shadow-sm">
          Digital Entertainment
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="mb-12 text-center">
          <div className="inline-block mb-6 bg-pink-100 text-pink-600 text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
            {article.date}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 bg-gradient-to-br from-pink-500 to-rose-600 text-transparent bg-clip-text drop-shadow-sm leading-tight">
            {article.title}
          </h1>
        </header>

        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-500/20 mb-12 aspect-[21/9] bg-stone-200">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg prose-pink max-w-3xl mx-auto space-y-8 text-stone-700 font-medium leading-relaxed">
          {article.content}
        </div>
      </main>
    </div>
  );
}
