"use client";

import Image from "next/image";
import styles from "./Services.module.css";
/* import GraphicDesigner from '../public/images/vectors/graphic-designer.svg'; 
import UiuxDesign from '../public/images/vectors/uiux-designer.svg'; 
import VideoEditor from '../public/images/vectors/video-editor.svg'; 
import WebDevelopment from '../public/images/vectors/web-development.svg';  */
 import GraphicDesigner from '../../icons/GraphicDesigner';
 import WebDevelopment from '../../icons/WebDevelopment';
 import UiuxDesign from '../../icons/UiuxDesign';
 import VideoEditor from '../../icons/VideoEditor';

  console.log('GraphicDesigner:', GraphicDesigner);

type Service = {
  id: number;
  title: string;
  items: string[];
  description: string;
  //image: string;
  //imageSrc?: string;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  categoryId: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Graphic Design",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
    description: "Logo and brand identity, social media and ad graphics, infographics, and custom illustrations/icons.",
    //image: "/images/vectors/graphic-designer.svg",
    IconComponent: GraphicDesigner,
    categoryId: "graphic-design",
  },
  {
    id: 2,
    title: "Web Development",
    items: [
      "Custom responsive website building",
      "Front-end development and animations",
      "CMS integration and e-commerce",
      " maintenance & performance tuning",
    ],
    description: "Responsive websites, front-end animations, CMS/e-commerce, performance maintenance.",
    //image: "/images/vectors/web-development.svg",
    IconComponent: WebDevelopment,
    categoryId: "web-development",
  },
  {
    id: 3,
    title: "UI / UX Design",
    items: [
      "Web and mobile app interface design",
      "Wireframing and interactive prototypes",
      "User journey mapping and flow charts",
      "Design systems and style guides",
    ],
    description: "Web and mobile UI, wireframes and prototypes, user flows, design systems.",
    //image: "/images/vectors/uiux-designer.svg",
    IconComponent: UiuxDesign,
    categoryId: "ui-ux-design",
  },
  {
    id: 4,
    title: "Video Editing",
    items: [
      "Promotional and social media editing",
      "Motion graphics and text animation",
      "Color correction and visual effects",
      "Audio mixing and sound enhancement",
    ],
    description: "Social and promo editing, motion graphics, color correction, visual effects, audio mixing.",
    //image: "/images/vectors/video-editor.svg",
    IconComponent: VideoEditor,
    categoryId: "video-editing",
  },
];

export default function Services() {
  const handleServiceClick = (categoryId: string) => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      // Update URL hash without triggering a page jump
      window.history.pushState(null, "", `#portfolio-${categoryId}`);
      
      // Smooth scroll to portfolio section
      portfolioSection.scrollIntoView({ behavior: "smooth" });
      
      // Dispatch custom event for FeaturedProjects to listen to
      window.dispatchEvent(new CustomEvent("changeFeaturedCategory", { detail: categoryId }));
    }
  };



  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>My Services</h2>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => {
          // Determine if image should be on right (for 2nd and 4th cards - indices 1 and 3) - MOBILE ONLY
          const imageOnRight = index % 2 === 1;
          
          return (
            <div 
              key={service.id} 
              className={`${styles.serviceCard} ${imageOnRight ? styles.imageRight : ''}`}
            >
              <div className={styles.cardImage}>
                <service.IconComponent
                  width={180} // Pass desired props
                  height={180}
                  className={styles.svgIcon} // Apply any specific styles for the icon
                  // You can pass other SVG props here too, like aria-label, etc.
                  // aria-label={`Icon for ${service.title}`} 
                />
              </div>

              <div className={styles.cardText}>
                <h3>{service.title}</h3>
                <ul className={styles.itemsList}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.description}>{service.description}</p>
              </div>

              <button 
                className={styles.cardArrow}
                onClick={() => handleServiceClick(service.categoryId)}
                aria-label={`View ${service.title} projects`}
              >
                <Image
                  src="/images/vectors/card-arrow.svg"
                  alt=""
                  width={50}
                  height={50}
                  sizes="50px"
                  quality={75}
                />
              </button>
            </div>
          );
        })}
      </div>

    </section>
  );
}
