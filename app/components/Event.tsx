"use client";
import { motion } from "framer-motion";

export default function Event() {
  return (
    <div className="event-div">
      <motion.div
        className="event-div-animation"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <h2 className="great-vibes-regular">Event Details</h2>
        <p>Date: July 4, 2026 - Saturday</p>
        <p>Time: 5:00 PM - 9:00 PM</p>
        <p>Venue: Huron Park Recreation Centre</p>
        <p>Location: 830 Paisley Blvd. W Misssissauga Ontario L5C3P5</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1776571400495!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDQ4T2ZKOEFF!2m2!1d43.55994148936736!2d-79.63101990971388!3f234.81293!4f0!5f0.7820865974627469"
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}
