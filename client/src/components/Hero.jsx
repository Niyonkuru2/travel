import { useEffect, useState } from 'react';
import { Heart,ChevronLeft, ChevronRight} from 'lucide-react';

const cards = [
  {
    image: '/images/akagera.jpg',
    location: 'Akagera National Park',
    category: 'Eastern Rwanda',
    description: 'Akagera National Park is known for its diverse wildlife including elephants, lions, hippos, and beautiful lakes along the eastern border.'
  },
  {
    image: '/images/akanyaru.jpg',
    location: 'Akanyaru River',
    category: 'Southern Rwanda',
    description: 'Akanyaru River forms part of the border between Rwanda and Burundi, known for its scenic wetlands and birdlife.'
  },
  {
    image: '/images/nyungwe.jpg',
    location: 'Nyungwe National Park',
    category: 'Western Rwanda',
    description: 'Nyungwe is one of Africa’s oldest rainforests, rich in biodiversity with chimpanzee trekking, canopy walks, and lush mountain scenery.'
  },
  {
    image: '/images/rusumo.jpg',
    location: 'Rusumo Falls',
    category: 'Eastern Rwanda',
    description: 'Rusumo Falls is a spectacular waterfall on the Kagera River, forming part of the border between Rwanda and Tanzania.'
  },
  {
    image: '/images/volcano.jpg',
    location: 'Volcanoes National Park',
    category: 'Northern Rwanda',
    description: 'Home to the famous mountain gorillas, Volcanoes National Park features stunning volcanic peaks and rich rainforest ecosystems.'
  },
];

const Hero = () => {
  const transitionDuration = 3000; // 3 seconds
  const fadeDuration = 1000; // 1 second fade
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), fadeDuration);
    }, transitionDuration);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    let start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / transitionDuration) * 100, 100));

      if (elapsed < transitionDuration) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const reset = setInterval(() => {
      start = Date.now();
      setProgress(0);
      animate();
    }, transitionDuration);

    return () => clearInterval(reset);
  }, [currentIndex]);

  const rotatedCards = [...cards.slice(currentIndex + 1), ...cards.slice(0, currentIndex)];
  const rightSideCards = rotatedCards.slice(0, 3);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 z-20">
        <div
          className="h-full bg-yellow-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Previous Image */}
      <img 
        src={cards[prevIndex].image} 
        alt={cards[prevIndex].location}
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Current Image */}
      <img 
        src={cards[currentIndex].image} 
        alt={cards[currentIndex].location} 
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="absolute w-full h-full bg-gradient-to-r from-black/60 to-transparent"></div>

      <div className="relative z-10 h-full flex items-center justify-between px-20">
        {/* Left Content */}
        <div className="text-white max-w-lg">
          <h3 className="uppercase tracking-widest text-lg">{cards[currentIndex].category}</h3>
          <h1 className="text-6xl font-extrabold leading-tight">
            {cards[currentIndex].location.toUpperCase()}
          </h1>
          <p className="mt-4 text-sm">{cards[currentIndex].description}</p>

          <div className="flex items-center gap-4 mt-6">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart className="text-red-500" size={24} />
            </button>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full">
              Explore Now
            </button>
          </div>
        </div>

        {/* Right Content (Cards) */}
        <div className="flex gap-6 ml-20">
          {rightSideCards.map((card, idx) => (
            <div
              key={idx}
              className="relative w-52 h-72 rounded-xl cursor-pointer overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute bottom-0 p-4 text-white">
                <p className="text-sm uppercase tracking-wider">{card.category}</p>
                <h3 className="text-lg font-bold">{card.location}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* Bottom Controls Section */}
<div className="absolute bottom-10 left-[40%] transform -translate-x-0 w-[35%] flex items-center justify-between z-30">
  {/* Prev + Next Buttons in a flex group */}
  <div className="flex gap-4 ml-4">
    <button
      onClick={() => {
        setPrevIndex(currentIndex);
        setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), fadeDuration);
      }}
      className="w-10 text-white h-10 rounded-full border-2 border-gray-100 flex items-center justify-center shadow-lg cursor-pointer"
      aria-label="Previous Slide"
    >
      <ChevronLeft size={20} />
    </button>

    <button
      onClick={() => {
        setPrevIndex(currentIndex);
        setCurrentIndex((currentIndex + 1) % cards.length);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), fadeDuration);
      }}
      className="w-10 text-white h-10 rounded-full border-2 border-gray-100 flex items-center justify-center shadow-lg cursor-pointer"
      aria-label="Next Slide"
    >
      <ChevronRight size={20} />
    </button>
  </div>

  {/* Progress Bar */}
  <div className="flex-1 mx-4 h-1 bg-gray-400 rounded overflow-hidden relative">
    <div
      className="h-full bg-yellow-400 transition-all duration-500 absolute left-0 top-0"
      style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
    ></div>
  </div>
  {/* Counter */}
  <div className="text-white text-4xl font-bold w-10 text-right mr-4">
    {`0${currentIndex + 1}`}
  </div>
</div>


</div>
  );
};

export default Hero;
