// Service page data structure for SEO optimization
export const servicePages = [
  {
    slug: "copper-scrap",
    title: "Copper Scrap Buyers in India | Best Prices | AbbroMetals",
    metaDescription: "Sell copper scrap at best market prices. Free doorstep pickup across India. Instant payment via UPI. Call +91 9110355412 for copper wire, cable, pipe scrap.",
    h1: "Leading Copper Scrap Buyers in India | Doorstep Pickup Service",
    category: "Copper Scrap",
    price: "₹650-750/kg",
    keywords: ["copper scrap buyers", "copper wire scrap", "copper cable scrap", "copper pipe scrap"],
    description: "We buy all types of copper scrap including wires, cables, pipes, and sheets at competitive market rates.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    slug: "iron-steel-scrap",
    title: "Iron & Steel Scrap Buyers in India | Best Rates | AbbroMetals",
    metaDescription: "Sell iron and steel scrap at best prices. Pan-India pickup service. Instant payment. Call +91 9110355412 for MS scrap, iron rods, steel sheets.",
    h1: "Top Iron & Steel Scrap Buyers in India | Free Pickup",
    category: "Iron & Steel Scrap",
    price: "₹35-45/kg",
    keywords: ["iron scrap buyers", "steel scrap dealers", "MS scrap", "iron rod scrap"],
    description: "We purchase all grades of iron and steel scrap including MS scrap, iron rods, steel sheets, and structural steel.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  },
  {
    slug: "aluminium-scrap",
    title: "Aluminium Scrap Buyers in India | Top Prices | AbbroMetals",
    metaDescription: "Sell aluminium scrap at premium rates. Free collection across India. Instant UPI payment. Call +91 9110355412 for aluminium sheets, utensils, window frames.",
    h1: "Premium Aluminium Scrap Buyers in India | Doorstep Service",
    category: "Aluminium Scrap",
    price: "₹140-160/kg",
    keywords: ["aluminium scrap buyers", "aluminum scrap dealers", "aluminium utensils scrap", "window frame scrap"],
    description: "We buy all types of aluminium scrap including sheets, utensils, window frames, and industrial aluminium waste.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
  },
  {
    slug: "brass-scrap",
    title: "Brass Scrap Buyers in India | Best Market Rates | AbbroMetals",
    metaDescription: "Sell brass scrap at highest market prices. Pan-India pickup. Instant payment via UPI/Cash. Call +91 9110355412 for brass fittings, utensils, hardware.",
    h1: "Trusted Brass Scrap Buyers in India | Free Collection",
    category: "Brass Scrap",
    price: "₹450-550/kg",
    keywords: ["brass scrap buyers", "brass fittings scrap", "brass utensils scrap", "brass hardware scrap"],
    description: "We purchase all varieties of brass scrap including fittings, utensils, hardware, and decorative items at best rates.",
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
  },
  {
    slug: "e-waste-recycling",
    title: "E-Waste Recycling in India | Electronic Waste Buyers | AbbroMetals",
    metaDescription: "Responsible e-waste recycling across India. We buy old computers, laptops, mobiles, TVs. Free pickup. Call +91 9110355412 for electronic waste disposal.",
    h1: "Professional E-Waste Recycling Services in India | Eco-Friendly",
    category: "E-Waste Recycling",
    price: "₹15-25/kg",
    keywords: ["e-waste recycling", "electronic waste buyers", "computer scrap", "mobile phone recycling"],
    description: "Eco-friendly e-waste recycling service for computers, laptops, mobiles, TVs, and all electronic appliances.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80"
  },
  {
    slug: "appliance-disposal",
    title: "Old Appliance Disposal in India | Refrigerator, AC Buyers | AbbroMetals",
    metaDescription: "Sell old appliances at best prices. We buy refrigerators, ACs, washing machines, microwaves. Free pickup across India. Call +91 9110355412.",
    h1: "Old Appliance Disposal Service in India | Best Prices Guaranteed",
    category: "Appliance Disposal",
    price: "₹500-2000/unit",
    keywords: ["old appliance disposal", "refrigerator scrap", "AC scrap", "washing machine disposal"],
    description: "We buy old and non-working appliances including refrigerators, ACs, washing machines, and kitchen appliances.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
  }
];

// Location data for future scalability
export const locationPages = [
  {
    slug: "scrap-buyers-mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    title: "Scrap Buyers in Mumbai | Best Prices | AbbroMetals",
    metaDescription: "Leading scrap buyers in Mumbai. Sell copper, iron, aluminium scrap at best rates. Free pickup in Mumbai, Navi Mumbai, Thane. Call +91 9110355412.",
    h1: "Top Scrap Buyers in Mumbai | Doorstep Pickup Service",
    areas: ["Andheri", "Bandra", "Borivali", "Dadar", "Ghatkopar", "Malad", "Powai", "Thane", "Navi Mumbai"]
  },
  {
    slug: "scrap-buyers-delhi",
    city: "Delhi",
    state: "Delhi",
    title: "Scrap Buyers in Delhi NCR | Best Rates | AbbroMetals",
    metaDescription: "Trusted scrap buyers in Delhi NCR. Sell metal scrap, e-waste at premium prices. Free collection in Delhi, Gurgaon, Noida. Call +91 9110355412.",
    h1: "Leading Scrap Buyers in Delhi NCR | Free Collection",
    areas: ["Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi", "Gurgaon", "Noida", "Faridabad"]
  },
  {
    slug: "scrap-buyers-bangalore",
    city: "Bangalore",
    state: "Karnataka",
    title: "Scrap Buyers in Bangalore | Top Prices | AbbroMetals",
    metaDescription: "Best scrap buyers in Bangalore. Sell copper, brass, iron scrap at market rates. Free pickup across Bangalore. Call +91 9110355412.",
    h1: "Trusted Scrap Buyers in Bangalore | Best Market Rates",
    areas: ["Whitefield", "Electronic City", "Koramangala", "Indiranagar", "Jayanagar", "Marathahalli", "BTM Layout"]
  }
];

// SEO utility functions
export const generateServiceSchema = (service: typeof servicePages[0]) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.category,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "AbbroMetals",
      "telephone": "+91-9110355412",
      "url": "https://abbrometals.in",
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceRange": service.price,
      "availability": "https://schema.org/InStock"
    }
  };
};