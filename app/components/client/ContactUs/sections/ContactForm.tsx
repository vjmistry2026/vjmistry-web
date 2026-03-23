"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";  

const PowerBehind = () => {
    const [form, setForm] = useState({
    first: "",
    second: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    return (
       <section className="bg-[#f3f3f3] py-16 lg:py-24">
      <div className="container ">

       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[auto_895px] gap-4 xl:gap-10 2xl:gap-[80px]">
         {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className=" "
        >
          <h2 className="section-heading text-black mb-6">
            Let’s Build Something <br /> Great Together
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-[520px]">
            Whether you’re planning a new project, need expert consultation, or want
            to discuss partnership opportunities, our team is ready to assist you.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#ececec] px-6 lg:px-12 xl:px-20 py-10"
        >
          <form className="space-y-12">

            {/* ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <FloatingInput
                label="First Name"
                name="first"
                value={form.first}
                onChange={handleChange}
              />

              <FloatingInput
                label="Second Name"
                name="second"
                value={form.second}
                onChange={handleChange}
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <FloatingInput
                label="Email Id"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
              />

              <FloatingInput
                label="Mobile / Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

            </div>

            <FloatingTextarea
              label="Write Message To Us"
              name="message"
              value={form.message}
              onChange={handleChange}
            />

            <div className="flex items-center gap-4 pt-6">

              <button className="border border-gray-300 px-10 py-4 text-lg font-medium 
                                 hover:bg-black hover:text-white transition-all duration-300">
                Submit
              </button>

              <button className="border border-gray-300 w-[70px] h-[70px] flex items-center justify-center
                                 hover:bg-red-500 hover:text-white transition-all duration-300">
                →
              </button>

            </div>

          </form>
        </motion.div>
       </div>

      </div>
    </section>
    );
};

export default PowerBehind;