import { useState, useEffect } from "react";

export default function CategorySlider({ categories }) {
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        if (!categories || categories.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % categories.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [categories]);

    return (
        <div className="relative w-full h-96 rounded-md overflow-hidden shadow-lg hidden md:block">
            {categories.map((el, ix) => (    
                <div
                    key={el.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        ix === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={`/assets/${el.slug}.jpg`}
                        alt={el.name}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                        <h3 className="text-3xl font-baloo font-semibold sm:text-4xl mb-4">{el.name}</h3>
                        <p className="text-lg sm:text-xl max-w-2xl">
                            {el.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
