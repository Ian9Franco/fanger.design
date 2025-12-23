// Datos estructurales del footer
// Contiene enlaces organizados en columnas y datos de contacto

export const footerLinks = {
  company: [
    { name: "about", href: "/about" },
    { name: "work", href: "/work" },
    { name: "services", href: "/services" },
    { name: "contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
} as const

export const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "Dribbble", href: "https://dribbble.com", icon: "dribbble" },
] as const
