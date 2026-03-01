import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InfiniteCardSlider({ cards }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.card-item');
    const totalWidth = items[0].offsetWidth * items.length;

    gsap.to(slider, {
      x: -totalWidth / 2,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
      }
    });
  }, [cards]);

  return (
    <div className="overflow-hidden py-12">
      <div ref={sliderRef} className="flex gap-8">
        {[...cards, ...cards].map((card, i) => (
          <div
            key={i}
            className="card-item flex-shrink-0 w-[400px] h-[300px] bg-[#161719] rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white text-2xl font-light mb-2">{card.title}</h4>
                <p className="text-white/70">{card.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
