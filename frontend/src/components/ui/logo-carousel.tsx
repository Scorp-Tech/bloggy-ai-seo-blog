import { useEffect, useState, useRef, JSX } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

export interface CarouselProps {
  items: string[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 8;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function LogoCarousel({
  items,
  baseWidth = 100,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
}: CarouselProps): JSX.Element {
  const trackItemOffset = baseWidth + GAP;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, items.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden p-4 w-full">
      <motion.div
        className="flex"
        drag="x"
        style={{ x, gap: `${GAP}px` }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
      >
        {items.map((logo, index) => (
          <motion.div
            key={index}
            className="shrink-0 p-2 bg-white rounded-lg shadow-md flex items-center justify-center"
            style={{ width: baseWidth, height: baseWidth }}
          >
            <img src={logo} alt={`Logo ${index + 1}`} className="h-full w-full object-contain" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
