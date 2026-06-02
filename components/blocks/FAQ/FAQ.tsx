"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

const faqData = [
    {
        id: 1,
        question: "What services do you offer?",
        answer: (
            <>
                I provide a comprehensive suite of creative and technical services to bring your brand to life. Because I have a diverse skillset, I can handle projects that require multiple disciplines, ensuring consistency across your branding. My core services include:
                <br /><br />
                <strong>Graphic Design:</strong> Logo design, branding kits, social media graphics, brochures, and marketing collateral.
                <br /><br />
                <strong>Web Development:</strong> Custom WordPress sites, responsive front-end development (HTML/CSS/JS), and site maintenance.
                <br /><br />
                <strong>UI/UX Design:</strong> User interface prototyping, wireframing, and mobile app design layouts.
                <br /><br />
                <strong>Video Editing:</strong> Promotional videos, YouTube content editing, color grading, and motion graphics.
            </>
        )
    },
    {
        id: 2,
        question: "How does the design process work?",
        answer: (
            <>
                I believe in a transparent and collaborative process to ensure the final result matches your vision. While every project is unique, we generally follow these four steps:
                <br /><br />
                <strong>Discovery & Strategy:</strong> We start with a consultation to discuss your goals, target audience, and inspiration.
                <br /><br />
                <strong>Concept & Design:</strong> I create initial drafts, wireframes, or storyboards (depending on the service) for your review.
                <br /><br />
                <strong>Refinement:</strong> Based on your feedback, I refine the designs. We iterate until the work is polished.
                <br /><br />
                <strong>Launch & Delivery:</strong> Once approved, I package all final files in the necessary formats and deliver them to you (or launch your website).
            </>
        )
    },
    {
        id: 3,
        question: "How long does a project usually take?",
        answer: (
            <>
                Timelines depend heavily on the scope of the project and how quickly feedback is provided. However, here are some typical turnaround times:
                <br /><br />
                <strong>Logo/Branding:</strong> 1–2 weeks
                <br /><br />
                <strong>Standard Website (5 pages):</strong> 2–4 weeks
                <br /><br />
                <strong>UI/UX Project:</strong> 2–5 weeks
                <br /><br />
                <strong>Video Editing:</strong> 3–7 days per video
                <br /><br />
                <em>Note: I will provide a detailed timeline in our initial proposal so you know exactly what to expect.</em>
            </>
        )
    },
    {
        id: 4,
        question: "What do I need to provide before starting a project?",
        answer: (
            <>
                To get started efficiently, it helps if you have the following ready:
                <br /><br />
                <strong>Your Project Goal:</strong> What are you trying to achieve? (e.g., more sales, brand awareness).
                <br /><br />
                <strong>Content:</strong> Any text (copy), photos, or footage you want included.
                <br /><br />
                <strong>Branding Assets:</strong> If you already have a logo, fonts, or color palette, please provide them.
                <br /><br />
                <strong>Inspiration:</strong> Links to websites, designs, or videos you like are incredibly helpful for understanding your taste!
            </>
        )
    },
    {
        id: 5,
        question: "Do you offer revisions?",
        answer: (
            <>
                <strong>Yes!</strong> I want you to love the final product. My standard contracts include two to three rounds of revisions.
                <br /><br />
                During a &quot;round,&quot; you can provide a list of edits, and I will implement them all at once. If additional revisions are needed beyond the included rounds, they can be completed at my standard hourly rate. This ensures we stay on track and within budget.
            </>
        )
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles['faq-container']}>
            <div className={styles['faq-header']}>
                <h2 className={styles['faq-title']}>
                    <span className={styles['title-mobile']}>FAQ</span>
                    <span className={styles['title-desktop']}>FREQUENTLY ASKED QUESTIONS</span>
                </h2>
                <p className={styles['faq-description']}>
                    Here are answers to some of the most common questions I receive as a
                    freelance designer. If you don’t see your question here, feel free to
                    reach out—I’m happy to help!
                </p>
            </div>
            <div className={styles['faq-list']}>
                {faqData.map((item, index) => (
                    <div key={item.id} className={`${styles['faq-item']} ${activeIndex === index ? styles['active'] : ''}`}>
                        <div
                            className={styles['question-header']}
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className={styles['question-text']}>
                                {item.id}. {item.question}
                            </span>
                            <div className={`${styles['chevron']} ${activeIndex === index ? styles['rotate'] : ''}`}></div>
                        </div>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={styles['answer-container']}
                                >
                                    <div className={styles['answer-text']}>
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
