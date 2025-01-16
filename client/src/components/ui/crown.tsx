import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CrownProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  animated?: boolean;
}

export function Crown({ className, animated = false, ...props }: CrownProps) {
  const CrownElement = animated ? motion.svg : "svg";

  return (
    <CrownElement
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      {...(animated ? {
        initial: { scale: 0.95, opacity: 0.8 },
        animate: { 
          scale: [0.95, 1.05, 0.95],
          opacity: [0.8, 1, 0.8]
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {})}
      {...props}
    >
      <motion.path
        d="M50 10L65 25L80 15L75 40L25 40L20 15L35 25L50 10Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={animated ? {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1
        } : undefined}
      />
      <motion.path
        d="M25 40H75V80C75 85.5228 70.5228 90 65 90H35C29.4772 90 25 85.5228 25 80V40Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={animated ? {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 0.5
        } : undefined}
      />
      <motion.circle 
        cx="35" 
        cy="20" 
        r="3" 
        fill="currentColor"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? {
          duration: 0.5,
          delay: 2
        } : undefined}
      />
      <motion.circle 
        cx="50" 
        cy="15" 
        r="3" 
        fill="currentColor"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? {
          duration: 0.5,
          delay: 2.2
        } : undefined}
      />
      <motion.circle 
        cx="65" 
        cy="20" 
        r="3" 
        fill="currentColor"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? {
          duration: 0.5,
          delay: 2.4
        } : undefined}
      />
    </CrownElement>
  );
}