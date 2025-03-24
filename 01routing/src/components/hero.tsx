import Image from "next/image";
import GymMan from "../../public/hero.jpg";
import React from "react";

const HeroPage = () => {
    return (
        <div className="relative h-screen">
            {/* Corrected from insert-0 to inset-0 */}
            <div className="absolute inset-0 -z-10 w-full h-full">
                <Image
                    src={GymMan}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="pic hai"
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            <div className="flex items-center justify-center pt-24">
                <h1 className="font-bold text-4xl text-white">Incredible</h1>
            </div>
        </div>
    );
};

export default HeroPage;
