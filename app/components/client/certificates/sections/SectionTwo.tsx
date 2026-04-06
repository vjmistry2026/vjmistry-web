"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeading from "../../common/AnimateHeading";
import InteractiveInfoCard from "../../common/InteractiveInfoCard";
import { moveUp } from "@/app/components/motionVariants";

const SectionTwo = ({ data }: { data: CertificateType['secondSection'] }) => {
  const [activeId, setActiveId] = useState<string | null>(data.items[0]?._id ?? null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!data.items.length || typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let frameId: number | null = null;

    const updateActiveCard = () => {
      if (!mobileQuery.matches) {
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestId: string | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceToCenter = Math.abs(cardCenter - viewportCenter);

        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          closestId = data.items[index]?._id ?? null;
        }
      });

      if (closestId) {
        setActiveId(closestId);
      }
    };

    const requestActiveCardUpdate = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updateActiveCard);
    };

    requestActiveCardUpdate();

    const handleChange = () => {
      requestActiveCardUpdate();
    };

    window.addEventListener("scroll", requestActiveCardUpdate, { passive: true });
    window.addEventListener("resize", requestActiveCardUpdate);
    mobileQuery.addEventListener("change", handleChange);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestActiveCardUpdate);
      window.removeEventListener("resize", requestActiveCardUpdate);
      mobileQuery.removeEventListener("change", handleChange);
    };
  }, [data.items]);

  return (
    <section className="py-100 lg:py-130 3xl:py-130 bg-light">
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-30" />
        <motion.p
          variants={moveUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="cmn-p font-bold mb-5 xl:mb-10 2xl:mb-15 max-w-3xl"
        >
          {data.description}
        </motion.p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8 3xl:gap-10">
          {data.items.map((item, index) => {
            const isActive = activeId === item._id;

            return (
              <motion.article
                key={item._id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-card-id={item._id}
                variants={moveUp(index * 0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                tabIndex={0}
                onMouseEnter={() => setActiveId(item._id)}
                onFocus={() => setActiveId(item._id)}
                onClick={() => setActiveId(item._id)}
                className="outline-none"
              >
                <InteractiveInfoCard
                  icon={item.image}
                  title={item.title}
                  description={item.description}
                  isActive={isActive}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
