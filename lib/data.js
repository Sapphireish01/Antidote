import { merchAPI } from "./api";

export const PRODUCTS = [
  {
    id: "hoodie",
    name: "The Heavyweight Ritual Hoodie",
    image: "/merch/homepage-1.webp",
    description: "Crafted from 500GSM organic cotton, designed for grounding in the shifting seasons. A tactile artifact for the conscious mover.",
    price: "145.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Stone Gray",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "vessel",
    name: "The Altar Vessel",
    image: "/merch/homepage-4.webp",
    hoverImage: "/merch/Merch Promo-7.webp",
    description: "Matte Espresso Ceramic. A vessel designed for ritual settings and daily focus.",
    price: "48.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Matte Espresso",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "tote",
    name: "Ascension Tote",
    image: "/merch/homepage-7.webp",
    hoverImage: "/merch/homepage-3.webp",
    description: "Oat Woven Linen. A durable and premium bag crafted for everyday utility and style.",
    price: "65.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Oat",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "socks",
    name: "Grounding Socks",
    image: "/merch/Merch Promo-2.webp",
    hoverImage: "/merch/homepage-6.webp",
    description: "Bronze Cotton-Blend grounding socks designed to keep you steady on your path.",
    price: "24.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Bronze",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "burner",
    name: "The Void Burner",
    image: "/merch/homepage-5.webp",
    description: "A sculptural piece for sensory atmosphere. Solid bronze construction.",
    price: "95.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Bronze",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "codex",
    name: "The Daily Codex",
    image: "/merch/homepage-6.webp",
    description: "400 pages of heavyweight paper for unhurried reflection.",
    price: "40.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Espresso",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "overcoat",
    name: "Wool Shell Overcoat",
    image: "/merch/homepage-7.webp",
    description: "A premium tailored overcoat made from recycled wool in a deep espresso color.",
    price: "280.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Espresso",
    availability: "https://schema.org/PreOrder"
  },
  {
    id: "incense",
    name: "Ritual Incense Set",
    image: "/merch/homepage-8.webp",
    description: "A minimalist architectural detail of a dark bronze incense burner and organic incense sticks.",
    price: "35.00",
    currency: "GBP",
    currencySymbol: "£",
    shipping: "Preorder — ships Oct 24",
    color: "Bronze",
    availability: "https://schema.org/PreOrder"
  }
];

export const EVENTS = [
  {
    id: "london",
    city: "London",
    region: "uk-europe",
    venue: "The Tabernacle",
    date: "2024-10-12",
    dateDisplay: "October 12, 2024",
    price: 35,
    currency: "GBP",
    currencySymbol: "£",
    address: "35 Powis Square, London W11 2AY",
    countryCode: "GB",
    description: "The premier Autumn gathering of UK Christian creatives and seekers. A night of worship, poetry, and shared space.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF2d2B5UCOLNEhTVMjZFF-nNCsSq1yGX1JOYu5zt8LytBHuOAUHTWK3mGhnpct8FD_NTzhCCG-_1dq5U4d6hFIu6SUdS5XXZOJgjzOfcP9mphsHwnQK16W7BCZGVLarIHxZz3pXX4UwjW27YAhRyVwYBhX0QET7PcZWARJLbbK6Ld5mEXYzxgdbejh7wnh7N7IBXcsKPmBYleOpmREsXrKq-jCa-rhh4rj6dS5DM-aKH6GRRnYLfc"
  },
  {
    id: "manchester",
    city: "Manchester",
    region: "uk-europe",
    venue: "Victoria Warehouse",
    date: "2024-10-19",
    dateDisplay: "October 19, 2024",
    price: 30,
    currency: "GBP",
    currencySymbol: "£",
    address: "Trafford Wharf Rd, Stretford, Manchester M17 1AB",
    countryCode: "GB",
    description: "Connecting northern creatives for an evening of quiet reflection, high craft, and covenant networking.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpK69PE2V7bbSu7QVkCmkDu8DDeG8fvhPRf_h4QBg74EHeMctskhHPRTxa1MJGS9plQlslWPNszRT7iQxap1-0zuZ1yWHM_pLsqeu9VhnKwplTqdIn2VRr20eCVpM32s4wLHMJSMn13YAyubGmhhbjrfbfFM2PUFQtY0KBMnJmyvqCmP-Tt6xf7yrZB9bJTKTYbZ__vtYcN8jpPmCoujdSVkPzDuudcXHJ018xqIVfkEbbW2bo6PE"
  },
  {
    id: "birmingham",
    city: "Birmingham",
    region: "uk-europe",
    venue: "The Custard Factory",
    date: "2024-10-26",
    dateDisplay: "October 26, 2024",
    price: 25,
    currency: "GBP",
    currencySymbol: "£",
    address: "Gibb St, Deritend, Birmingham B9 4AA",
    countryCode: "GB",
    description: "A collaborative gathering in the heart of Birmingham's creative quarter. Focused on the art of restoration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt3orYUCkay-f92yVr2Y7YUESADJ8STHkas8S-X3oHFIDtJ1UFCNO8jqxERbrIt0MxjeEjV11fFf2qpG0ViyN-iDvzp8u_ffZtXE9xbTyF164c9XmT1QKia9xG3xTjTp5eugeWdX7Y6-qorb3Un0uVOkF8MNQMEZLn6MyfL_v62qAD3yFxTf_zMMjmXftAIrglmOvA00az2OJxdk4X9TnTuRaunadsAeMIvb8hZT0eqw_STeBoAxY"
  },
  {
    id: "lagos",
    city: "Lagos",
    region: "africa",
    venue: "Freedom Park",
    date: "2024-11-15",
    dateDisplay: "November 15, 2024",
    price: 15,
    currency: "GBP",
    currencySymbol: "£",
    address: "Hospital Rd, Lagos Island, Lagos, Nigeria",
    countryCode: "NG",
    description: "Inaugural gathering in West Africa. Establishing the Lagos creative covenant, connecting local sound and art.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCsN0NFX8ibMPA2vc9aQFq4FLItASNReQvS7xwRWJNK1xR8bJV_sVadXU9eoplxOo3epPtGiLgk0Anpsn4ddEiONFbwKxy2ODCNczvx1u462W5ZARhFOab8VRAzEFb8Bptonptc9S0rmuy0xBqZtNhByn-jDd1tzCsvRHRgBbBMFFfFlyYRz1V6XgaAPa5KWJ0g0WRSWN0fVkBY48JFbIQBbG-1F6YGdawJqihUUwamyJUyeBVnbY"
  },
  {
    id: "nairobi",
    city: "Nairobi",
    region: "africa",
    venue: "The Alchemist Bar",
    date: "2024-11-22",
    dateDisplay: "November 22, 2024",
    price: 12,
    currency: "GBP",
    currencySymbol: "£",
    address: "Parklands Rd, Nairobi, Kenya",
    countryCode: "KE",
    description: "East African tribe assembly. Uniting local designers, builders, and spiritual seekers around intentional craft.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo89Gl6jGE4TMRLV5gk8Cg36ZwxgQnpYfpjXbfY_3aTrmwRSyFeenOHv9thG5ibHYQ372DAvRlXPk4Zjwdy8TAPzK-mYHEBA7YjS6I-rP_8qD1OIAbqmIi_5V-WCVq7qFs2baK5rc3DUI-_kjitXFP6wvJWuMQPF0qmgcrDGq-VgZiVeQ1baPIx1QicN_HVMKprxOzllRya2gufa3w-gW6PFy7TSSecG2YpeWMkb-eH-vHD09hZJo"
  },
  {
    id: "new-york",
    city: "New York",
    region: "north-america",
    venue: "Brooklyn Pioneer",
    date: "2024-12-05",
    dateDisplay: "December 5, 2024",
    price: 45,
    currency: "USD",
    currencySymbol: "$",
    address: "240 pioneer St, Brooklyn, NY 11231",
    countryCode: "US",
    description: "East Coast winter convening. A winter sanctuary of candlelight, ambient sound, and spiritual reflection.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJmqiNCzZtoQLTGen5i9CFU2IQ_x91deTVCQcUghOQD0eUfGbdAeWv3zpirwYCxkNWDXCjuvdjHPkVMzrd6I0WPxyCUaYCTEJg9Q8FhTS0WDOXzgzkE-vJ26O2bDRVimFP-pQsGg6E1ns27U2SpFRlwGzqfzKwBHMJAcfGDXQvjZFFaqcUpA562gKD1TYA3zTdkHCaksqinfFewMejXipFH2J7xUsC7xPyLJ5FG0Y9qACZ3ZHIVlU"
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    region: "north-america",
    venue: "The Cathedral Sanctuary",
    date: "2024-12-12",
    dateDisplay: "December 12, 2024",
    price: 40,
    currency: "USD",
    currencySymbol: "$",
    address: "514 W Adams Blvd, Los Angeles, CA 90007",
    countryCode: "US",
    description: "West Coast assembly focusing on digital sabbath, organic installation, and the architecture of the quiet.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv7EBD38U8xTHxbEoAuDD9oOelH1y6z3CYWMB0b5CvqVjgHG65A_XeYYN8PRdgOQRF34UjWl92__tJtTkUC1Zab8UWf2pARmCylNaAXP14JQd1mvTX0yFLGmmuVAjD8xaeoGuFYglCAms7OATD94ZZGALlhETCeqrXnNW6g2kOKQ3SkHC92-17C9wcJsIM7ftAiOuqo6aRTNpknpJnncZG-VUwC1w9l2uXGXLms_7fv9ffMXBa_Ic"
  }
];

export const PAST_EVENTS = [
  {
    id: "travis-greene-berlin",
    title: "Travis Greene — Made A Way Tour",
    artist: "Travis Greene",
    chapter: "Concert Tour",
    image: "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN.jpg",
    images: [
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-19.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-20.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-21.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-22.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-23.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-24.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-25.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-26.jpg",
      "/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN-27.jpg"
    ]
  },
  {
    id: "dr-prinz-worship",
    title: "Night of Worship with Dr Prinz",
    artist: "Dr Prinz",
    chapter: "Night of Worship",
    image: "/Pastevents/Dr Prinz- Night of Worship/DSC037131.jpg",
    images: [
      "/Pastevents/Dr Prinz- Night of Worship/DSC037131.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC036966.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC036966s.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03785.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03791.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03792.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03808.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03817.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03817p0.jpg",
      "/Pastevents/Dr Prinz- Night of Worship/DSC03829.jpg"
    ]
  },
  {
    id: "smith-worship",
    title: "Night of Worship with Smith",
    artist: "Smith",
    chapter: "Night of Worship",
    image: "/Pastevents/Smith Night of Worship/DSC03124.jpg",
    images: [
      "/Pastevents/Smith Night of Worship/DSC03124.jpg",
      "/Pastevents/Smith Night of Worship/DSC03119.jpg",
      "/Pastevents/Smith Night of Worship/DSC03121.jpg",
      "/Pastevents/Smith Night of Worship/DSC03128.jpg",
      "/Pastevents/Smith Night of Worship/DSC03130.jpg",
      "/Pastevents/Smith Night of Worship/DSC03132.jpg",
      "/Pastevents/Smith Night of Worship/DSC03133.jpg",
      "/Pastevents/Smith Night of Worship/DSC03135.jpg",
      "/Pastevents/Smith Night of Worship/DSC03140.jpg",
      "/Pastevents/Smith Night of Worship/DSC03147.jpg"
    ]
  },
  {
    id: "young-chosen",
    title: "Young & Chosen Concert",
    artist: "Young & Chosen",
    chapter: "Youth Concert",
    image: "/Pastevents/Young and Chosen concert/Young and chosen-44.jpg",
    images: [
      "/Pastevents/Young and Chosen concert/Young and chosen-44.jpg",
      "/Pastevents/Young and Chosen concert/Young and chosen-63.jpg",
      "/Pastevents/Young and Chosen concert/Young and chosen-66.jpg",
      "/Pastevents/Young and Chosen concert/Young and chosen-67.jpg",
      "/Pastevents/Young and Chosen concert/Young and chosen-72.jpg",
      "/Pastevents/Young and Chosen concert/Young and chosen-73.jpg"
    ]
  },
  {
    id: "night-of-worship",
    title: "Night of Worship",
    artist: "Antidote Movement",
    chapter: "Night of Worship",
    image: "/Pastevents/night-of -worship/fdcd4b62-6ec0-461c-9f8d-aab58aa1ef74.jpg",
    images: [
      "/Pastevents/night-of -worship/fdcd4b62-6ec0-461c-9f8d-aab58aa1ef74.jpg",
      "/Pastevents/night-of -worship/e01268cd-52b7-45bd-a327-d9ab2408aee5.jpg",
      "/Pastevents/night-of -worship/e7e0b69e-560c-4550-9d54-28910362674f.jpg",
      "/Pastevents/night-of -worship/e92f1815-5d89-4f9b-8fd7-5ec2045e2404.jpg",
      "/Pastevents/night-of -worship/eccbb469-1af7-4888-a95d-0e0ef68df7d9.jpg",
      "/Pastevents/night-of -worship/ecd584a4-51d3-44e5-914c-4146f6f045b8.jpg",
      "/Pastevents/night-of -worship/eeb3f59e-0987-40c8-9804-706ebb4ca9ee.jpg",
      "/Pastevents/night-of -worship/efd83247-291c-4635-9a20-e584e9ce3eda.jpg",
      "/Pastevents/night-of -worship/f9f4a9c6-d4cd-47f9-bbca-dc92df133aae.jpg",
      "/Pastevents/night-of -worship/fb00d5c3-f6b3-462a-8431-fd5d9fb15299.jpg"
    ]
  },
  {
    id: "antidote-vertical",
    title: "Antidote Vertical Sessions",
    artist: "Antidote Movement",
    chapter: "Creative Tribe",
    image: "/Pastevents/antidote-vertical/Antidote Vertical Pictures-95.webp",
    images: [
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-95.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-94.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-96.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-97.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-98.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-99.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-100.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-101.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-102.webp",
      "/Pastevents/antidote-vertical/Antidote Vertical Pictures-103.webp"
    ]
  }
];

// Helper functions mimicking future dynamic database/API calls (asynchronous)
function transformApiMerch(m) {
  return {
    id: String(m.id),
    name: m.name,
    image: m.photo_reference || "/merch/homepage-1.webp",
    hoverImage: m.photo_reference || "/merch/homepage-1.webp",
    description: m.detail || "",
    price: String(m.price || "0.00"),
    currency: "GBP",
    currencySymbol: "£",
    shipping: m.shipping ? `Preorder — ships ${m.shipping}` : "Preorder — ships Soon",
    color: m.colorway || "Standard",
    material: m.material || "Premium Sourced Blend",
    availability: "https://schema.org/PreOrder",
  };
}

export async function getAllProducts() {
  try {
    const res = await merchAPI.getMerch();
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      const liveItems = res.data.map(transformApiMerch);
      // Merge live items with static defaults that aren't already represented by name
      const liveNames = new Set(liveItems.map((item) => item.name.toLowerCase()));
      const remainingDefaults = PRODUCTS.filter(
        (item) => !liveNames.has(item.name.toLowerCase())
      );
      return [...liveItems, ...remainingDefaults];
    }
  } catch (err) {
    console.warn("Could not fetch live merchandise, falling back to local catalog:", err);
  }
  return PRODUCTS;
}

export async function getProductById(id) {
  if (!id) return null;
  const all = await getAllProducts();
  const normalized = String(id).toLowerCase();
  return (
    all.find(
      (p) =>
        String(p.id).toLowerCase() === normalized ||
        p.name.toLowerCase().replace(/\s+/g, "-") === normalized
    ) || null
  );
}

export async function getEventById(id) {
  return EVENTS.find((e) => e.id === id) || null;
}

export async function getPastEventById(id) {
  if (!id) return null;
  const normalized = id.toLowerCase();
  return (
    PAST_EVENTS.find(
      (e) =>
        e.id.toLowerCase() === normalized ||
        (e.id && e.id.toLowerCase().includes(normalized))
    ) || null
  );
}

export async function getAllEvents() {
  return EVENTS;
}

export async function getAllPastEvents() {
  return PAST_EVENTS;
}

export function getAllGalleryImages() {
  const allImages = [];
  PAST_EVENTS.forEach(event => {
    event.images.forEach((img, index) => {
      allImages.push({
        id: `${event.id}-${index + 1}`,
        src: img,
        eventId: event.id,
        eventTitle: event.title,
        artist: event.artist,
        chapter: event.chapter
      });
    });
  });
  return allImages;
}
