export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tag?: string; // e.g. "House Favorite", "Organic", "Vegan", "New"
  image: string;
  imageAlt: string;
  calories?: string;
  notes?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  items: MenuItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  caption: string;
  aspect?: 'tall' | 'wide' | 'square';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  avatarAlt: string;
  date: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export interface CafeConfig {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    shortBio: string;
    foundedYear: number;
    locationCity: string;
  };
  contact: {
    address: string;
    googleMapsUrl: string;
    phone: string;
    email: string;
    hours: {
      weekday: string;
      weekend: string;
      holidayNote: string;
    };
  };
  socials: SocialLink[];
  stats: StatItem[];
  about: {
    badge: string;
    headline: string;
    storyParagraphs: string[];
    quote: {
      text: string;
      author: string;
      role: string;
    };
    images: {
      roaster: { src: string; alt: string };
      cafeSpace: { src: string; alt: string };
    };
    pillars: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  menuCategories: MenuCategory[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  reservation: {
    title: string;
    subtitle: string;
    seatingOptions: { id: string; name: string; description: string }[];
    timeSlots: string[];
  };
}
