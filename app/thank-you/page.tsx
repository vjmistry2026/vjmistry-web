"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../components/motionVariants";

export default function ThankYouPage() {
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
            {/* Checkmark Icon */}
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              animate="show"
              className="mb-4 sm:mb-6 lg:mb-8 flex justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative"
              >
                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Thank You Heading */}
            <motion.h1
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="text-[40px] sm:text-[55px] md:text-[70px] lg:text-[90px] xl:text-[100px] font-condensed leading-[100%] text-primary mb-4 sm:mb-6"
            >
              Thank You!
            </motion.h1>

            {/* Message */}
            <motion.h2
              variants={moveUp(0.3)}
              initial="hidden"
              animate="show"
              className="section-heading text-secondary mb-4 sm:mb-6"
            >
              Your Request Has Been Received
            </motion.h2>

            <motion.p
              variants={moveUp(0.4)}
              initial="hidden"
              animate="show"
              className="section-description text-paragraph max-w-[95%] sm:max-w-[90%] md:max-w-110 lg:max-w-125 mx-auto mb-4 sm:mb-6 md:mb-8 text-12 sm:text-13 md:text-14 lg:text-16"
            >
              Our team will review it within 5–7 working days and get in touch with you.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={moveUp(0.5)}
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
          </div>
        </div>
      </main>
    </div>
  );
}