export type Gender = 'male' | 'female' | 'unisex';

export type NoteType = 'woody' | 'sweet' | 'spicy' | 'citrus' | 'fresh' | 'floral' | 'white floral' | 'amber' | 'musky' | 'powdery' | 'vanilla' | 'aromatic' | 'fresh spicy' | 'warm spicy' | 'leather' | 'fruity' | 'green' | 'patchouli' | 'rose' | 'iris' | 'earthy' | 'animalic' | 'oud' | 'smoky' | 'tobacco' | 'honey' | 'cinnamon' | 'almond' | 'cherry' | 'nutty' | 'balsamic' | 'rum' | 'mineral' | 'ozonic' | 'aquatic' | 'marine' | 'soapy' | 'tropical' | 'coconut' | 'salty' | 'caramel' | 'chocolate' | 'coffee' | 'tuberose' | 'yellow floral' | 'mossy' | 'herbal' | 'sand' | 'violet' | 'cacao' | 'anis' | 'balsamic' | 'lactonic' | 'aldehydic' | 'metallic' | 'soft spicy' | 'lavender' | 'saffron' | 'neroli' | 'black pepper' | 'mandarin' | 'pepper' | 'sage' | 'cardamom' | 'saffron' | 'black currant' | 'tea' | 'bergamot' | 'tobacco' | 'leather' | 'cannabis';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  notes: NoteType[];
  slug: string;
  isNiche?: boolean;
  is100ml?: boolean;
  isNew?: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  metafields: {
    edges: Array<{
      node: {
        key: string;
        value: string;
        namespace: string;
      };
    }>;
  };
}

export interface FilterOptions {
  gender: Gender | 'all' | 'none';
  notes: NoteType[];
  brand: string;
  search: string;
}