export interface NFT {
  id: number
  name: string
  description: string
  creator: string
  owner: string
  price: number
  image: string
  url: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic'
  forSale: boolean
  dateListed: string
}

export const initialNFTs: NFT[] = [
  { id: 1, name: "Cosmic Voyager", description: "A journey through the stars", creator: "Stella Nova", owner: "Marketplace", price: 0.5, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/cosmic-voyager", rarity: "rare", forSale: true, dateListed: "2023-06-01" },
  { id: 2, name: "Digital Dream", description: "A surreal digital landscape", creator: "Pixel Master", owner: "Marketplace", price: 0.8, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/digital-dream", rarity: "uncommon", forSale: true, dateListed: "2023-06-02" },
  { id: 3, name: "Neon Nights", description: "Vibrant city lights in the dark", creator: "Glow Wizard", owner: "Marketplace", price: 0.3, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/neon-nights", rarity: "common", forSale: true, dateListed: "2023-06-03" },
  { id: 4, name: "Quantum Quill", description: "Writing the future with quantum ink", creator: "Data Poet", owner: "Marketplace", price: 1.2, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/quantum-quill", rarity: "epic", forSale: true, dateListed: "2023-06-04" },
  { id: 5, name: "Cyber Serenity", description: "Finding peace in the digital chaos", creator: "Zen Coder", owner: "Marketplace", price: 0.7, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/cyber-serenity", rarity: "uncommon", forSale: true, dateListed: "2023-06-05" },
  { id: 6, name: "Fractal Phoenix", description: "Rebirth through mathematical beauty", creator: "Chaos Artist", owner: "Marketplace", price: 2.0, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/fractal-phoenix", rarity: "rare", forSale: true, dateListed: "2023-06-06" },
]

export const initialUserCollection: NFT[] = [
  { id: 7, name: "Ethereal Whisper", description: "A gentle breeze of digital art", creator: "You", owner: "You", price: 1.5, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/ethereal-whisper", rarity: "rare", forSale: false, dateListed: "" },
  { id: 8, name: "Pixel Pulse", description: "The heartbeat of the digital realm", creator: "You", owner: "You", price: 0.9, image: "/placeholder.svg?height=400&width=400", url: "https://example.com/pixel-pulse", rarity: "uncommon", forSale: false, dateListed: "" },
]

