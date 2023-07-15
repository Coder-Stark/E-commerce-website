import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const carouselRef = useRef(null);
  let currentSlide = 0;
  let intervalId = null;
  const slideInterval = 5000; // Interval between slides in milliseconds

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselItems = carousel.querySelectorAll("[data-carousel-item]");
    const carouselIndicators = carousel.querySelectorAll("[data-carousel-slide-to]");
    const carouselPrevBtn = carousel.querySelector("[data-carousel-prev]");
    const carouselNextBtn = carousel.querySelector("[data-carousel-next]");

    const showSlide = (index) => {
      carouselItems.forEach((item, i) => {
        if (i === index) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      carouselIndicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.setAttribute("aria-current", "true");
        } else {
          indicator.setAttribute("aria-current", "false");
        }
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % carouselItems.length;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
      showSlide(currentSlide);
    };

    const startSlideShow = () => {
      intervalId = setInterval(() => {
        nextSlide();
      }, slideInterval);
    };

    const stopSlideShow = () => {
      clearInterval(intervalId);
    };

    carouselPrevBtn.addEventListener("click", () => {
      prevSlide();
      stopSlideShow();
    });

    carouselNextBtn.addEventListener("click", () => {
      nextSlide();
      stopSlideShow();
    });

    // Start the slideshow when the component mounts
    startSlideShow();

    // Stop the slideshow when the component unmounts
    return () => {
      stopSlideShow();
    };
  }, []);

  return (
    <div>
      <Head>
        <title>cozycloths.com - Wrap Yourself in Cozy</title>
        <meta name="description" content="CozyCloths.com - Wrap Yourself In Cozy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="default-carousel" className="relative w-full" data-carousel="slide" ref={carouselRef}>
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/home1.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* Item 2 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/home2.jpeg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* Item 3 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/home3.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* Item 4 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/home4.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>

          {/* Previous button */}
          <button
            className="absolute z-10 hidden w-10 h-10 mt-24 text-white transition-colors duration-300 bg-gray-800 rounded-full left-2/3 -translate-x-1/2 -translate-y-1/2 top-1/2 md:-translate-y-1/2 md:left-1/12 md:top-1/2 md:-translate-x-1/2 hover:bg-gray-600 hover:text-gray-300 focus:outline-none"
            aria-label="Previous"
            data-carousel-prev
          >
            <span className="sr-only">Previous</span>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute z-10 hidden w-10 h-10 mt-24 text-white transition-colors duration-300 bg-gray-800 rounded-full right-2/3 -translate-x-1/2 -translate-y-1/2 top-1/2 md:-translate-y-1/2 md:right-1/12 md:top-1/2 md:-translate-x-1/2 hover:bg-gray-600 hover:text-gray-300 focus:outline-none"
            aria-label="Next"
            data-carousel-next
          >
            <span className="sr-only">Next</span>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators */}
          <ol className="absolute z-10 hidden space-x-2 text-gray-300 bottom-2 right-1/2 -translate-x-1/2 md:-translate-x-1/2 md:bottom-4">
            <li
              className="inline-block w-3 h-3 transition-colors duration-200 rounded-full cursor-pointer"
              data-carousel-slide-to="0"
              aria-current="true"
            ></li>
            <li
              className="inline-block w-3 h-3 transition-colors duration-200 rounded-full cursor-pointer"
              data-carousel-slide-to="1"
              aria-current="false"
            ></li>
            <li
              className="inline-block w-3 h-3 transition-colors duration-200 rounded-full cursor-pointer"
              data-carousel-slide-to="2"
              aria-current="false"
            ></li>
            <li
              className="inline-block w-3 h-3 transition-colors duration-200 rounded-full cursor-pointer"
              data-carousel-slide-to="3"
              aria-current="false"
            ></li>
          </ol>
        </div>
      </div>

      <style jsx>{`
        /* Styles for the carousel */
      `}</style>
    </div>
  );
}
