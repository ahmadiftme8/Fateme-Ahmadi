"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, PanInfo, animate, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { FaDribbble, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Project = {
    id?: string | number;
    thumbnail_img?: string;
    imageSrc?: string;
    URL?: string;
    title?: string;
    Title?: string;
    name?: string;
    excerpt?: string;
    description?: string;
    isDribbble?: boolean; // New flag for the CTA card
    isUnderConstruction?: boolean; // Flag for under construction card
    [key: string]: unknown;
};

interface WheelCarouselProps {
    projects: Project[];
    activeCategory?: string;
}

const CARD_WIDTH = 242;
const GAP = 11; // Gap between cards

export default function WheelCarousel({ projects, activeCategory }: WheelCarouselProps) {
    // 1. Prepare Data: Add Dribbble or Under Construction Card
    const projectsWithCta = useMemo(() => {
        const isUnderConstructionCategory = activeCategory === "ui-ux-design" || activeCategory === "video-editing";

        if (isUnderConstructionCategory) {
            const constructionCard: Project = {
                id: "under-construction",
                isUnderConstruction: true,
                title: "Under Construction",
            };
            return [...projects, constructionCard];
        }

        const dribbbleCard: Project = {
            id: "dribbble-cta",
            isDribbble: true,
            title: "Check out my Dribbble",
            description: "If you want to see more graphic design works, check out my Dribbble.",
            URL: "https://dribbble.com/ftm_psd"
        };
        return [...projects, dribbbleCard];
    }, [projects, activeCategory]);

    const totalItems = projectsWithCta.length;
    const itemFullWidth = CARD_WIDTH + GAP;

    // Start at index 0 - no infinite scrolling
    const [centerIndex, setCenterIndex] = useState(0);
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewWidth, setViewWidth] = useState(0);

    // Update viewWidth on mount and resize
    useEffect(() => {
        if (!containerRef.current) return;

        const updateWidth = () => {
            if (containerRef.current) {
                setViewWidth(containerRef.current.offsetWidth);
            }
        };

        // Initial measure
        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(containerRef.current);

        window.addEventListener('resize', updateWidth);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    // Initial Positioning
    useEffect(() => {
        if (viewWidth === 0) return;
        const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
        const initialX = centerOffset - (0 * itemFullWidth);
        x.set(initialX);
        setCenterIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemFullWidth, x]);

    // Listen to resize to maintain relative position of current index
    useEffect(() => {
        if (viewWidth === 0) return;
        const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
        const targetX = centerOffset - (centerIndex * itemFullWidth);
        x.set(targetX);
    }, [viewWidth, centerIndex, itemFullWidth, x]);

    // Track active index based on position
    useMotionValueEvent(x, "change", (latest) => {
        if (viewWidth === 0) return;
        const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
        const rawIndex = (centerOffset - latest) / itemFullWidth;
        const roundedIndex = Math.round(rawIndex);

        // Clamp to valid bounds
        const clampedIndex = Math.max(0, Math.min(totalItems - 1, roundedIndex));

        if (clampedIndex !== centerIndex) {
            setCenterIndex(clampedIndex);
        }
    });

    // Handle Drag End with Inertia - with bounds checking
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (viewWidth === 0) return;
        const velocity = info.velocity.x;
        const currentX = x.get();
        const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;

        const power = 0.2;
        const estimatedEnd = currentX + velocity * power;

        const rawIndex = (centerOffset - estimatedEnd) / itemFullWidth;
        let targetIndex = Math.round(rawIndex);
        
        // Clamp to valid bounds - stop at edges
        targetIndex = Math.max(0, Math.min(totalItems - 1, targetIndex));

        const targetX = centerOffset - (targetIndex * itemFullWidth);

        animate(x, targetX, {
            type: "spring",
            stiffness: 200,
            damping: 30
        });
    };

    // Click to center functionality - with bounds checking
    const handleCardClick = (index: number) => {
        if (viewWidth === 0) return;
        
        // Clamp to valid bounds
        const clampedIndex = Math.max(0, Math.min(totalItems - 1, index));
        
        const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
        const targetX = centerOffset - (clampedIndex * itemFullWidth);

        animate(x, targetX, {
            type: "spring",
            stiffness: 200,
            damping: 30
        });
    };

    // Arrow Navigation - with bounds checking
    const handleNext = () => {
        if (centerIndex < totalItems - 1) {
            handleCardClick(centerIndex + 1);
        }
    };

    const handlePrev = () => {
        if (centerIndex > 0) {
            handleCardClick(centerIndex - 1);
        }
    };

    // Virtualization Logic - only render visible items within bounds
    const BUFFER = 5;
    const visibleIndices = [];
    for (let i = Math.max(0, centerIndex - BUFFER); i <= Math.min(totalItems - 1, centerIndex + BUFFER); i++) {
        visibleIndices.push(i);
    }

    return (
        <div className="w-full relative pt-0 pb-10 flex flex-col gap-0 lg:max-w-[800px] lg:mx-auto">
            {/* Desktop Navigation Arrows - Positioned relative to this container */}
            <button
                onClick={handlePrev}
                disabled={centerIndex === 0}
                className={`hidden lg:flex absolute top-[190px] -left-[50px] -translate-y-1/2 z-20 w-[60px] h-[60px] items-center justify-center bg-(--color-foreground-lowopacity3) rounded-full border-none text-(--color-foreground-lowopacity) text-4xl cursor-pointer hover:scale-110 transition-transform ${centerIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Previous project"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={handleNext}
                disabled={centerIndex === totalItems - 1}
                className={`hidden lg:flex absolute top-[190px] -right-[50px] -translate-y-1/2 z-20 w-[60px] h-[60px] items-center justify-center bg-(--color-foreground-lowopacity3) rounded-full border-none text-(--color-foreground-lowopacity) text-4xl cursor-pointer hover:scale-110 transition-transform ${centerIndex === totalItems - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Next project"
            >
                <FaChevronRight />
            </button>

            {/* Carousel Track Container - Constrained Width on Desktop */}
            <div
                ref={containerRef}
                className="w-full lg:w-[760px] mx-auto overflow-hidden relative"
            >
                <div
                    className="w-full h-[430px] flex items-center relative pt-10"
                >
                    <motion.div
                        className="absolute left-0 w-full h-full"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: -5000000, right: 5000000 }}
                        onDragEnd={handleDragEnd}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {visibleIndices.map((index) => {
                            const project = projectsWithCta[index];

                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: "absolute",
                                        left: index * itemFullWidth,
                                        width: CARD_WIDTH,
                                    }}
                                >
                                    <WheelCard
                                        project={project}
                                        isActive={index === centerIndex}
                                        onClick={() => handleCardClick(index)}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                total={totalItems}
                active={centerIndex}
            />
        </div>
    );
}

/* ========================================
 * BACKUP: ORIGINAL INFINITE SCROLL VERSION
 * ========================================
 * This code is kept for reference but is completely commented out
 * and will not render in the DOM or affect browser performance.
 * 
 * export default function WheelCarousel({ projects }: WheelCarouselProps) {
 *     // 1. Prepare Data: Add Dribbble Card
 *     const projectsWithCta = useMemo(() => {
 *         const dribbbleCard: Project = {
 *             id: "dribbble-cta",
 *             isDribbble: true,
 *             title: "Check out my Dribbble",
 *             description: "If you want to see more graphic design works, check out my Dribbble.",
 *             URL: "https://dribbble.com/ftm_psd"
 *         };
 *         return [...projects, dribbbleCard];
 *     }, [projects]);
 * 
 *     const totalItems = projectsWithCta.length;
 *     const itemFullWidth = CARD_WIDTH + GAP;
 * 
 *     // Start at a huge index to allow practically infinite scrolling left/right
 *     const START_INDEX = 10000;
 *     const [centerIndex, setCenterIndex] = useState(START_INDEX);
 *     const x = useMotionValue(0);
 *     const containerRef = useRef<HTMLDivElement>(null);
 *     const [viewWidth, setViewWidth] = useState(0);
 * 
 *     // Update viewWidth on mount and resize
 *     useEffect(() => {
 *         if (!containerRef.current) return;
 * 
 *         const updateWidth = () => {
 *             if (containerRef.current) {
 *                 setViewWidth(containerRef.current.offsetWidth);
 *             }
 *         };
 * 
 *         // Initial measure
 *         updateWidth();
 * 
 *         const observer = new ResizeObserver(updateWidth);
 *         observer.observe(containerRef.current);
 * 
 *         window.addEventListener('resize', updateWidth);
 *         return () => {
 *             observer.disconnect();
 *             window.removeEventListener('resize', updateWidth);
 *         };
 *     }, []);
 * 
 *     // Initial Positioning
 *     useEffect(() => {
 *         if (viewWidth === 0) return;
 *         const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
 *         const initialX = centerOffset - (START_INDEX * itemFullWidth);
 *         x.set(initialX);
 *         setCenterIndex(START_INDEX);
 *         // We only want to run this ONCE when viewWidth is first established/stable or reset
 *         // eslint-disable-next-line react-hooks/exhaustive-deps
 *     }, [itemFullWidth, x]); // Removed viewWidth from deps to prevent reset on resize, handle resize separately if needed? 
 *     // Actually, on resize, we DO want to re-center the current index.
 * 
 *     // Listen to resize to maintain relative position of current index
 *     useEffect(() => {
 *         if (viewWidth === 0) return;
 *         const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
 *         const targetX = centerOffset - (centerIndex * itemFullWidth);
 *         x.set(targetX);
 *     }, [viewWidth, centerIndex, itemFullWidth, x]);
 * 
 * 
 *     // Track active index based on position
 *     useMotionValueEvent(x, "change", (latest) => {
 *         if (viewWidth === 0) return;
 *         const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
 *         const rawIndex = (centerOffset - latest) / itemFullWidth;
 *         const roundedIndex = Math.round(rawIndex);
 * 
 *         if (roundedIndex !== centerIndex) {
 *             setCenterIndex(roundedIndex);
 *         }
 *     });
 * 
 *     // Handle Drag End with Inertia 
 *     const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
 *         if (viewWidth === 0) return;
 *         const velocity = info.velocity.x;
 *         const currentX = x.get();
 *         const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
 * 
 *         const power = 0.2;
 *         const estimatedEnd = currentX + velocity * power;
 * 
 *         const rawIndex = (centerOffset - estimatedEnd) / itemFullWidth;
 *         const targetIndex = Math.round(rawIndex);
 * 
 *         const targetX = centerOffset - (targetIndex * itemFullWidth);
 * 
 *         animate(x, targetX, {
 *             type: "spring",
 *             stiffness: 200,
 *             damping: 30
 *         });
 *     };
 * 
 *     // Click to center functionality
 *     const handleCardClick = (index: number) => {
 *         if (viewWidth === 0) return;
 *         const centerOffset = viewWidth / 2 - CARD_WIDTH / 2;
 *         const targetX = centerOffset - (index * itemFullWidth);
 * 
 *         animate(x, targetX, {
 *             type: "spring",
 *             stiffness: 200,
 *             damping: 30
 *         });
 *     };
 * 
 *     // Arrow Navigation
 *     const handleNext = () => {
 *         handleCardClick(centerIndex + 1);
 *     };
 * 
 *     const handlePrev = () => {
 *         handleCardClick(centerIndex - 1);
 *     };
 * 
 *     // Virtualization Logic
 *     const BUFFER = 5;
 *     const visibleIndices = [];
 *     for (let i = centerIndex - BUFFER; i <= centerIndex + BUFFER; i++) {
 *         visibleIndices.push(i);
 *     }
 * 
 *     // Pagination mapping
 *     const activeDotIndex = ((centerIndex % totalItems) + totalItems) % totalItems;
 * 
 *     return (
 *         <div className="w-full relative pt-0 pb-10 flex flex-col gap-0 lg:max-w-[800px] lg:mx-auto">
 *             <button
 *                 onClick={handlePrev}
 *                 className="hidden lg:flex absolute top-[190px] -left-[50px] -translate-y-1/2 z-20 w-[60px] h-[60px] items-center justify-center bg-[#e3e3e3] rounded-full border-none text-[var(--color-primary)] text-4xl cursor-pointer hover:scale-110 transition-transform"
 *                 aria-label="Previous project"
 *             >
 *                 <FaChevronLeft />
 *             </button>
 *             <button
 *                 onClick={handleNext}
 *                 className="hidden lg:flex absolute top-[190px] -right-[50px] -translate-y-1/2 z-20 w-[60px] h-[60px] items-center justify-center bg-[#e3e3e3] rounded-full border-none text-[var(--color-primary)] text-4xl cursor-pointer hover:scale-110 transition-transform"
 *                 aria-label="Next project"
 *             >
 *                 <FaChevronRight />
 *             </button>
 * 
 *             <div
 *                 ref={containerRef}
 *                 className="w-full lg:w-[760px] mx-auto overflow-hidden relative"
 *             >
 *                 <div
 *                     className="w-full h-[470px] flex items-center relative pt-10"
 *                 >
 *                     <motion.div
 *                         className="absolute left-0 w-full h-full"
 *                         style={{ x }}
 *                         drag="x"
 *                         dragConstraints={{ left: -5000000, right: 5000000 }}
 *                         onDragEnd={handleDragEnd}
 *                         whileTap={{ cursor: "grabbing" }}
 *                     >
 *                         {visibleIndices.map((virtualIndex) => {
 *                             const projectIndex = ((virtualIndex % totalItems) + totalItems) % totalItems;
 *                             const project = projectsWithCta[projectIndex];
 * 
 *                             return (
 *                                 <div
 *                                     key={virtualIndex}
 *                                     style={{
 *                                         position: "absolute",
 *                                         left: virtualIndex * itemFullWidth,
 *                                         width: CARD_WIDTH,
 *                                     }}
 *                                 >
 *                                     <WheelCard
 *                                         project={project}
 *                                         isActive={virtualIndex === centerIndex}
 *                                         onClick={() => handleCardClick(virtualIndex)}
 *                                     />
 *                                 </div>
 *                             );
 *                         })}
 *                     </motion.div>
 *                 </div>
 *             </div>
 * 
 *             <Pagination
 *                 total={totalItems}
 *                 active={activeDotIndex}
 *             />
 *         </div>
 *     );
 * }
 * ======================================== */

function WheelCard({ project, isActive, onClick }: { project: Project, isActive: boolean, onClick: () => void }) {
    // Styles preserved exactly

    if (project.isUnderConstruction) {
        return (
            <motion.div
                layout
                onClick={onClick}
                animate={{
                    height: isActive ? 388 : 343,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 10 : 1,
                    scale: isActive ? 1 : 0.95,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    flex flex-col items-center justify-center p-[20px] bg-[#E3E3E3] rounded-[28px]
                    w-[242px] shrink-0 cursor-pointer overflow-hidden
                    ${isActive ? 'shadow-[-2px_3px_33.5px_rgba(0,0,0,0.15)]' : ''}
                `}
            >
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <Image
                        src="/images/gif/Under-Construction.gif"
                        alt="Under Construction"
                        width={150}
                        height={150}
                        sizes="150px"
                        quality={75}
                        className="object-contain"
                    />
                    <p className="font-poppins font-semibold text-[16px] text-[var(--color-primary)] mt-2">
                        Under Construction
                    </p>
                </div>
            </motion.div>
        );
    }

    if (project.isDribbble) {
        return (
            <motion.div
                layout // Keep layout for smooth size transitions
                onClick={onClick}
                animate={{
                    height: isActive ? 388 : 343,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 10 : 1,
                    scale: isActive ? 1 : 0.95,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    flex flex-col items-center justify-between p-[20px] bg-[#E3E3E3] rounded-[28px]
                    w-[242px] shrink-0 cursor-pointer overflow-hidden
                    ${isActive ? 'shadow-[-2px_3px_33.5px_rgba(0,0,0,0.15)]' : ''}
                `}
                style={{
                    backgroundColor: "#ea4c89",
                    color: "white"
                }}
            >
                <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 text-center">
                    <FaDribbble className="w-16 h-16 text-white" />
                    <p className="font-poppins font-medium text-[14px] leading-tight text-white px-2">
                        {project.description}
                    </p>
                </div>

                <a
                    href={project.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-white text-[#ea4c89] font-bold rounded-full text-sm hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    Check Dribbble
                </a>
            </motion.div>
        );
    }

    // Standard Card
    const image = project.thumbnail_img || project.imageSrc || project.URL || "/images/placeholder.jpg";
    const title = project.title || project.Title || project.name || "Project Title";
    const subtitle = project.excerpt || project.description || "Project Description";

    return (
        <motion.div
            layout // Keep layout for smooth size transitions
            onClick={onClick}
            animate={{
                height: isActive ? 388 : 343,
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 10 : 1,
                scale: isActive ? 1 : 0.95,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
                flex flex-col items-center p-[5px] gap-[11px] bg-(--color-background-lowopacity) rounded-[28px]
                w-[242px] shrink-0 cursor-pointer
                ${isActive ? 'shadow-[-2px_3px_33.5px_rgba(0,0,0,0.15)]' : ''}
            `}
        >
            {/* Image Area */}
            <motion.div
                className="relative w-full rounded-[25px] overflow-hidden"
                animate={{
                    height: isActive ? 321 : 281
                }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="242px"
                    quality={75}
                    className="object-cover"
                />
            </motion.div>

            {/* Text Area */}
            <div className="w-full pl-[12px] pb-[7px] text-left">
                <h3 className="font-poppins font-semibold text-[14px] text-(--color-foreground) leading-tight">
                    {title}
                </h3>
                <p className="font-poppins font-light text-[9px] text-(--color-foreground) mt-1 line-clamp-2">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    );
}

function Pagination({ total, active }: { total: number, active: number }) {
    return (
        <div className="flex justify-center items-center gap-[3px]">
            {Array.from({ length: total }).map((_, i) => {
                const isActive = i === active;
                // Since this uses modulo logic, neighbor calculation is trickier visually, 
                // but standard simple Neighbor logic works fine for now or we can simplify.
                // Simulating neighbor visually for the circular buffer:
                const isNeighbor = Math.abs(i - active) === 1 || Math.abs(i - active) === (total - 1);

                // Determine size
                let sizeClass = "w-[6px] h-[6px]"; // Default/Outer
                if (isActive) sizeClass = "w-[17px] h-[9px]";
                else if (isNeighbor) sizeClass = "w-[9px] h-[9px]";

                return (
                    <motion.div
                        key={i}
                        className={`rounded-full ${sizeClass}`}
                        animate={{
                            width: isActive ? 17 : (isNeighbor ? 9 : 6),
                            height: isActive ? 9 : (isNeighbor ? 9 : 6),
                            backgroundColor: isActive ? "var(--color-primary)" : "var(--color-background-lowopacity)"
                        }}
                    />
                );
            })}
        </div>
    )
}
