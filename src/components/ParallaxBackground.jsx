import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });

  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 w-full h-full overflow-hidden z-0">
      
      {/* 1. Base Sky Layer - Changed extension to .jpg */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/assets/sky.jpg" 
          alt="Sky"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high" 
        />
        {/* Overlay to ensure text stays readable */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Mountain Layer 3 - Changed to .png */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: mountain3Y }}>
        <img src="/assets/mountain-3.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* 3. Planets Layer - Changed to .png */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ x: planetsX }}>
        <img src="/assets/planets.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* 4. Mountain Layer 2 - Changed to .png */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: mountain2Y }}>
        <img src="/assets/mountain-2.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* 5. Mountain Layer 1 - Changed to .png */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: mountain1Y }}>
        <img src="/assets/mountain-1.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>
    </section>
  );
};

export default ParallaxBackground;

