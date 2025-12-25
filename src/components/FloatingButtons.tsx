import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  const phoneNumber = "0978998811";
  const zaloLink = `https://zalo.me/${phoneNumber}`;
  const facebookLink = "https://www.facebook.com/congnghehaiantn";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Facebook */}
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
        aria-label="Facebook"
      >
        <svg 
          className="w-7 h-7 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Facebook
        </span>
      </a>

      {/* Zalo */}
      <a
        href={zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
        aria-label="Zalo"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat Zalo
        </span>
      </a>

      {/* Phone */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-all duration-300 animate-pulse-glow"
        aria-label="Gọi điện"
      >
        <Phone className="w-7 h-7 text-primary-foreground" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          0978 998 811
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;
