export const SHOP_CONFIG = {
  brandName: 'RAJ GHARANA SAREE CENTRE',
  tagline: 'celebrate every occasion in style',
  legalName: "RAJ GHARANA SAREE CENTRE",
  whatsappNumber: "918210133085",
  supportEmail: "rsc@gmail.com",
  supportPhone: "+918210133085",
  
  location: {
    address: "bihari ji market, near state bank, gorari",
    postalCode: "802214",
    coordinates: {
      latitude: "25.1169984",
      longitude: "84.3112583"
    },
    googleMapsLink: "https://maps.google.com/?q=Raj+gharana+saree+center",
    // 🔥 FIXED EMBED URL: Aapka exact verified Google Maps embedded frame source
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.5527043714496!2d84.31125829999999!3d25.1169984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0ba74705372d%3A0x968a98ac88eb7f9f!2sRaj%20gharana%20saree%20center!5e0!3m2!1sen!2sin!4v1784277731656!5m2!1sen!2sin"
  },

  operatingHours: {
    Everydays: "10:30 AM - 08:30 PM",
  },

  socialLinks: {
    instagram: "https://instagram.com/auraluxe",
    facebook: "https://facebook.com/auraluxe",
    pinterest: "https://pinterest.com/auraluxe"
  },

  seoDefaults: {
    titleTemplate: "%s | Raj Gharana Saree Centre gorari",
    defaultTitle: "Raj Gharana ",
    description: "          Browse our collection of fine Sarees, Kurtis, Suits, lehenga, redimade child wear. Order directly via WhatsApp concierge.",
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "https://rajgharanasaree.com",
      siteName: "Raj Gharana Saree Centre"
    },
    robots: "index, follow"
  },

  features: {
    enableShortlist: true,
    enableRecentlyViewed: true,
    currencyCode: "INR",
    currencySymbol: "₹"
  }
} as const;

export type ShopConfigType = typeof SHOP_CONFIG;