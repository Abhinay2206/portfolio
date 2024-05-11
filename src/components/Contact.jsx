/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { StarsCanvas } from "./canvas";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmissionResult("success");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSubmissionResult("error");
      }
    } catch (error) {
      setSubmissionResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <StarsCanvas />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          {/* Form fields */}
        </form>

        {submissionResult === "success" && <p>Message sent successfully!</p>}
        {submissionResult === "error" && <p>Error sending message. Please try again later.</p>}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        {/* EarthCanvas */}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
