export const COUPLE = {
  groom: "Mohamed",
  bride: "Rewan",
  fullName: "Mohamed & Rewan",
} as const;

export const EVENT = {
  date: "July 17, 2026",
  dateISO: "2026-07-17T19:00:00+03:00",
  time: "7:00 PM",
  venue: "Green Plaza",
  venueAddress: "Green Plaza",
  mapsQuery: "Green+Plaza",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR3JlZW4gUGxhemE!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Green+Plaza",
} as const;

export const CHILDHOOD_IMAGES = [
  { src: "/images/childhood.jpg", alt: "Childhood memories" },
  { src: "/images/childhood2.jpg", alt: "Childhood memories" },
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/mohamed.jpg", alt: "Mohamed" },
  { src: "/images/rewan.jpg", alt: "Rewan" },
  { src: "/images/childhood.jpg", alt: "Childhood memories" },
  { src: "/images/childhood2.jpg", alt: "Childhood memories" },
  { src: "/images/mohamed.jpg", alt: "Mohamed portrait" },
  { src: "/images/rewan.jpg", alt: "Rewan portrait" },
] as const;

export const OPENING_QUOTE = "Every Love Story Has A Beginning...";

export const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";
