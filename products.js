/**
 * Aria Noire Scents - Product Catalog Data
 * 
 * Instructions for Client / Admin:
 * - To add a new product, add a new object to the `products` array below.
 * - Make sure each product has a unique `id` (e.g. "an-009").
 * - Categories available: "women", "men", "unisex".
 * - Prices are numeric in KES (Kenyan Shillings). Confirmed range: KES 4,000 - 9,500.
 * - Set `featured: true` to highlight products in the "Signature Scents" showcase.
 */

const products = [
  {
    id: "an-001",
    name: "Noire Élan",
    category: "women",
    size: "50ml EDP",
    notes: "Black Amber · Damask Rose · Vanilla Bean",
    topNotes: "Bergamot, Pink Pepper",
    heartNotes: "Damask Rose, Jasmine Sambac",
    baseNotes: "Black Amber, Vanilla, Sandalwood",
    price: 6800,
    image: "images/products/an-001.jpg",
    featured: true,
    description: "An intoxicating blend of dark velvet amber wrapped around rich damask rose and warm vanilla. Crafted for the bold, elegant woman."
  },
  {
    id: "an-002",
    name: "Velvet Oud Royal",
    category: "unisex",
    size: "50ml Extrait de Parfum",
    notes: "Cambodian Oud · Saffron · Smoked Incense",
    topNotes: "Saffron, Cardamom",
    heartNotes: "Smoked Rose, Incense",
    baseNotes: "Cambodian Oud, Leather, Amberwood",
    price: 8900,
    image: "images/products/an-002.jpg",
    featured: true,
    description: "A commanding fragrance featuring aged Cambodian Oud blended with exotic spices and smoked rose petals. Luxurious and hypnotic."
  },
  {
    id: "an-003",
    name: "Lavington Luxe",
    category: "women",
    size: "50ml EDP",
    notes: "White Jasmine · Cashmere Wood · Tonka",
    topNotes: "Orange Blossom, Pear Blossom",
    heartNotes: "White Jasmine, Night Tuberose",
    baseNotes: "Cashmere Wood, Tonka Bean, Silk Musk",
    price: 5500,
    image: "images/products/an-003.jpg",
    featured: true,
    description: "Inspired by the serene elegance of Lavington. Bright floral blossoms settling into rich cashmere wood and warm tonka."
  },
  {
    id: "an-004",
    name: "Ombré Noir",
    category: "men",
    size: "100ml EDP",
    notes: "Smoky Birch · Dark Vetiver · Black Spice",
    topNotes: "Black Pepper, Crushed Grapefruit",
    heartNotes: "Smoky Birch, Atlas Cedarwood",
    baseNotes: "Haitian Vetiver, Dark Amber, Musk",
    price: 9500,
    image: "images/products/an-004.jpg",
    featured: false,
    description: "A masculine masterpiece of roasted woods, crushed spices, and deep vetiver. Designed for charismatic presence."
  },
  {
    id: "an-005",
    name: "Solstice d'Or",
    category: "unisex",
    size: "50ml EDP",
    notes: "Golden Amber · Wild Fig · Honeyed Cedar",
    topNotes: "Wild Fig Leaf, Sun-ripened Mandora",
    heartNotes: "Iris Root, Honeyed Cedar",
    baseNotes: "Golden Amber, Benzoin, Bourbon Vanilla",
    price: 7200,
    image: "images/products/an-005.jpg",
    featured: false,
    description: "Radiant golden sunshine captured in a bottle. Rich amber and wild Mediterranean fig balanced with creamy cedar."
  },
  {
    id: "an-006",
    name: "Rouge Seduction",
    category: "women",
    size: "50ml EDP",
    notes: "Wild Cherry · Crimson Rose · Dark Cocoa",
    topNotes: "Wild Cherry, Bitter Almond",
    heartNotes: "Crimson Rose, Plum Blossom",
    baseNotes: "Dark Cocoa, Vanilla Bourbon, Patchouli",
    price: 4800,
    image: "images/products/an-006.jpg",
    featured: false,
    description: "A sensual, playful scent of dark cherry and crimson rose laced with rich cocoa undertones. Irresistible and alluring."
  },
  {
    id: "an-007",
    name: "Imperial Citrus & Cedar",
    category: "men",
    size: "50ml EDP",
    notes: "Calabrian Bergamot · Atlas Cedar · Vetiver",
    topNotes: "Calabrian Bergamot, Meyer Lime",
    heartNotes: "Clary Sage, Atlas Cedar",
    baseNotes: "Burnt Vetiver, Oakmoss, Ambergris",
    price: 4200,
    image: "images/products/an-007.jpg",
    featured: false,
    description: "Crisp Italian bergamot elevated by dry cedarwood and earthy oakmoss. Refreshing, sophisticated, and clean."
  },
  {
    id: "an-008",
    name: "Aria Sublime",
    category: "unisex",
    size: "50ml Extrait",
    notes: "White Leather · Cashmere · Warm Musk",
    topNotes: "Violet Leaf, Italian Bergamot",
    heartNotes: "White Leather, Florentine Orris",
    baseNotes: "Cashmere, Warm Musk, Dry Cedar",
    price: 8500,
    image: "images/products/an-008.jpg",
    featured: true,
    description: "Our signature house creation. Smooth white leather intertwined with rare Florentine iris and velvety cashmere."
  }
];

// Helper to format currency in KES
function formatKES(amount) {
  return 'KES ' + amount.toLocaleString('en-KE');
}

// Export for module systems if needed, otherwise available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, formatKES };
}
