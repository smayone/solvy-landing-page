import { cn } from "@/lib/utils";

interface CrownProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Crown({ className, ...props }: CrownProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      {...props}
    >
      <path
        d="M50 10L65 25L80 15L75 40L25 40L20 15L35 25L50 10Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M25 40H75V80C75 85.5228 70.5228 90 65 90H35C29.4772 90 25 85.5228 25 80V40Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="35" cy="20" r="3" fill="currentColor" />
      <circle cx="50" cy="15" r="3" fill="currentColor" />
      <circle cx="65" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}
