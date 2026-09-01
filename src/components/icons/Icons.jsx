export function LogoMark({ className = "h-7 w-7" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 2.5 24.5 8.5v11L14 25.5 3.5 19.5v-11L14 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M14 8.2v11.6M8.4 11.3 14 14.6l5.6-3.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// export function HeartIcon({ filled = false }) {
//   return (
//     <svg className="h-6 w-6" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
//       <path
//         d="M12 20s-7-4.4-9.2-8.2C1.2 9.2 2.4 5.8 5.6 5.2c1.9-.4 3.7.5 4.7 2 1-1.5 2.8-2.4 4.7-2 3.2.6 4.4 4 2.8 6.6C19 15.6 12 20 12 20Z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       />
//     </svg>
//   );
// }

export function HeartIcon({ filled = false }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={filled ? "currentColor" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      // className={className}
    >
      <path
        d="M5.93415 18.5443L15.3152 27.3569C15.6397 27.6616 15.8019 27.814 15.9999 27.814C16.1979 27.814 16.3602 27.6616 16.6846 27.3569L26.0657 18.5443C28.6739 16.0942 28.9907 12.0622 26.797 9.2348L26.3845 8.70316C23.7603 5.32081 18.4928 5.88806 16.6488 9.75157C16.3883 10.2973 15.6115 10.2973 15.351 9.75157C13.5071 5.88806 8.23955 5.32081 5.61531 8.70316L5.20284 9.2348C3.00918 12.0622 3.32592 16.0942 5.93415 18.5443Z"
        stroke="#919191"
        strokeOpacity="0.77"
        strokeWidth="1.4"
      />
    </svg>
  );
};

export function CartIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16l-1.4 10.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 6V5a4 4 0 0 1 8 0v1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 19.2c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }) {
  return (
    <svg className={`h-6 w-6 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilterIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 7.2c.5-.3.9-.8 1.1-1.4-.5.3-1 .5-1.6.6A2.5 2.5 0 0 0 14.8 9c0 .2 0 .4.1.5-2.1-.1-4-1.1-5.3-2.7-.2.4-.3.8-.3 1.3 0 .9.5 1.7 1.1 2.1-.4 0-.8-.1-1.1-.3v.1c0 1.2.9 2.3 2 2.5-.2.1-.5.1-.7.1-.2 0-.3 0-.5-.1.3 1 1.3 1.8 2.4 1.8A5 5 0 0 1 5 16.3 7.1 7.1 0 0 0 8.8 17.4c4.6 0 7.1-3.8 7.1-7.1v-.3c.5-.4.9-.8 1.2-1.3-.4.2-.9.3-1.5.4Z" />
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 4h2.2a4.8 4.8 0 0 0 4.3 4.2v2.2A6.9 6.9 0 0 1 16.2 9v6.2A5.2 5.2 0 1 1 9.5 10v2.2a3 3 0 1 0 2.3 2.9V4H14Z" />
    </svg>
  );
}
