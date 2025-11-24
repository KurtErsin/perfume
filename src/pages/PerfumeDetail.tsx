import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PerfumeCard } from '../components/PerfumeCard';
import { getPerfumeBySlug, getRecommendations } from '../data/mockPerfumes';
import { getShopUrl, hasShopLink } from '../data/shopLinks';
import { useScrollToTop } from '../hooks/useScrollToTop';

const noteBadgeClasses = {
  woody: 'badge-woody',
  sweet: 'badge-sweet',
  spicy: 'badge-spicy',
  citrus: 'badge-citrus',
  fresh: 'badge-fresh',
  floral: 'badge-floral',
  'white floral': 'badge-white-floral',
  amber: 'badge-amber',
  musky: 'badge-musky',
  powdery: 'badge-powdery',
  vanilla: 'badge-vanilla',
  aromatic: 'badge-aromatic',
  'fresh spicy': 'badge-fresh-spicy',
  'warm spicy': 'badge-warm-spicy',
  leather: 'badge-leather',
  fruity: 'badge-fruity',
  green: 'badge-green',
  patchouli: 'badge-patchouli',
  rose: 'badge-rose',
  iris: 'badge-iris',
  earthy: 'badge-earthy',
  animalic: 'badge-animalic',
  oud: 'badge-oud',
  smoky: 'badge-smoky',
  tobacco: 'badge-tobacco',
  honey: 'badge-honey',
  cinnamon: 'badge-cinnamon',
  almond: 'badge-almond',
  cherry: 'badge-cherry',
  nutty: 'badge-nutty',
  balsamic: 'badge-balsamic',
  rum: 'badge-rum',
  mineral: 'badge-mineral',
  ozonic: 'badge-ozonic',
  aquatic: 'badge-aquatic',
  marine: 'badge-marine',
  soapy: 'badge-soapy',
  tropical: 'badge-tropical',
  coconut: 'badge-coconut',
  salty: 'badge-salty',
  caramel: 'badge-caramel',
  chocolate: 'badge-chocolate',
  coffee: 'badge-coffee',
  tuberose: 'badge-tuberose',
  'yellow floral': 'badge-yellow-floral',
  mossy: 'badge-mossy',
  herbal: 'badge-herbal',
  sand: 'badge-sand',
  violet: 'badge-violet',
  cacao: 'badge-cacao',
  anis: 'badge-anis',
  lactonic: 'badge-lactonic',
  aldehydic: 'badge-aldehydic',
  metallic: 'badge-metallic',
  'soft spicy': 'badge-soft-spicy',
  lavender: 'badge-lavender',
  saffron: 'badge-saffron',
  neroli: 'badge-neroli',
  'black pepper': 'badge-black-pepper',
  mandarin: 'badge-mandarin',
  pepper: 'badge-pepper',
  sage: 'badge-sage',
  cardamom: 'badge-cardamom',
  'black currant': 'badge-black-currant',
  tea: 'badge-tea',
  bergamot: 'badge-bergamot',
};

export function PerfumeDetail() {
  useScrollToTop();
  
  const { slug } = useParams<{ slug: string }>();
  const perfume = slug ? getPerfumeBySlug(slug) : undefined;

  if (!perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Perfume not found</h1>
          <Button asChild>
            <Link to="/discover">Back to Discover</Link>
          </Button>
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations(perfume);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          asChild 
          className="mb-6 animate-fade-in"
        >
          <Link to="/discover" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>
        </Button>

        {/* Product Details */}
        <div className="max-w-2xl mx-auto mb-16">
          {/* Product Info */}
          <div className="space-y-6 animate-slide-up">
            <div>
              <p className="text-accent font-medium mb-2">{perfume.brand}</p>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-foreground mb-4">
                {perfume.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <Badge
                  className={`capitalize ${
                    perfume.gender === 'male' ? 'bg-male text-white' :
                    perfume.gender === 'female' ? 'bg-female text-white' :
                    'bg-unisex text-white'
                  }`}
                >
                  {perfume.gender}
                </Badge>
                {perfume.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                    New
                  </Badge>
                )}
                {perfume.isNiche && (
                  <Badge className="bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold">
                    Niche
                  </Badge>
                )}
                {perfume.is100ml && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 font-bold">
                    100ml
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Notes</h3>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note) => (
                  <Badge
                    key={note}
                    className={`text-sm px-3 py-1 ${noteBadgeClasses[note] || 'bg-muted text-muted-foreground'} capitalize`}
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {/* Go to Shop Button - shows only if perfume has shop link */}
              {hasShopLink(perfume.id) && (
                <Button 
                  onClick={() => {
                    const shopUrl = getShopUrl(perfume.id);
                    if (shopUrl) {
                      window.open(shopUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="w-full sm:w-auto text-lg px-8 py-4 flex items-center gap-3 mb-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  🛒 Go to Shop
                </Button>
              )}
              
              <p className="text-sm text-muted-foreground mt-3">
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="animate-fade-in">
            <div className="mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-foreground mb-4">
                You Might Also Like
              </h2>
              <p className="text-muted-foreground">
                Similar fragrances based on notes and style
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec, index) => (
                <div 
                  key={rec.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PerfumeCard perfume={rec} />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/discover">Explore More Fragrances</Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}