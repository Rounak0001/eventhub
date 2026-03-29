export type EventItem = {
  id: string
  title: string
  type: string
  city: string
  date: string
  price: string
  guests: number
  description: string
}

export const heroSlides = [
  ['/img1.jpg', '/img1.jpeg', '/img1.png', '/img1.webp', '/IMG1.jpg', '/IMG1.jpeg', '/IMG1.png', '/IMG1.webp'],
  ['/img2.jpg', '/img2.jpeg', '/img2.png', '/img2.webp', '/IMG2.jpg', '/IMG2.jpeg', '/IMG2.png', '/IMG2.webp'],
  ['/img3.jpg', '/img3.jpeg', '/img3.png', '/img3.webp', '/IMG3.jpg', '/IMG3.jpeg', '/IMG3.png', '/IMG3.webp'],
]

export const featuredEvents: EventItem[] = [
  {
    id: 'royal-wedding',
    title: 'Royal Wedding Couple',
    type: 'Wedding Planning',
    city: 'Goa',
    date: '12 April 2026',
    price: '$4,800',
    guests: 280,
    description: 'A floral beach mandap experience with family-focused hospitality and editorial styling.',
  },
  {
    id: 'moonlight-reception',
    title: 'Moonlight Reception',
    type: 'Reception Styling',
    city: 'Jaipur',
    date: '19 May 2026',
    price: '$5,600',
    guests: 340,
    description: 'Soft candle lighting, layered drapery, and an evening atmosphere shaped for unforgettable photos.',
  },
  {
    id: 'heritage-sangeet',
    title: 'Heritage Sangeet Night',
    type: 'Music Celebration',
    city: 'Udaipur',
    date: '03 June 2026',
    price: '$3,950',
    guests: 220,
    description: 'A bold stage-led celebration with entertainment choreography, food flow, and guest comfort.',
  },
]

export const serviceCards = [
  'Wedding Planning',
  'Decor Styling',
  'Venue Curation',
  'Photography',
  'Guest Hospitality',
  'Luxury Catering',
]

export const dashboardStats = [
  { label: 'Events Planned', value: '126' },
  { label: 'Happy Couples', value: '98' },
  { label: 'Vendor Partners', value: '42' },
  { label: 'Cities Covered', value: '18' },
]

export const venues = [
  { id: 'v1', name: 'Palm Shore Mandap', city: 'Goa', price: '$1,800' },
  { id: 'v2', name: 'Royal Courtyard Hall', city: 'Jaipur', price: '$2,100' },
  { id: 'v3', name: 'Skyline Terrace Deck', city: 'Mumbai', price: '$2,450' },
]

export const vendors = [
  { id: 'd1', name: 'Blush Bloom Decor', type: 'Decor', price: '$850' },
  { id: 'd2', name: 'Golden Plate Catering', type: 'Food', price: '$1,150' },
  { id: 'd3', name: 'Velvet Lens Studio', type: 'Photo', price: '$700' },
]
