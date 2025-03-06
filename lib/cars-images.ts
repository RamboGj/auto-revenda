// Biblioteca de imagens de carros para uso na aplicação
// Estas são URLs públicas de imagens de carros de diferentes marcas e modelos

type CarImageCategory = 'sedan' | 'suv' | 'hatchback' | 'pickup' | 'luxury';

// Mapeamento de marcas para categorias comuns
const brandCategories: Record<string, CarImageCategory> = {
  'Toyota': 'sedan',
  'Honda': 'sedan',
  'Volkswagen': 'hatchback',
  'Jeep': 'suv',
  'Hyundai': 'sedan',
  'Fiat': 'hatchback',
  'Chevrolet': 'sedan',
  'Renault': 'hatchback',
  'Nissan': 'suv',
  'Ford': 'pickup',
  'BMW': 'luxury',
  'Mercedes-Benz': 'luxury',
  'Audi': 'luxury',
  'Mitsubishi': 'suv',
  'Kia': 'sedan',
  'Peugeot': 'hatchback',
  'Citroën': 'hatchback',
  'Volvo': 'luxury',
  'Land Rover': 'suv',
  'Subaru': 'suv'
};

// Coleção de imagens de carros por categoria
const carImages: Record<CarImageCategory, string[]> = {
  sedan: [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543796076-c4a574550e4e?auto=format&fit=crop&w=800&q=80",
  ],
  suv: [
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80",
  ],
  hatchback: [
    "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  ],
  pickup: [
    "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1569516449771-41c89ee14ca3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558383817-dd4bd9815294?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1568844293986-ca9c5c1d4b52?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609518336117-f8a5c786e9fb?auto=format&fit=crop&w=800&q=80",
  ],
  luxury: [
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
  ]
};

/**
 * Obtém imagens de carros com base na marca
 * @param brand Marca do carro
 * @param count Número de imagens a serem retornadas (padrão: 1)
 * @returns Array de URLs de imagens
 */
export function getCarImagesByBrand(brand: string, count: number = 1): string[] {
  // Determinar a categoria com base na marca
  const category = brandCategories[brand] || 'sedan';
  
  // Obter imagens da categoria
  const images = carImages[category];
  
  // Limitar o número de imagens ao disponível
  const limitedCount = Math.min(count, images.length);
  
  // Embaralhar as imagens para obter diferentes a cada chamada
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  
  // Retornar o número solicitado de imagens
  return shuffled.slice(0, limitedCount);
}

/**
 * Obtém imagens de carros por categoria específica
 * @param category Categoria do carro
 * @param count Número de imagens a serem retornadas (padrão: 1)
 * @returns Array de URLs de imagens
 */
export function getCarImagesByCategory(category: CarImageCategory, count: number = 1): string[] {
  // Obter imagens da categoria
  const images = carImages[category];
  
  // Limitar o número de imagens ao disponível
  const limitedCount = Math.min(count, images.length);
  
  // Embaralhar as imagens para obter diferentes a cada chamada
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  
  // Retornar o número solicitado de imagens
  return shuffled.slice(0, limitedCount);
}

/**
 * Obtém uma imagem aleatória de carro
 * @returns URL de uma imagem aleatória
 */
export function getRandomCarImage(): string {
  // Obter todas as categorias
  const categories = Object.keys(carImages) as CarImageCategory[];
  
  // Selecionar uma categoria aleatória
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  // Obter imagens da categoria
  const images = carImages[randomCategory];
  
  // Retornar uma imagem aleatória
  return images[Math.floor(Math.random() * images.length)];
}
