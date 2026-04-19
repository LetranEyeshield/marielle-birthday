'use client';
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="about-div"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <p>
        Hi there! I&apos;m Marielle, and I&apos;m turning 7! I&apos;m so excited
        to celebrate my birthday with all of you. I love playing with my
        friends, going on adventures, and eating cake! I can't wait to see you
        at my party and have lots of fun together!
      </p>
      {/* </div> */}
    </motion.div>
  );
}
