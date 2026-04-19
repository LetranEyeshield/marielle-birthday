"use client";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Treasures() {
  //FOR GALLERY
  const totalImages = 10; // Change this to the actual number of images you have in the /treasures/ folder
  const IMAGES = Array.from({ length: totalImages }, (_, i) => ({
    // src: `/images/gallery/photo-${i + 1}.jpg`,
    src: `/placeholder/${i + 1}.jpg`,
  }));

  const getImages = IMAGES.length;

  const ITEMS_PER_PAGE = 5;

  const [page, setPage] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const paginatedImages = IMAGES.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(IMAGES.length / ITEMS_PER_PAGE);
  return (
    <div className="treasures-div">
      <h2 className="great-vibes-regular">7 Treasures</h2>
      <div className="gallery-image-wrapper grid grid-cols-5 gap-4">
        {paginatedImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setOpenIndex((page - 1) * ITEMS_PER_PAGE + idx)}
            className="cursor-pointer"
          >
            <motion.div
              className="treasures-div"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={img.src}
                alt={`Gallery ${idx}`}
                width={400}
                height={300}
                loading="lazy"
                className="rounded shadow object-cover cursor-pointer"
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-div">
        {/* First */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="bg-blue-400 text-white rounded disabled:opacity-50"
        >
          First
        </button>

        {/* Prev */}
        {/* <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="bg-blue-400 rounded disabled:opacity-50"
        >
          Prev
        </button> */}

        {/* 🔥 Dynamic Page Numbers (e.g. 2 3 4 5 6) */}
        {(() => {
          const PAGE_WINDOW = 5; // how many numbers to show
          let start = Math.max(1, page - Math.floor(PAGE_WINDOW / 2));
          let end = start + PAGE_WINDOW - 1;

          if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - PAGE_WINDOW + 1);
          }

          return Array.from({ length: end - start + 1 }, (_, i) => {
            const p = start + i;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  page === p ? "bg-white text-black" : "bg-blue-400 text-white"
                }`}
              >
                {p}
              </button>
            );
          });
        })()}

        {/* Next */}
        {/* <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button> */}

        {/* Last */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
      {/* <div className="get-images-count">{getImages + " Images"}</div> */}

      {/* Lightbox */}
      {openIndex !== null && (
        <Lightbox
          open
          index={openIndex}
          close={() => setOpenIndex(null)}
          slides={IMAGES}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      )}
    </div>
  );
}
