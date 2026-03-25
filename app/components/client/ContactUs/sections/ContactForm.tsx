"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useForm, useWatch } from "react-hook-form";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
import AnimatedHeading from "../../common/AnimateHeading";
import ContainerAnchor from "../../Layout/ContainerAnchor";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";

type ContactFormValues = {
  first: string;
  second: string;
  email: string;
  phone: string;
  message: string;
};

const PowerBehind = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const containerInset = useContainerLeftInset(containerRef);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      first: "",
      second: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const values = useWatch({ control });

  useEffect(() => {
    if (!successMessage || !successRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        successRef.current,
        { autoAlpha: 0, y: 18, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, [successMessage]);

  const onSubmit = async (data: ContactFormValues) => {
    setSuccessMessage("");
    await new Promise((resolve) => setTimeout(resolve, 300));
    reset();
    setSuccessMessage(`Thanks ${data.first}, your message has been sent successfully.`);
  };

  return (
    <section className="relative overflow-hidden py-130 3xl:py-150">
      <ContainerAnchor ref={containerRef} />

      <div
        className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[875px_auto] align-end"
        // style={{ paddingInline: containerInset }}
      >
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative" >
          <div style={{ paddingLeft: containerInset }} className="relative h-full ">
          <div className="pointer-events-none absolute right-0 bottom-0 z-0  ">
            <img src="/assets/shapes/contact-shape.svg" alt="" className="w-auto h-auto object-cover" />
          </div>

          <AnimatedHeading text="Let's Build Something Great Together" className="pb-2 font-medium md:pb-30" />

          <p className="cmn-p max-w-[41ch] font-bold">
            Whether you&apos;re planning a new project, need expert consultation, or
            want to discuss partnership opportunities, our team is ready to
            assist you. Reach out to us today and let&apos;s turn your vision into
            reality with precision, quality, and reliability.
          </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="" >
          <div style={{ paddingRight: containerInset }} className="relative pt-10">
            <div className="bg-light px-6 py-7 lg:px-8 xl:px-[12] 2xl:px-50 2xl:py-[65px] h-full">
          <form className="space-y-12" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
              <FloatingInput
                label="First Name"
                value={values.first}
                error={errors.first?.message}
                registration={register("first", {
                  required: "First name is required.",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters.",
                  },
                })}
              />
              <FloatingInput
                label="Second Name"
                value={values.second}
                error={errors.second?.message}
                registration={register("second", {
                  required: "Second name is required.",
                  minLength: {
                    value: 2,
                    message: "Second name must be at least 2 characters.",
                  },
                })}
              />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <FloatingInput
                label="Email Id"
                type="email"
                value={values.email}
                error={errors.email?.message}
                registration={register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
              <FloatingInput
                label="Mobile / Phone Number"
                value={values.phone}
                error={errors.phone?.message}
                registration={register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[+]?[\d\s()-]{7,20}$/,
                    message: "Enter a valid phone number.",
                  },
                })}
              />
            </div>

            <FloatingTextarea
              label="Write Message To Us"
              value={values.message}
              error={errors.message?.message}
              registration={register("message", {
                required: "Message is required.",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters.",
                },
              })}
            />

            {successMessage ? (
              <div
                ref={successRef}
                className="rounded-sm border border-[#D9D9D9] bg-white px-5 py-4 text-sm font-medium text-[#1E7A36]"
              >
                {successMessage}
              </div>
            ) : null}

            <div className="flex items-stretch gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex cursor-pointer items-center overflow-hidden border border-[#D9D9D9] px-10 py-4 text-lg font-medium transition-all duration-300 hover:border-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex aspect-square self-stretch cursor-pointer items-center justify-center overflow-hidden border border-[#D9D9D9] px-4 transition-all duration-300 hover:border-primary disabled:cursor-not-allowed disabled:opacity-70 xl:px-[25.25px]"
              >
                <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
                <Image src="/assets/icons/right-top-arrow-primary.svg" alt="Open" width={14} height={14}
                  className="pointer-events-none relative z-10 h-[14px] w-[14px] shrink-0 object-contain transition-all duration-300 group-hover:scale-110 group-hover:invert group-hover:brightness-0"
                />
              </button>
            </div>
          </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PowerBehind;
