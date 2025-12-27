import { motion } from "framer-motion"; // Use motion for animations
import React, { useRef } from 'react';

// Import your existing components
import Card from '../components/Card';
import { Globe } from '../components/Globe';
import CopyEmailButton from '../components/CopyEmailButton';
import { Frameworks } from "../components/FrameWorks";

// --- MODIFICATION 1: Data-Driven Approach for "Code is Craft" Cards ---
// This makes it easier to add, remove, or change items without cluttering the JSX.
const codeCraftCards = [
    { type: 'text', style: { rotate: "75deg", top: "30%", left: "20%" }, text: "GRASP" },
    { type: 'text', style: { rotate: "-30deg", top: "60%", left: "45%" }, text: "SOLID" },
    { type: 'text', style: { rotate: "90deg", bottom: "30%", left: "70%" }, text: "Design Patterns" },
    { type: 'text', style: { rotate: "-45deg", top: "55%", left: "0%" }, text: "Design Principles" },
    { type: 'text', style: { rotate: "20deg", top: "10%", left: "30%" }, text: "SRP" },
    { type: 'image', style: { rotate: "30deg", top: "70%", left: "70%" }, image: "assets/logos/csharp-pink.png", alt: "C# Logo" },
    { type: 'image', style: { rotate: "-45deg", top: "70%", left: "25%" }, image: "assets/logos/dotnet-pink.png", alt: ".NET Logo" },
    { type: 'image', style: { rotate: "-45deg", top: "5%", left: "10%" }, image: "assets/logos/blazor-pink.png", alt: "Blazor Logo" },
];

// --- MODIFICATION 2: Breaking Down UI into Reusable Sub-components ---

const IntroCard = () => (
    <div className='flex items-end grid-default-color grid-1'>
        {/* MODIFICATION 3: Added descriptive alt tag for accessibility */}
        <img
            src="assets/coding-pov.png"
            alt="Developer's point-of-view of code on a screen"
            className='absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]'
        />
        <div className='z-10'>
            <h3 className='headtext'>Hi, I'm Arya Sharma</h3>
            <p className='subtext'>
                I am a developer who likes to make crazy stuff, also into AI nowadays.
            </p>
        </div>
        <div className='absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo'></div>
    </div>
);

const CodeCraftCard = () => {
    const grid2Container = useRef(null);
    return (
        <div className='grid-default-color grid-2'>
            <div ref={grid2Container} className='flex flex-col items-center justify-center w-full h-full gap-4'>
                <p className="text-5xl font-bold text-gray-500/30">CODE IS CRAFT</p>
                {/* Mapping over the data array to render cards cleanly */}
                {codeCraftCards.map((card, index) => (
                    <Card
                        key={index}
                        style={card.style}
                        text={card.type === 'text' ? card.text : undefined}
                        image={card.type === 'image' ? card.image : undefined}
                        alt={card.type === 'image' ? card.alt : undefined} // Pass alt text to Card component
                        containerRef={grid2Container}
                    />
                ))}
            </div>
        </div>
    );
};

const TimeZoneCard = () => (
    <div className='grid-black-color grid-3'>
        <div className='z-10 w-[50%]'>
            <h3 className='headtext'>Time Zone</h3>
            <p className='subtext'>I'm based in Kepler-452b, and open to remote work worldwide.</p>
        </div>
        <figure className="absolute left-[30%] top-[10%]">
            <Globe />
        </figure>
    </div>
);

const CollaborationCard = () => (
    <div className='grid-special-color grid-4'>
        <div className='flex flex-col items-center justify-center gap-4 size-full'>
            <p className='text-center headtext'>Let's Make Something Cool Together</p>
            <CopyEmailButton />
        </div>
    </div>
);

const FrameworksCard = () => (
    <div className="grid-default-color grid-5">
        <div className="z-10 w-[50%]">
            <h3 className="headtext">AshGrtz</h3>
            <p className="subtext">
                I’m a student developer who loves making websites and experimenting with AI. I’ve worked with a mix of modern tools and frameworks to build clean, scalable, and creative projects.
            </p>
        </div>
        <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
        </div>
    </div>
);


// --- Main About Component ---
const About = () => {
    return (
        // MODIFICATION 4: Added id for navigation and motion.section for animation
        <motion.section
            id="about" // ID for smooth scrolling
            className='c-space section-spacing'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-heading'>About Me</h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12'>
                {/* MODIFICATION 5: Clean and Readable Layout */}
                <IntroCard />
                <CodeCraftCard />
                <TimeZoneCard />
                <CollaborationCard />
                <FrameworksCard />
            </div>
        </motion.section>
    );
}

export default About;