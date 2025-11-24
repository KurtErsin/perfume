import { Link } from 'react-router-dom';
import { Perfume } from '../types/perfume';
import { Badge } from './ui/badge';

interface PerfumeCardProps {
  perfume: Perfume;
}

const genderBorderClasses = {
  male: 'border-2 border-blue-500 shadow-lg shadow-blue-500/20',
  female: 'border-2 border-pink-500 shadow-lg shadow-pink-500/20',
  unisex: 'border-2 border-purple-500 shadow-lg shadow-purple-500/20',
};

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

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  // Determine hover effect based on properties
  const getHoverClass = () => {
    if (perfume.is100ml) {
      return 'hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:border-yellow-400/50 hover:bg-gradient-to-br hover:from-yellow-50/80 hover:to-amber-100/60';
    }
    if (perfume.isNiche) {
      return 'hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-amber-50/80 hover:to-yellow-100/60';
    }
    return '';
  };

  return (
    <div className={`card-luxury ${genderBorderClasses[perfume.gender]} ${getHoverClass()} group relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300`}>
      {/* Badges Container */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {perfume.isNew && (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 shadow-lg">
            New
          </Badge>
        )}
        {perfume.isNiche && (
          <Badge className="bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs font-bold px-2 py-1 shadow-lg">
            Niche
          </Badge>
        )}
        {perfume.is100ml && (
          <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 text-xs font-bold px-2 py-1 shadow-lg">
            100ml
          </Badge>
        )}
      </div>
      
      <Link to={`/perfume/${perfume.slug}`} className="block">
        
        <div className="p-4 space-y-3">
          <div className="space-y-1">
                         <p className="text-sm text-[#AF8F5C] font-semibold">{perfume.brand}</p>
                               <h3 className="font-montserrat font-semibold text-base text-foreground leading-tight">
              {perfume.name.replace(/\([WMU][a-z]*\s*\d+\)/g, '').trim()}
            </h3>
                         {perfume.name.match(/\([WMU][a-z]*\s*\d+\)/) && (
               <p className="text-sm font-bold text-black">
                 {perfume.name.match(/\([WMU][a-z]*\s*\d+\)/)?.[0]}
               </p>
             )}
          </div>

          <div className="flex flex-wrap gap-1">
            {perfume.notes.map((note) => (
              <Badge
                key={note}
                className={`text-xs px-2 py-1 ${noteBadgeClasses[note] || 'bg-muted text-muted-foreground'} capitalize`}
              >
                {note}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              perfume.gender === 'male' ? 'bg-male/10 text-male' :
              perfume.gender === 'female' ? 'bg-female/10 text-female' :
              'bg-unisex/10 text-unisex'
            } capitalize`}>
              {perfume.gender === 'male' ? (
                <span><strong>M</strong>ale</span>
              ) : perfume.gender === 'female' ? (
                                     <span><strong>F</strong>emale</span>
              ) : (
                <span><strong>U</strong>nisex</span>
              )}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}