import { Product } from '../types/product';

export const mockProducts: Product[] = [
  // MEN - TANKS
  {
    id: 'm1',
    name: 'Performance Tank Top',
    description: 'Breathable mesh tank designed for maximum airflow during intense workouts. Features moisture-wicking technology and athletic fit.',
    price: 24.99,
    category: 'Tanks',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Red', hex: '#DC143C' },
    ],
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800',
    ],
    stock: 120,
    featured: true,
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'm2',
    name: 'Muscle Fit Tank',
    description: 'Athletic muscle tank with dropped armholes for maximum movement. Premium cotton blend for comfort and durability.',
    price: 29.99,
    category: 'Tanks',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    stock: 85,
    createdAt: '2026-03-11T10:00:00Z',
  },

  // MEN - COMPRESSIONS
  {
    id: 'm3',
    name: 'Compression Long Sleeve',
    description: 'Full compression long sleeve top with 4-way stretch fabric. Engineered for optimal muscle support and recovery.',
    price: 49.99,
    category: 'Compressions',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Royal Blue', hex: '#4169E1' },
    ],
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800',
    ],
    stock: 95,
    featured: true,
    createdAt: '2026-03-12T10:00:00Z',
  },
  {
    id: 'm4',
    name: 'Base Layer Compression Shirt',
    description: 'Lightweight compression base layer with seamless construction. Perfect for layering or solo wear.',
    price: 44.99,
    category: 'Compressions',
    gender: 'Men',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800',
    ],
    stock: 110,
    createdAt: '2026-03-13T10:00:00Z',
  },

  // MEN - HOODIES & JACKETS
  {
    id: 'm5',
    name: 'Zip-Up Performance Hoodie',
    description: 'Technical hoodie with full zip closure and thumbholes. Water-resistant fabric keeps you dry in light rain.',
    price: 79.99,
    category: 'Hoodies & Jackets',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Forest Green', hex: '#228B22' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    stock: 75,
    featured: true,
    createdAt: '2026-03-14T10:00:00Z',
  },
  {
    id: 'm6',
    name: 'Windbreaker Jacket',
    description: 'Lightweight packable windbreaker with adjustable hood. Features reflective details for visibility.',
    price: 89.99,
    category: 'Hoodies & Jackets',
    gender: 'Men',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Neon Yellow', hex: '#FFFF00' },
      { name: 'Electric Blue', hex: '#7DF9FF' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    stock: 60,
    createdAt: '2026-03-15T10:00:00Z',
  },

  // MEN - SHORTS
  {
    id: 'm7',
    name: 'Training Shorts 7"',
    description: 'Versatile training shorts with 7-inch inseam. Quick-dry fabric with multiple pockets for storage.',
    price: 39.99,
    category: 'Shorts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Olive', hex: '#808000' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    ],
    stock: 130,
    featured: true,
    createdAt: '2026-03-16T10:00:00Z',
  },
  {
    id: 'm8',
    name: 'Running Shorts 5"',
    description: 'Lightweight running shorts with built-in liner. Reflective logo for night visibility.',
    price: 34.99,
    category: 'Shorts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Royal Blue', hex: '#4169E1' },
    ],
    images: [
      'https://images.unsplash.com/photo-1598032895397-f5f5a6c3ec75?w=800',
    ],
    stock: 100,
    createdAt: '2026-03-17T10:00:00Z',
  },

  // MEN - JEANS
  {
    id: 'm9',
    name: 'Slim Fit Dark Jeans',
    description: 'Modern slim-fit jeans with slight stretch for comfort. Dark indigo wash with minimal fading.',
    price: 79.99,
    category: 'Jeans',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dark Indigo', hex: '#1a3a52' },
      { name: 'Black', hex: '#000000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    ],
    stock: 90,
    createdAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'm10',
    name: 'Relaxed Fit Light Wash Jeans',
    description: 'Comfortable relaxed fit with vintage light wash. Classic five-pocket styling.',
    price: 74.99,
    category: 'Jeans',
    gender: 'Men',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Light Wash', hex: '#6fa8d7' },
      { name: 'Medium Wash', hex: '#4a7fa7' },
    ],
    images: [
      'https://images.unsplash.com/photo-1475178626620-a4d3e9c7e1f4?w=800',
    ],
    stock: 80,
    featured: true,
    createdAt: '2026-03-19T10:00:00Z',
  },

  // MEN - JOGGERS & PANTS
  {
    id: 'm11',
    name: 'Tech Fleece Joggers',
    description: 'Premium tech fleece joggers with tapered fit. Zippered side pockets and elastic cuffs.',
    price: 64.99,
    category: 'Joggers & Pants',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    ],
    stock: 115,
    featured: true,
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'm12',
    name: 'Track Pants',
    description: 'Athletic track pants with side stripe detail. Moisture-wicking fabric for active wear.',
    price: 54.99,
    category: 'Joggers & Pants',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black/White', hex: '#000000' },
      { name: 'Navy/White', hex: '#001f3f' },
      { name: 'Gray/Black', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    ],
    stock: 95,
    createdAt: '2026-03-01T10:00:00Z',
  },

  // MEN - T-SHIRTS
  {
    id: 'm13',
    name: 'Premium Cotton Tee',
    description: 'Ultra-soft premium cotton t-shirt with reinforced seams. Perfect everyday essential.',
    price: 29.99,
    category: 'T-Shirts',
    gender: 'Men',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    stock: 200,
    featured: true,
    createdAt: '2026-03-02T10:00:00Z',
  },
  {
    id: 'm14',
    name: 'Oversized Graphic Tee',
    description: 'Trendy oversized fit with bold graphic print. Heavyweight cotton for premium feel.',
    price: 44.99,
    category: 'T-Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sand', hex: '#C2B280' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    stock: 140,
    createdAt: '2026-03-03T10:00:00Z',
  },

  // MEN - POLOS
  {
    id: 'm15',
    name: 'Classic Polo Shirt',
    description: 'Timeless pique polo with button placket. Comfortable fit for casual or smart-casual wear.',
    price: 49.99,
    category: 'Polos',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#001f3f' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Red', hex: '#DC143C' },
    ],
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800',
    ],
    stock: 105,
    createdAt: '2026-03-04T10:00:00Z',
  },

  // MEN - UNDERWEAR
  {
    id: 'm16',
    name: 'Performance Boxer Briefs (3-Pack)',
    description: 'Breathable boxer briefs with anti-chafe technology. Moisture-wicking fabric keeps you dry.',
    price: 39.99,
    category: 'Underwear',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black/Gray/Navy', hex: '#000000' },
      { name: 'Multi-Color Pack', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617094112951-8b8daa1ee0a5?w=800',
    ],
    stock: 150,
    featured: true,
    createdAt: '2026-03-05T10:00:00Z',
  },

  // WOMEN - T-SHIRTS
  {
    id: 'w1',
    name: 'Essential V-Neck Tee',
    description: 'Flattering v-neck tee in soft cotton blend. Relaxed fit for all-day comfort.',
    price: 27.99,
    category: 'T-Shirts',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Lavender', hex: '#E6E6FA' },
      { name: 'Mint', hex: '#98FF98' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800',
    ],
    stock: 180,
    featured: true,
    createdAt: '2026-03-06T10:00:00Z',
  },
  {
    id: 'w2',
    name: 'Crop Athletic Tee',
    description: 'Trendy cropped tee with moisture-wicking properties. Perfect for workouts or casual wear.',
    price: 32.99,
    category: 'T-Shirts',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Sage', hex: '#87AE73' },
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    stock: 125,
    createdAt: '2026-03-07T10:00:00Z',
  },

  // WOMEN - POLOS
  {
    id: 'w3',
    name: 'Women\'s Performance Polo',
    description: 'Athletic polo with UPF sun protection. Tailored fit with feminine silhouette.',
    price: 46.99,
    category: 'Polos',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Navy', hex: '#001f3f' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Pink', hex: '#FFC0CB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800',
    ],
    stock: 90,
    createdAt: '2026-03-08T10:00:00Z',
  },

  // WOMEN - CROP TOPS
  {
    id: 'w4',
    name: 'Seamless Sports Crop',
    description: 'Seamless construction crop top for ultimate comfort. Medium support for various activities.',
    price: 38.99,
    category: 'Crop Tops',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Nude', hex: '#E3BC9A' },
      { name: 'Dusty Rose', hex: '#DCAE96' },
      { name: 'Teal', hex: '#008080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800',
    ],
    stock: 110,
    featured: true,
    createdAt: '2026-03-09T10:00:00Z',
  },
  {
    id: 'w5',
    name: 'Ribbed Crop Tank',
    description: 'Trendy ribbed crop tank with racerback design. Soft stretchy fabric for all-day wear.',
    price: 29.99,
    category: 'Crop Tops',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Caramel', hex: '#C68E17' },
      { name: 'Lilac', hex: '#C8A2C8' },
    ],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    ],
    stock: 135,
    createdAt: '2026-02-28T10:00:00Z',
  },

  // WOMEN - TANKS
  {
    id: 'w6',
    name: 'Flowy Workout Tank',
    description: 'Loose-fit tank with breathable mesh panels. Perfect for yoga and low-impact workouts.',
    price: 34.99,
    category: 'Tanks',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Mint', hex: '#98FF98' },
    ],
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800',
    ],
    stock: 100,
    createdAt: '2026-02-27T10:00:00Z',
  },

  // WOMEN - LEGGINGS
  {
    id: 'w7',
    name: 'High-Waist Sculpting Leggings',
    description: 'Supportive high-waist leggings with tummy control. Squat-proof and non-see-through.',
    price: 68.99,
    category: 'Leggings',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    ],
    stock: 160,
    featured: true,
    createdAt: '2026-02-26T10:00:00Z',
  },
  {
    id: 'w8',
    name: 'Mesh Panel Leggings',
    description: 'Stylish leggings with mesh cutout panels. Moisture-wicking and quick-dry technology.',
    price: 58.99,
    category: 'Leggings',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Plum', hex: '#8E4585' },
    ],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    ],
    stock: 120,
    createdAt: '2026-02-25T10:00:00Z',
  },

  // WOMEN - SHORTS
  {
    id: 'w9',
    name: 'Biker Shorts 7"',
    description: 'High-waist biker shorts with phone pocket. Compressive fabric for support.',
    price: 42.99,
    category: 'Shorts',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Dusty Pink', hex: '#DCAE96' },
      { name: 'Sage', hex: '#87AE73' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    ],
    stock: 140,
    createdAt: '2026-02-24T10:00:00Z',
  },
  {
    id: 'w10',
    name: 'Running Shorts 3"',
    description: 'Lightweight running shorts with built-in liner and side pockets.',
    price: 36.99,
    category: 'Shorts',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Teal', hex: '#008080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1598032895397-f5f5a6c3ec75?w=800',
    ],
    stock: 115,
    featured: true,
    createdAt: '2026-02-23T10:00:00Z',
  },

  // WOMEN - SKIRTS
  {
    id: 'w11',
    name: 'Tennis Skort',
    description: 'Athletic skort with built-in shorts. Sweat-wicking and stretchy fabric.',
    price: 48.99,
    category: 'Skirts',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Pink', hex: '#FFC0CB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
    ],
    stock: 95,
    createdAt: '2026-02-22T10:00:00Z',
  },

  // WOMEN - HOODIES & JACKETS
  {
    id: 'w12',
    name: 'Cropped Zip Hoodie',
    description: 'Trendy cropped hoodie with full zip. Soft fleece interior for warmth.',
    price: 72.99,
    category: 'Hoodies & Jackets',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Lavender', hex: '#E6E6FA' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    stock: 105,
    createdAt: '2026-02-21T10:00:00Z',
  },
  {
    id: 'w13',
    name: 'Lightweight Puffer Jacket',
    description: 'Packable puffer jacket with water-resistant shell. Perfect for layering.',
    price: 98.99,
    category: 'Hoodies & Jackets',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    stock: 80,
    featured: true,
    createdAt: '2026-02-20T10:00:00Z',
  },

  // WOMEN - JOGGERS & PANTS
  {
    id: 'w14',
    name: 'Relaxed Joggers',
    description: 'Comfortable relaxed-fit joggers with tapered ankles. Soft brushed fleece inside.',
    price: 59.99,
    category: 'Joggers & Pants',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Mauve', hex: '#E0B0FF' },
      { name: 'Sage', hex: '#87AE73' },
    ],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    ],
    stock: 130,
    createdAt: '2026-02-19T10:00:00Z',
  },

  // WOMEN - SPORTS BRA
  {
    id: 'w15',
    name: 'High Impact Sports Bra',
    description: 'Maximum support sports bra for high-intensity workouts. Adjustable straps and removable pads.',
    price: 52.99,
    category: 'Sports Bra',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800',
    ],
    stock: 145,
    featured: true,
    createdAt: '2026-02-18T10:00:00Z',
  },
  {
    id: 'w16',
    name: 'Seamless Low Impact Bra',
    description: 'Wireless seamless bra for low to medium impact activities. Ultra-comfortable fit.',
    price: 42.99,
    category: 'Sports Bra',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Nude', hex: '#E3BC9A' },
      { name: 'Dusty Pink', hex: '#DCAE96' },
      { name: 'Sage', hex: '#87AE73' },
    ],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    ],
    stock: 120,
    createdAt: '2026-02-17T10:00:00Z',
  },

  // WOMEN - ONE PIECE
  {
    id: 'w17',
    name: 'Athletic Bodysuit',
    description: 'Sleek one-piece bodysuit with snap closure. Perfect for layering or solo wear.',
    price: 54.99,
    category: 'One Piece',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Caramel', hex: '#C68E17' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800',
    ],
    stock: 85,
    createdAt: '2026-02-16T10:00:00Z',
  },

  // WOMEN - UNDERWEAR
  {
    id: 'w18',
    name: 'Seamless Hipster (5-Pack)',
    description: 'No-show seamless hipster underwear. Tagless and comfortable for all-day wear.',
    price: 44.99,
    category: 'Underwear',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Nude Tones', hex: '#E3BC9A' },
      { name: 'Black/Gray Pack', hex: '#000000' },
      { name: 'Pastel Pack', hex: '#FFC0CB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617094112951-8b8daa1ee0a5?w=800',
    ],
    stock: 175,
    createdAt: '2026-02-15T10:00:00Z',
  },

  // KIDS - BOYS
  {
    id: 'k1',
    name: 'Boys Athletic Tee',
    description: 'Breathable athletic tee for active kids. Moisture-wicking and durable.',
    price: 22.99,
    category: 'T-Shirts',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blue', hex: '#4169E1' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Green', hex: '#228B22' },
      { name: 'Black', hex: '#000000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    stock: 110,
    createdAt: '2026-02-14T10:00:00Z',
  },
  {
    id: 'k2',
    name: 'Boys Training Shorts',
    description: 'Comfortable training shorts with elastic waistband. Quick-dry fabric.',
    price: 26.99,
    category: 'Shorts',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    ],
    stock: 95,
    featured: true,
    createdAt: '2026-02-13T10:00:00Z',
  },
  {
    id: 'k3',
    name: 'Boys Zip Hoodie',
    description: 'Soft fleece hoodie with full zip. Perfect for active play and school.',
    price: 44.99,
    category: 'Hoodies',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    stock: 80,
    createdAt: '2026-02-12T10:00:00Z',
  },

  // KIDS - GIRLS
  {
    id: 'k4',
    name: 'Girls Sports Tee',
    description: 'Cute and comfortable sports tee with fun prints. Breathable cotton blend.',
    price: 22.99,
    category: 'T-Shirts',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Purple', hex: '#800080' },
      { name: 'Mint', hex: '#98FF98' },
      { name: 'Coral', hex: '#FF7F50' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800',
    ],
    stock: 105,
    createdAt: '2026-02-11T10:00:00Z',
  },
  {
    id: 'k5',
    name: 'Girls Leggings',
    description: 'Stretchy and comfortable leggings for active girls. High-waist design.',
    price: 32.99,
    category: 'Leggings',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Purple', hex: '#800080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    ],
    stock: 115,
    featured: true,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'k6',
    name: 'Girls Hoodie',
    description: 'Cozy fleece hoodie with cute design. Soft and warm for cooler days.',
    price: 42.99,
    category: 'Hoodies',
    gender: 'Kids',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Lavender', hex: '#E6E6FA' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    stock: 90,
    createdAt: '2026-02-09T10:00:00Z',
  },

  // ACCESSORIES - BAGS
  {
    id: 'a1',
    name: 'Gym Duffel Bag',
    description: 'Spacious duffel bag with multiple compartments. Water-resistant and durable.',
    price: 64.99,
    category: 'Bags',
    gender: 'Unisex',
    sizes: ['M'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    stock: 75,
    featured: true,
    createdAt: '2026-02-08T10:00:00Z',
  },
  {
    id: 'a2',
    name: 'Backpack',
    description: 'Functional backpack with laptop sleeve and multiple pockets. Padded straps for comfort.',
    price: 74.99,
    category: 'Bags',
    gender: 'Unisex',
    sizes: ['M'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'Olive', hex: '#808000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    stock: 95,
    createdAt: '2026-02-07T10:00:00Z',
  },

  // ACCESSORIES - CAPS
  {
    id: 'a3',
    name: 'Performance Cap',
    description: 'Breathable athletic cap with moisture-wicking sweatband. Adjustable strap.',
    price: 28.99,
    category: 'Caps',
    gender: 'Unisex',
    sizes: ['M'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#001f3f' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
    ],
    stock: 140,
    createdAt: '2026-02-06T10:00:00Z',
  },
  {
    id: 'a4',
    name: 'Snapback Hat',
    description: 'Classic snapback with embroidered logo. Flat brim and structured crown.',
    price: 32.99,
    category: 'Caps',
    gender: 'Unisex',
    sizes: ['M'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy/White', hex: '#001f3f' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
    ],
    stock: 120,
    featured: true,
    createdAt: '2026-02-05T10:00:00Z',
  },

  // ACCESSORIES - SOCKS
  {
    id: 'a5',
    name: 'Performance Crew Socks (3-Pack)',
    description: 'Cushioned athletic crew socks with arch support. Moisture-wicking fabric.',
    price: 24.99,
    category: 'Socks',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
    ],
    stock: 200,
    createdAt: '2026-02-04T10:00:00Z',
  },
  {
    id: 'a6',
    name: 'No-Show Socks (5-Pack)',
    description: 'Invisible no-show socks with silicone grip. Perfect for sneakers.',
    price: 19.99,
    category: 'Socks',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Multi-Color', hex: '#808080' },
    ],
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
    ],
    stock: 180,
    createdAt: '2026-02-03T10:00:00Z',
  },

  // ACCESSORIES - BELTS
  {
    id: 'a7',
    name: 'Leather Belt',
    description: 'Classic leather belt with metal buckle. Versatile for casual or dress wear.',
    price: 44.99,
    category: 'Belts',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-70e2e6dbf7cc?w=800',
    ],
    stock: 100,
    createdAt: '2026-02-02T10:00:00Z',
  },

  // ACCESSORIES - GLOVES
  {
    id: 'a8',
    name: 'Training Gloves',
    description: 'Padded training gloves with wrist support. Breathable mesh back.',
    price: 34.99,
    category: 'Gloves',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Blue', hex: '#4169E1' },
    ],
    images: [
      'https://images.unsplash.com/photo-1606390288053-5fddb0b8e8f8?w=800',
    ],
    stock: 90,
    featured: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
];
