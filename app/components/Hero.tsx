"use client";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <div className="hero">
      {/* <div className="hero-header-div">
        <h1 className="dancing-script">
          Welcome to Marielle&apos;s 7th Birthday!
        </h1>
        <h2 className="great-vibes-regular">
          Join us for a fun-filled celebration!
        </h2>
      </div> */}
      <motion.div
        className="hero-header-div"
        initial={{ opacity: 0, y: 60 }}
        // animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
        }}
      >
        <h1 className="dancing-script">
          Welcome to Marielle&apos;s 7th Birthday!
        </h1>
        <h2 className="great-vibes-regular">
          Join us for a fun-filled celebration!
        </h2>
      </motion.div>

      <img
        src="/banner.png" // Make sure this is a real image path
        alt="Marielle's 7th Birthday Banner"
        loading="lazy"
      />
    </div>
  );
}
