import { FlipWords } from "./FlipWords"


import { motion } from "framer-motion" // Correct import for framer-motion

const HeroText = () => {
    // Define the array of words to be used by the FlipWords component.
    const Words = ["Smart", "Jacked", "Leader"]

    // Define animation variants for framer-motion components.
    // These variants control the initial and animated states of elements.
    const variants = {
        // 'hidden' state: Element is completely transparent (opacity 0) and
        // shifted 50 pixels to the left (x: -50).
        hidden: { opacity: 0, x: -50 },
        // 'visible' state: Element is fully opaque (opacity 1) and
        // returns to its original horizontal position (x: 0).
        visible: { opacity: 1, x: 0 }
    }

    return (
        // Main container div for the HeroText component.
        // It sets z-index, top margin (responsive), text alignment (responsive),
        // rounded corners, and uses bg-clip-text for background clipping.
        <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
            {/* Desktop view: This div is hidden on small screens (md:hidden)
                and displayed as a flex column on medium and larger screens (md:flex). */}
            <div className="flex-col hidden md:flex c-space">
                {/* Animated H1 element for the "Hi I'm Ash" text. */}
                <motion.h1
                    className="text-4xl font-medium"
                    variants={variants} // Applies the 'hidden' and 'visible' animation states.
                    initial="hidden"     // Sets the initial state of the animation to 'hidden'.
                    animate="visible"    // Animates the element to the 'visible' state.
                    transition={{ delay: 1 }} // Adds a 1-second delay before this animation starts.
                >
                    Hi I'm Ash
                </motion.h1>
                <div className="flex flex-col items-start">
                    {/* Animated paragraph for "A Developer Who Builds Crazy Stuff". */}
                    <motion.p
                        className="text-5xl font-medium text-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }} // Starts slightly after the H1 animation.
                    >
                        A Developer <br />Who Builds Crazy Stuff
                    </motion.p>
                    {/* Animated div containing the FlipWords component. */}
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }} // Starts after the previous paragraph.
                    >
                        {/* The FlipWords component animates through the 'Words' array. */}
                        <FlipWords
                            words={Words}
                            className="font-black text-white text-8xl font-bold"
                        />
                    </motion.div>
                    {/* Animated paragraph for "Portfolio". */}
                    <motion.p
                        className="text-4xl font-medium text-neutral-250"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.7 }} // Starts after the FlipWords animation.
                    >
                        Portfolio
                    </motion.p>
                </div>
            </div>

            {/* Mobile view: This div is displayed as a flex column on small screens (md:hidden)
                and hidden on medium and larger screens. */}
            <div className="flex flex-col space-y-6 md:hidden">
                {/* Animated paragraph for "Hi,I'm Ash" in mobile view. */}
                <motion.p
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi,I'm Ash
                </motion.p>
                <div>
                    {/* Animated paragraph for "Building" in mobile view. */}
                    <motion.p
                        className="text-5xl font-black text-neutral-300 "
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                    >
                        Building
                    </motion.p>
                    {/* Animated div containing FlipWords in mobile view. */}
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }}
                    >
                        <FlipWords
                            words={Words}
                            className="font-bold text-white text-7xl"
                        />
                    </motion.div>
                    {/* Animated paragraph for "Web Applications" in mobile view. */}
                    <motion.p
                        className="text-4xl font-black text-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Applications
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

export default HeroText