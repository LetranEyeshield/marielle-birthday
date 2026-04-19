'use client';
import { motion } from "framer-motion";

export default function Parents() {
  return (
    <div className="parents-div">
      <motion.div
        className="parents-animated-bg"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <h2 className="dancing-script">Proud Parents</h2>
        <img src="/parents.jpg" alt="Marielle's Parents" loading="lazy" />
        <h3 className="great-vibes-regular">Mr. Noel Drig</h3>
        <h3 className="great-vibes-regular">Mrs. Maribeth Drig</h3>
      </motion.div>
    </div>
  );
}
