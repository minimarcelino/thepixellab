/**
 * Ilustrações originais que representam os serviços da The Pixel Lab
 * (não são trabalhos de clientes). Feitas em SVG: leves e nítidas em qualquer tela.
 */

interface Props {
  className?: string;
}

/** Quadro de identidade visual: marca, paleta e tipografia. */
export function DesignBoard({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustração de um quadro de identidade visual com logotipo, paleta de cores e tipografia">
      <rect width="400" height="300" fill="#E9E6DF" />
      {/* cartão do logo */}
      <rect x="40" y="44" width="150" height="150" rx="14" fill="#101010" />
      {[0, 1, 3, 4, 5, 7].map((i) => (
        <rect key={i} x={84 + (i % 3) * 22} y={88 + Math.floor(i / 3) * 22} width="18" height="18" fill="#F5F3EF" />
      ))}
      {[2, 6].map((i) => (
        <rect key={i} x={84 + (i % 3) * 22} y={88 + Math.floor(i / 3) * 22} width="18" height="18" fill="#F5F3EF" opacity=".25" />
      ))}
      <rect x="128" y="132" width="18" height="18" fill="#B7FF45" />
      {/* paleta */}
      {['#101010', '#292929', '#F5F3EF', '#B7FF45'].map((c, i) => (
        <g key={c}>
          <rect x={214 + i * 38} y="44" width="30" height="58" rx="6" fill={c} stroke="#101010" strokeOpacity=".12" />
        </g>
      ))}
      {/* tipografia */}
      <text x="214" y="164" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="56" fill="#101010" letterSpacing="-2">Aa</text>
      <rect x="300" y="124" width="64" height="7" rx="3.5" fill="#101010" opacity=".75" />
      <rect x="300" y="140" width="48" height="7" rx="3.5" fill="#101010" opacity=".35" />
      <rect x="300" y="156" width="56" height="7" rx="3.5" fill="#101010" opacity=".35" />
      {/* mini posts */}
      <rect x="214" y="186" width="44" height="44" rx="6" fill="#101010" />
      <rect x="222" y="214" width="26" height="5" rx="2.5" fill="#B7FF45" />
      <rect x="264" y="186" width="44" height="44" rx="6" fill="#B7FF45" />
      <rect x="272" y="196" width="18" height="18" fill="#101010" />
      <rect x="314" y="186" width="44" height="44" rx="6" fill="#F5F3EF" stroke="#101010" strokeOpacity=".15" />
      <rect x="322" y="214" width="28" height="5" rx="2.5" fill="#101010" opacity=".6" />
    </svg>
  );
}

/** Janela de navegador com uma landing page e um trecho de código. */
export function SystemsWindow({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustração de uma página web em construção, com o código ao lado">
      <rect width="400" height="300" fill="#B7FF45" />
      {/* navegador */}
      <rect x="36" y="40" width="250" height="196" rx="12" fill="#101010" />
      <circle cx="54" cy="56" r="4" fill="#F5F3EF" opacity=".35" />
      <circle cx="68" cy="56" r="4" fill="#F5F3EF" opacity=".35" />
      <circle cx="82" cy="56" r="4" fill="#B7FF45" />
      <rect x="100" y="51" width="150" height="10" rx="5" fill="#F5F3EF" opacity=".12" />
      <rect x="54" y="88" width="132" height="14" rx="3" fill="#F5F3EF" />
      <rect x="54" y="108" width="96" height="14" rx="3" fill="#F5F3EF" />
      <rect x="54" y="132" width="110" height="6" rx="3" fill="#F5F3EF" opacity=".4" />
      <rect x="54" y="144" width="90" height="6" rx="3" fill="#F5F3EF" opacity=".4" />
      <rect x="54" y="164" width="62" height="20" rx="10" fill="#B7FF45" />
      <rect x="122" y="164" width="56" height="20" rx="10" fill="none" stroke="#F5F3EF" strokeOpacity=".35" />
      <rect x="198" y="84" width="70" height="100" rx="8" fill="#292929" />
      <rect x="208" y="94" width="50" height="50" rx="4" fill="#F5F3EF" opacity=".1" />
      <rect x="208" y="154" width="40" height="6" rx="3" fill="#F5F3EF" opacity=".4" />
      <rect x="54" y="200" width="214" height="20" rx="6" fill="#F5F3EF" opacity=".06" />
      {/* painel de código */}
      <rect x="226" y="150" width="140" height="112" rx="12" fill="#F5F3EF" stroke="#101010" strokeOpacity=".15" />
      <text x="242" y="178" fontFamily="ui-monospace, monospace" fontSize="12" fill="#101010" opacity=".45">&lt;/&gt;</text>
      <rect x="242" y="190" width="70" height="6" rx="3" fill="#101010" opacity=".7" />
      <rect x="254" y="204" width="86" height="6" rx="3" fill="#3F6B00" />
      <rect x="254" y="218" width="58" height="6" rx="3" fill="#101010" opacity=".35" />
      <rect x="242" y="232" width="44" height="6" rx="3" fill="#101010" opacity=".7" />
      <rect x="292" y="232" width="8" height="12" fill="#101010" />
    </svg>
  );
}
