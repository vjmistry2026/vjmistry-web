"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useForm, useWatch } from "react-hook-form";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
import AnimatedHeading from "../../common/AnimateHeading";
import ContainerAnchor from "../../Layout/ContainerAnchor";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import CustomButton from "../../common/CustomButton";
import { ContactType } from "@/app/types/contact";
import ReCAPTCHA from 'react-google-recaptcha';

type ContactFormValues = {
  first: string;
  second: string;
  email: string;
  phone: string;
  message: string;
};

const PowerBehind = ({ data }: { data: ContactType['firstSection'] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const containerInset = useContainerLeftInset(containerRef);
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [error, setError] = useState("")
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
    try {
      setSuccessMessage("");
      if (!captchaToken) {
        setError("Please verify yourself to continue")
        return;
      }
      setError("")
      const response = await fetch("/api/admin/contact/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessMessage(`Thanks ${data.first}, your message has been sent successfully.`);
        reset()
        setCaptchaToken(null);
        setCaptchaKey((key) => key + 1);
      } else {
        alert("Something went wrong, try again")
      }
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <section className="relative overflow-hidden py-40 sm:py-130 3xl:py-150">
      <ContainerAnchor ref={containerRef} />
      <div
        className="grid grid-cols-1 align-end lg:grid-cols-2 2xl:grid-cols-[1.2fr_1.5fr] 3xl:grid-cols-[875px_auto]"
        style={{ "--container-inset": `${containerInset}px` } as CSSProperties}
      >
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative mb-10 lg:mb-0"  >
          <div className="relative h-full px-[var(--container-inset)] lg:pr-0">
            <div className="pointer-events-none absolute bottom-0 left-0 z-0 lg:left-auto lg:right-0">
              <img src="/assets/shapes/contact-shape.svg" alt="" className="h-auto w-[50%] object-cover sm:w-[60%] md:w-[320px] lg:w-auto" />
            </div>

            <AnimatedHeading text="Let's Build Something Great Together" className="mb-30" />

            <p className="cmn-p max-w-[41ch] font-bold">
              {data.description}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="" >
          <div className="relative px-[var(--container-inset)] lg:pl-0 lg:pr-[var(--container-inset)]">
            <div className="bg-light px-6 py-7 lg:px-8 xl:px-[12] 2xl:px-50 2xl:py-[65px] h-full">
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-8 md:space-y-12 xl:space-y-17 3xl:space-y-[67.85px]">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 h-full">
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

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
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
                </div>

                <div className="mt-8 md:mt-12 xl:mt-17 3xl:mt-[67.85px] mb-6 md:mb-8 xl:mb-12 3xl:mb-5">
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
                </div>

                {successMessage ? (
                  <div
                    ref={successRef}
                    className="rounded-sm border border-[#D9D9D9] bg-white px-5 py-4 text-sm font-medium text-[#1E7A36]"
                  >
                    {successMessage}
                  </div>
                ) : null}


                <div className="flex items-stretch gap-4 pt-0 flex-col">
                  <ReCAPTCHA
                    key={captchaKey}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      if (token) {
                        setError("");
                      }
                    }}
                    onExpired={() => setCaptchaToken(null)}
                    className='mt-5'
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  <CustomButton
                    label={isSubmitting ? "Sending..." : "Submit"}
                    href=""
                    textColor="black"
                    type="submit"
                    disabled={isSubmitting}
                  />
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
