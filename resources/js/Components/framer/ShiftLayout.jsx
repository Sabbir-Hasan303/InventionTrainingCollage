import React from "react";

const cards = [
  {
    id: "mountain",
    title: "Mountain View",
    description:
      "Explore the breathtaking heights of natural wonders. These majestic mountains offer spectacular views and unforgettable experiences for all adventure seekers.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    className:
      "top-0 left-0 h-[300px] w-full hover:h-[512px] hover:w-[512px] hover:top-0 hover:left-0 hover:right-auto hover:bottom-auto hover:z-10",
  },
  {
    id: "water",
    title: "Calm Waters",
    description:
      "Experience the serene beauty of this peaceful lake destination. Perfect for relaxation and connecting with nature's gentle side.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    className:
      "top-[305px] left-0 h-[200px] w-[200px] hover:h-[512px] hover:w-[512px] hover:top-0 hover:left-0 hover:right-auto hover:bottom-auto hover:z-10",
  },
  {
    id: "forest",
    title: "Forest Journey",
    description:
      "Discover the mysteries hidden within ancient forests. A lush green sanctuary where time seems to stand still among the towering trees.",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    className:
      "right-0 bottom-0 h-[280px] w-[305px] border-4 border-white hover:border-0 hover:h-[512px] hover:w-[512px] hover:top-auto hover:left-auto hover:right-0 hover:bottom-0 hover:z-10",
  },
];

export default function ShiftLayout() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative h-[505px] w-[512px] overflow-hidden rounded-2xl bg-white shadow-lg">
        {cards.map((card) => (
          <article
            key={card.id}
            className={`group absolute z-[1] flex items-end overflow-hidden rounded-2xl bg-cover bg-center text-white shadow-md transition-all duration-500 ease-in-out ${card.className}`}
            style={{ backgroundImage: `url('${card.image}')` }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300 group-hover:pb-10">
              <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
              <p className="max-h-0 text-sm opacity-0 transition-all duration-300 group-hover:max-h-[100px] group-hover:opacity-100">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
