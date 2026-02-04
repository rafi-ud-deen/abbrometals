import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "./utils/cn";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";

// ============== ANIMATION HOOKS ==============

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);

  return { count, ref };
}

// Scroll reveal hook with parallax
function useScrollReveal(speed: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const relativeScroll = scrolled - elementTop + window.innerHeight;
        setScrollY(relativeScroll * speed * 0.1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, isVisible, scrollY };
}

// Mouse position hook for spotlight effect
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

// Typewriter effect hook
function useTypewriter(
  texts: string[],
  speed: number = 100,
  pause: number = 2000,
) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (index < currentText.length) {
            setDisplayText(currentText.slice(0, index + 1));
            setIndex(index + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          if (index > 0) {
            setDisplayText(currentText.slice(0, index - 1));
            setIndex(index - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timer);
  }, [index, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}

// ============== ICON COMPONENTS ==============

const ScaleIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  </svg>
);

const MoneyIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const MapIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TruckIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const AwardIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const LeafIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

// ============== DYNAMIC COMPONENTS ==============

// Particle Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 30;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none particle-canvas"
    />
  );
}

// Spotlight Effect
function SpotlightEffect() {
  const { x, y } = useMousePosition();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.setProperty("--mouse-x", `${x}px`);
      elementRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  }, [x, y]);

  return <div ref={elementRef} className="spotlight-effect" />;
}

// 3D Tilt Card Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    const newTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const newGlarePosition = {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    };

    cardRef.current.style.setProperty("--card-transform", newTransform);
    cardRef.current.style.setProperty("--glare-x", `${newGlarePosition.x}%`);
    cardRef.current.style.setProperty("--glare-y", `${newGlarePosition.y}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const defaultTransform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (cardRef.current) {
      cardRef.current.style.setProperty("--card-transform", defaultTransform);
      cardRef.current.style.setProperty("--glare-x", "50%");
      cardRef.current.style.setProperty("--glare-y", "50%");
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn("tilt-card-transform", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className="tilt-card-glare" />
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  label,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(end, 2500);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2 tabular-nums">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

function MagneticButton({
  children,
  className,
  href,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const newPosition = { x: x * 0.3, y: y * 0.3 };

    buttonRef.current.style.setProperty(
      "--button-transform",
      `translate(${newPosition.x}px, ${newPosition.y}px)`,
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty(
        "--button-transform",
        "translate(0px, 0px)",
      );
    }
  }, []);

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: cn(
      "inline-flex items-center justify-center magnetic-button-transform",
      className,
    ),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a {...commonProps} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick}>
      {children}
    </button>
  );
}

// Pulse Ring Component
function PulseRing({
  children,
  color = "emerald",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-ping opacity-20",
          color === "emerald" && "bg-emerald-500",
          color === "amber" && "bg-amber-500",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-pulse opacity-40",
          color === "emerald" && "bg-emerald-500",
          color === "amber" && "bg-amber-500",
        )}
      />
      {children}
    </div>
  );
}

// ============== SECTION COMPONENTS ==============

// Contact Form Component with Netlify Forms
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    scrapType: "",
    weight: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Netlify Forms submission
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);
      
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataObj as any).toString(),
      });

      setSubmitStatus('success');
      
      // Also redirect to WhatsApp as backup
      const message = `Hi, I want to sell scrap.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ALocation: ${formData.location}%0AScrap Type: ${formData.scrapType}%0AEstimated Weight: ${formData.weight} kg`;
      window.open(`https://wa.me/919110355412?text=${message}`, "_blank");
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Quote Submitted!</h3>
        <p className="text-gray-400 mb-4">We'll contact you within 30 minutes.</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Submit Another Quote
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" name="contact" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="contact" />
      
      {[
        {
          name: "name",
          label: "Your Name",
          type: "text",
          placeholder: "Enter your name",
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "+91 XXXXX XXXXX",
        },
        {
          name: "location",
          label: "Location/City",
          type: "text",
          placeholder: "Your city or area",
        },
      ].map((field) => (
        <div key={field.name} className="relative">
          <label
            htmlFor={field.name}
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none",
              focusedField === field.name ||
                formData[field.name as keyof typeof formData]
                ? "-top-2 text-xs text-emerald-400 bg-gray-800 px-2"
                : "top-3.5 text-gray-500",
            )}
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required
            value={formData[field.name as keyof typeof formData]}
            onChange={(e) =>
              setFormData({ ...formData, [field.name]: e.target.value })
            }
            onFocus={() => setFocusedField(field.name)}
            onBlur={() => setFocusedField(null)}
            title={field.label}
            className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-transparent focus:border-emerald-500 focus:outline-none transition-all duration-300"
          />
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label
            htmlFor="scrapType"
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none z-10",
              focusedField === "scrapType" || formData.scrapType
                ? "-top-2 text-xs text-emerald-400 bg-gray-800 px-2"
                : "top-3.5 text-gray-500",
            )}
          >
            Scrap Type
          </label>
          <select
            id="scrapType"
            name="scrapType"
            value={formData.scrapType}
            onChange={(e) =>
              setFormData({ ...formData, scrapType: e.target.value })
            }
            onFocus={() => setFocusedField("scrapType")}
            onBlur={() => setFocusedField(null)}
            aria-label="Select scrap type"
            title="Select scrap type"
            className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value=""></option>
            <option value="iron">Iron/Steel</option>
            <option value="copper">Copper</option>
            <option value="aluminium">Aluminium</option>
            <option value="brass">Brass</option>
            <option value="ewaste">E-Waste</option>
            <option value="mixed">Mixed Scrap</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="relative">
          <label
            htmlFor="weight"
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none",
              focusedField === "weight" || formData.weight
                ? "-top-2 text-xs text-emerald-400 bg-gray-800 px-2"
                : "top-3.5 text-gray-500",
            )}
          >
            Est. Weight (kg)
          </label>
          <input
            id="weight"
            name="weight"
            type="text"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            onFocus={() => setFocusedField("weight")}
            onBlur={() => setFocusedField(null)}
            title="Est. Weight (kg)"
            className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-transparent focus:border-emerald-500 focus:outline-none transition-all duration-300"
            placeholder="e.g., 50"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <MagneticButton className="flex-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Quote</span>
                <ChevronRightIcon />
              </>
            )}
          </button>
        </MagneticButton>
        
        <MagneticButton>
          <a
            href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap"
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <WhatsAppIcon />
          </a>
        </MagneticButton>
      </div>
      
      {submitStatus === 'error' && (
        <p className="text-red-400 text-sm text-center">Failed to submit. Please try WhatsApp instead.</p>
      )}
    </form>
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <picture>
              <source media="(max-width: 768px)" srcSet="/MobileLogo.png" />
              <img 
                src="/MainLogo.png" 
                alt="AbbroMetals - Scrap Buyers India" 
                width="180" 
                height="60" 
                className="h-10 md:h-12 w-auto"
              />
            </picture>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton href="tel:+919110355412">
              <span className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 text-sm font-medium border border-gray-700 hover:border-gray-600">
                <PhoneIcon />
                +91 91103 55412
              </span>
            </MagneticButton>
            <MagneticButton href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap">
              <span className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-lg shadow-emerald-500/20">
                <WhatsAppIcon />
                WhatsApp
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            <div
              className={cn(
                "transition-transform duration-300",
                isMobileMenuOpen && "rotate-90",
              )}
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-gray-900/98 backdrop-blur-xl border-t border-gray-800 rounded-b-2xl">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-emerald-400 transition-colors py-3 px-4 rounded-xl hover:bg-gray-800 mobile-nav-item"
                  ref={(el) => {
                    if (el) {
                      (el as HTMLElement).style.setProperty(
                        "--nav-delay",
                        `${index * 50}ms`,
                      );
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <a
                  href="tel:+919110355412"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  <PhoneIcon />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  <WhatsAppIcon />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const { ref, isVisible } = useScrollReveal();
  const typewriterText = useTypewriter(
    ["Online", "Instantly", "Anywhere"],
    150,
    2500,
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Metal Recycling"
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <ParticleBackground />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={cn("fade-in-up", isVisible && "visible")}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 backdrop-blur-sm">
              <PulseRing color="emerald">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </PulseRing>
              <span className="text-emerald-400 text-sm font-medium">
                Pan-India Service Available
              </span>
            </div>

            {/* Headline with SEO-optimized H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Leading Scrap Buyers in India{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                  {typewriterText}
                </span>
                <span className="absolute -right-1 top-0 w-0.5 h-full bg-emerald-500 animate-blink" />
              </span>
              <br />
              Doorstep Pickup Service
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Best Prices. Instant Payment. Free Doorstep Pickup. We buy all
              types of metal scrap, e-waste, and old appliances with complete
              transparency.
            </p>

            {/* CTA Buttons with SEO-optimized links */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <MagneticButton href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap">
                <span className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <WhatsAppIcon />
                  <span>Book Pickup via WhatsApp</span>
                </span>
              </MagneticButton>
              <MagneticButton href="tel:+919110355412">
                <span className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-800/80 hover:bg-gray-700 text-white font-semibold text-lg rounded-2xl border border-gray-700 hover:border-gray-600 backdrop-blur-sm transition-all duration-300">
                  <PhoneIcon />
                  <span>Call +91 91103 55412</span>
                </span>
              </MagneticButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {[
                { icon: CheckIcon, text: "5000+ Happy Customers" },
                { icon: ClockIcon, text: "Same Day Pickup" },
                { icon: ShieldIcon, text: "Transparent Pricing" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors cursor-default"
                >
                  <span className="text-emerald-500">
                    <item.icon />
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Stats Card */}
          <div
            className={cn("hidden lg:block scale-in", isVisible && "visible")}
          >
            <TiltCard className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <SparklesIcon />
                  Why Choose AbbroMetals?
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <AnimatedCounter
                    end={5000}
                    suffix="+"
                    label="Happy Customers"
                  />
                  <AnimatedCounter end={28} suffix="+" label="States Covered" />
                  <AnimatedCounter
                    end={50}
                    prefix="₹"
                    suffix="Cr+"
                    label="Scrap Purchased"
                  />
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                      4.9★
                    </div>
                    <div className="text-gray-400 text-sm">Customer Rating</div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="mt-6 pt-6 border-t border-gray-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white font-medium"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">Active now</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-500/50 rounded-full flex justify-center hover:border-emerald-500/50 transition-colors cursor-pointer">
          <div className="w-1 h-3 bg-emerald-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// Features Strip Section
function FeaturesStrip() {
  const { ref, isVisible, scrollY } = useScrollReveal(0.05);

  const features = [
    {
      icon: ScaleIcon,
      title: "Digital Weighing",
      desc: "Accurate measurements",
      color: "emerald",
    },
    {
      icon: MoneyIcon,
      title: "Instant Payment",
      desc: "UPI/Cash/Transfer",
      color: "amber",
    },
    {
      icon: MapIcon,
      title: "All India Coverage",
      desc: "28+ States Served",
      color: "emerald",
    },
    {
      icon: TruckIcon,
      title: "Free Pickup",
      desc: "Doorstep Service",
      color: "amber",
    },
  ];

  return (
    <section ref={ref} className="relative -mt-8 z-20 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "max-w-6xl mx-auto fade-in-up parallax-transform",
          isVisible && "visible",
        )}
        ref={(el) => {
          if (el) {
            el.style.setProperty(
              "--parallax-transform",
              `translateY(${scrollY}px)`,
            );
          }
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <TiltCard key={index} className="h-full">
              <div className="h-full bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 group shadow-xl shadow-black/20">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                    feature.color === "emerald"
                      ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-400"
                      : "bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-400",
                  )}
                >
                  <feature.icon />
                </div>
                <h3 className="text-white font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Book Your Pickup",
      desc: "Call or WhatsApp us with details of your scrap. Share photos for better pricing.",
      icon: PhoneIcon,
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      title: "We Come to You",
      desc: "Our trained team arrives with digital scales at your scheduled time.",
      icon: TruckIcon,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      number: "03",
      title: "Get Paid Instantly",
      desc: "We weigh in front of you and transfer money before we leave.",
      icon: MoneyIcon,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={cn("max-w-7xl mx-auto fade-in-up", isVisible && "visible")}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            <TrendingUpIcon />
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Selling your scrap has never been easier. Three simple steps to turn
            your waste into cash.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Progress Line - Desktop */}
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-500 transition-all duration-1000 ease-out step-progress-bar"
              ref={(el) => {
                if (el) {
                  el.style.setProperty(
                    "--step-progress",
                    `${(activeStep / (steps.length - 1)) * 100}%`,
                  );
                }
              }}
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div
                className={cn(
                  "relative z-10 w-24 h-24 mx-auto mb-6 transition-all duration-500",
                  activeStep >= index ? "scale-100" : "scale-95 opacity-70",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br rounded-3xl blur-xl transition-all duration-500",
                    step.color,
                    activeStep >= index ? "opacity-40" : "opacity-0",
                  )}
                />
                <div
                  className={cn(
                    "relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-3xl flex items-center justify-center transition-all duration-500",
                    activeStep >= index
                      ? "border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                      : "border-gray-700/50",
                  )}
                >
                  <span
                    className={cn(
                      "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300",
                      step.color,
                    )}
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                  activeStep >= index
                    ? "bg-emerald-500/10 text-emerald-400 scale-110"
                    : "bg-gray-800 text-gray-500",
                )}
              >
                <step.icon />
              </div>

              <h3
                className={cn(
                  "text-xl font-semibold mb-3 transition-colors duration-300",
                  activeStep >= index ? "text-white" : "text-gray-400",
                )}
              >
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scrap Categories Section
function ScrapCategoriesSection() {
  const { ref, isVisible } = useScrollReveal();

  const categories = [
    {
      name: "Copper",
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
      desc: "Wires, pipes, sheets, motors",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Aluminium",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      desc: "Utensils, frames, foils",
      color: "from-gray-400 to-gray-500",
    },
    {
      name: "Brass",
      image:
        "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&q=80",
      desc: "Fittings, valves, hardware",
      color: "from-yellow-600 to-yellow-700",
    },
    {
      name: "Iron & Steel",
      image:
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80",
      desc: "Grills, rods, machinery",
      color: "from-slate-600 to-slate-700",
    },
    {
      name: "Stainless Steel",
      image:
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80",
      desc: "SS 304, 316, kitchen items",
      color: "from-zinc-500 to-zinc-600",
    },
    {
      name: "E-Waste",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
      desc: "PCBs, batteries, components",
      color: "from-green-600 to-green-700",
    },
    {
      name: "Old Appliances",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      desc: "ACs, fridges, washing machines",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Vehicle Scrap",
      image:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80",
      desc: "Cars, bikes, industrial vehicles",
      color: "from-red-600 to-red-700",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/50"
    >
      <div
        ref={ref}
        className={cn("max-w-7xl mx-auto fade-in-up", isVisible && "visible")}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            What We Buy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Scrap Categories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We purchase all types of ferrous and non-ferrous metals, e-waste,
            and old appliances at competitive rates.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-emerald-500/10 category-card-transform"
              onMouseEnter={() => {
                const el = document.querySelector(
                  `[data-category-index="${index}"]`,
                );
                if (el) {
                  (el as HTMLElement).style.setProperty(
                    "--category-transform",
                    "translateY(-8px)",
                  );
                }
              }}
              onMouseLeave={() => {
                const el = document.querySelector(
                  `[data-category-index="${index}"]`,
                );
                if (el) {
                  (el as HTMLElement).style.setProperty(
                    "--category-transform",
                    "translateY(0)",
                  );
                }
              }}
              data-category-index={index}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    category.color,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                    Contact for Price
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative">
                <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left",
                    category.color,
                  )}
                />
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{category.desc}</p>
                <a
                  href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-all duration-300 group/link"
                >
                  Get Quote
                  <span className="transform group-hover/link:translate-x-1 transition-transform">
                    <ChevronRightIcon />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollReveal();

  const reasons = [
    {
      icon: ShieldIcon,
      title: "100% Transparency",
      desc: "Digital weighing in front of you. No hidden charges or deductions. Complete honesty in every transaction.",
      stat: "0% Hidden",
    },
    {
      icon: AwardIcon,
      title: "Best Market Rates",
      desc: "We monitor market prices daily to ensure you get the highest possible rate for your scrap materials.",
      stat: "Top 1%",
    },
    {
      icon: ClockIcon,
      title: "Same Day Pickup",
      desc: "Book before 2 PM and get same-day pickup service. We value your time and convenience.",
      stat: "< 4 Hours",
    },
    {
      icon: LeafIcon,
      title: "Eco-Friendly Recycling",
      desc: "Your scrap is properly recycled, contributing to a cleaner environment and sustainable future.",
      stat: "100% Green",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={cn("max-w-7xl mx-auto fade-in-up", isVisible && "visible")}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Our Advantage
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-6">
              Why Choose AbbroMetals?
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              We are India&apos;s most trusted scrap buying service, serving
              thousands of households and businesses across 28+ states. Our
              commitment to transparency and fair pricing sets us apart.
            </p>

            {/* B2B Section */}
            <TiltCard className="relative">
              <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2 relative">
                  <span className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl flex items-center justify-center text-amber-400">
                    <AwardIcon />
                  </span>
                  Corporate & B2B Tie-ups
                </h3>
                <p className="text-gray-400 text-sm mb-4 relative">
                  Special rates for offices, construction sites, factories, and
                  industries. We handle bulk scrap clearance with dedicated
                  account managers.
                </p>
                <a
                  href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20discuss%20B2B%20scrap%20deal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-all duration-300 group"
                >
                  Discuss B2B Requirements
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    <ChevronRightIcon />
                  </span>
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <TiltCard key={index} className="h-full">
                <div className="h-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <reason.icon />
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                        {reason.stat}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto fade-in-up relative z-10",
          isVisible && "visible",
        )}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-6">
              Ready to Sell Your Scrap?
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Contact us now for a free quote. Our team is available 7 days a
              week to assist you with scrap pickup anywhere in India.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: PhoneIcon,
                  title: "Phone",
                  value: "+91 91103 55412",
                  href: "tel:+919110355412",
                },
                {
                  icon: WhatsAppIcon,
                  title: "WhatsApp",
                  value: "+91 91103 55412",
                  href: "https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap",
                },
                {
                  icon: LocationIcon,
                  title: "Service Area",
                  value: "Pan-India (All 28 States)",
                  href: null,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                    <item.icon />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-400 hover:text-emerald-400 transition-colors text-lg"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2 relative">
                <ClockIcon />
                Business Hours
              </h3>
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between py-2 border-b border-gray-700/50">
                  <span className="text-gray-400">All Days</span>
                  <span className="text-emerald-400 font-semibold">
                    24/7 Available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-gray-500 text-sm">
                    We are available round the clock for your convenience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl shadow-black/20">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Request a Quote
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Section
function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Metal Scrap Buying",
    "E-Waste Recycling",
    "Appliance Disposal",
    "Industrial Clearance",
    "Corporate Tie-ups",
  ];

  return (
    <>
      <footer className="bg-gray-900 border-t border-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/MainLogo.png" 
                  alt="AbbroMetals - Scrap Buyers India" 
                  width="150" 
                  height="50" 
                  className="h-8 w-auto filter brightness-0 invert"
                  loading="lazy"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                India&apos;s most trusted scrap buying service. We buy all types
                of metal scrap, e-waste, and old appliances at best prices.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">
                  <span className="text-white block mb-1">Proprietor:</span>
                  SYED RIZWAN HUSSAIN ABEDI
                </p>
                <p className="text-gray-400">
                  <span className="text-white block mb-1">Contact Person:</span>
                  Mohammed Salman
                </p>
                <p className="text-gray-400">
                  <span className="text-white block mb-1">Phone:</span>
                  <a
                    href="tel:+919110355412"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    +91 91103 55412
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-white block mb-1">Service Area:</span>
                  Pan-India (All 28 States)
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 text-sm">
              <p>© 2024 AbbroMetals. All rights reserved.</p>
              <p>For feedback & copyright issues: <a href="https://github.com/rafi-ud-deen" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">@rafi-ud-deen</a></p>
            </div>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setShowPrivacy(true)}
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicy isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}

// Floating WhatsApp Button
function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <div
        className={cn(
          "absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 pointer-events-none",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
        )}
      >
        Chat on WhatsApp
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
      </div>

      {/* Button */}
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-40" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-110">
          <WhatsAppIcon />
        </div>
      </div>
    </a>
  );
}

// Mobile Bottom Bar
function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(
        currentScrollY < lastScrollY.current || currentScrollY < 100,
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "mobile-bottom-bar md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 px-4 py-3">
        <div className="flex items-center justify-around gap-3">
          <a
            href="tel:+919110355412"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <PhoneIcon />
            <span>Call Now</span>
          </a>
          <a
            href="https://wa.me/919110355412?text=Hi,%20I%20want%20to%20sell%20scrap"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ============== MAIN APP ==============

export function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesStrip />
      <HowItWorksSection />
      <ScrapCategoriesSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
      <SpotlightEffect />

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #111827;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #10B981;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
        
        /* Selection color */
        ::selection {
          background: rgba(16, 185, 129, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}
