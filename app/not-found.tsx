"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "./components/motionVariants";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, #1C1C1C 1px, transparent 1px),
            linear-gradient(to bottom, #1C1C1C 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.07, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="container">
          <div className="max-w-full sm:max-w-120 md:max-w-140 lg:max-w-200 mx-auto text-center">
            {/* 404 Number */}
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              animate="show"
              className="mb-4 sm:mb-6 lg:mb-8"
            >
              <motion.h1
                className="text-[65px] sm:text-[85px] md:text-[100px] lg:text-[140px] xl:text-[160px] 2xl:text-[180px] 3xl:text-[200px] font-condensed leading-[100%] text-primary flex justify-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4"
              >
                {["4", "0", "4"].map((digit, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 100, opacity: 0, rotateX: -90 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      y: { duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] },
                      opacity: { duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] },
                      rotateX: { duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3 + 1.2,
                      },
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {digit}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Error Message */}
            <motion.h2
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="section-heading text-secondary mb-4 sm:mb-6"
            >
              Page Not Found
            </motion.h2>

            <motion.p
              variants={moveUp(0.3)}
              initial="hidden"
              animate="show"
              className="section-description text-paragraph max-w-[95%] sm:max-w-[90%] md:max-w-110 lg:max-w-125 mx-auto mb-4 sm:mb-6 md:mb-8 text-12 sm:text-13 md:text-14 lg:text-16"
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              animate="show"
              className="flex justify-center"
            >
              <Link
                href="/"
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-primary text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 overflow-hidden transition-all duration-300 hover:bg-secondary"
              >
                <motion.span
                  className="relative z-10 text-12 sm:text-13 md:text-14 lg:text-16 xl:text-17 font-nexa font-bold"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Back to Home
                </motion.span>
                <motion.svg
                  className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>

            {/* Additional helpful links */}
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              animate="show"
              className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 text-11 sm:text-12 md:text-13 lg:text-16 font-nexa font-bold text-paragraph"
            >
              <span className="text-center sm:text-left">Or try visiting:</span>
              <div className="flex gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 flex-wrap justify-center">
                <Link href="/" className="text-primary hover:text-secondary transition-colors duration-300">
                  Home
                </Link>
                <span className="text-border">|</span>
                <Link href="/about-us/overview" className="text-primary hover:text-secondary transition-colors duration-300">
                  About Us
                </Link>
                <span className="text-border">|</span>
                <Link href="/projects" className="text-primary hover:text-secondary transition-colors duration-300">
                  Projects
                </Link>
                <span className="text-border">|</span>
                <Link href="/contact-us" className="text-primary hover:text-secondary transition-colors duration-300">
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
