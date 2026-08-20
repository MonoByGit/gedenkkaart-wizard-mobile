import React from 'react';
import { WizardState, ThemeDef, FontPairingDef } from '../types/wizard';
import { THEMES, PAIRINGS, formatDateDutch, ptcqw } from '../constants/wizard';

interface CardPreviewProps {
  state: WizardState;
  interactive?: boolean;
  onOpenSheet?: (sheet: 'naam' | 'data' | 'spreuk' | 'binnen' | 'praktisch' | 'familie' | 'stijl' | 'thema') => void;
  onZoomBinnen?: (side: 'links' | 'rechts' | null) => void;
  onCardClick?: () => void;
  className?: string;
  isMini?: boolean;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  state: s,
  interactive = false,
  onOpenSheet,
  onZoomBinnen,
  onCardClick,
  className = '',
  isMini = false
}) => {
  const isEnkel = s.formaat === 'enkel';
  const isVolledigeFoto = s.smaak === 'volledige-foto';
  const isVrijgezet = s.smaak === 'vrijgezet';
  const thema: ThemeDef | null = THEMES.find((t) => t.id === s.thema) || null;
  const pairing: FontPairingDef = PAIRINGS.find((p) => p.id === s.fontPairing) || PAIRINGS[1];

  // Uitstraling mode
  const effectiveMode =
    s.uitstraling === 'automatisch'
      ? (s.indeling === 'volledig' || s.indeling === 'sfeer-voorop')
        ? (isVolledigeFoto || isVrijgezet ? 'donker' : 'licht')
        : 'licht'
      : s.uitstraling;
  const isLichtMode = effectiveMode === 'licht';
  const textColor = isLichtMode ? '#1a1a1e' : '#fcfcfd';
  const placeholderColor = isLichtMode ? 'rgba(26,26,30,.42)' : 'rgba(252,252,253,.55)';
  const textShadowCss =
    s.indeling === 'volledig'
      ? isLichtMode
        ? '0 0 6px rgba(252,252,253,.4)'
        : '0 0 6px rgba(20,17,22,.55)'
      : 'none';

  const scrimCss = isLichtMode
    ? 'linear-gradient(to top, rgba(252,252,253,.75) 0%, rgba(252,252,253,.5) 38%, rgba(252,252,253,.18) 72%, rgba(252,252,253,0) 100%)'
    : 'linear-gradient(to top, rgba(20,17,22,.65) 0%, rgba(20,17,22,.4) 38%, rgba(20,17,22,.15) 72%, rgba(20,17,22,0) 100%)';
  const topScrimCss = isLichtMode
    ? 'linear-gradient(to bottom, rgba(252,252,253,.7) 0%, rgba(252,252,253,.46) 40%, rgba(252,252,253,.15) 76%, rgba(252,252,253,0) 100%)'
    : 'linear-gradient(to bottom, rgba(20,17,22,.55) 0%, rgba(20,17,22,.35) 40%, rgba(20,17,22,.12) 76%, rgba(20,17,22,0) 100%)';

  const matBgColor = thema
    ? isLichtMode
      ? thema.matLight
      : thema.matDark
    : isLichtMode
    ? '#f0f1f4'
    : '#27272a';
  const themeGradient = thema ? thema.bg : 'linear-gradient(158deg,#cfd2d8,#eceef0)';

  const alignCss: React.CSSProperties['textAlign'] =
    s.uitlijning === 'links' ? 'left' : s.uitlijning === 'rechts' ? 'right' : 'center';
  const alignItemsCss: React.CSSProperties['alignItems'] =
    s.uitlijning === 'links' ? 'flex-start' : s.uitlijning === 'rechts' ? 'flex-end' : 'center';

  const sizePt = {
    naam: { klein: 20, normaal: 26, groot: 32 },
    data: { klein: 10, normaal: 12, groot: 14 },
    spreuk: { klein: 12, normaal: 14, groot: 17 },
    binnen: { klein: 12, normaal: 14, groot: 17 }
  };

  // Dynamic name auto-scaling for long Dutch names to prevent ugly wrapping
  const nameLength = s.naam.trim().length;
  const nameLengthMult =
    nameLength > 28
      ? 0.78
      : nameLength > 22
      ? 0.86
      : nameLength > 16
      ? 0.94
      : 1.0;

  const naamPt = sizePt.naam[s.sizes.naam] * (pairing.naamMult || 1) * nameLengthMult;
  const dataPt = sizePt.data[s.sizes.data];
  const spreukPt = sizePt.spreuk[s.sizes.spreuk];
  const binnenPt = sizePt.binnen[s.sizes.binnen];

  const activeRing = (block: string) =>
    interactive && s.activeSheet === block
      ? `0 0 0 2px ${isLichtMode ? 'rgba(26,26,30,.55)' : 'rgba(252,252,253,.75)'}`
      : 'none';
  const editHintColor = isLichtMode ? 'rgba(26,26,30,.18)' : 'rgba(252,252,253,.25)';
  const editHint = (filled: boolean) =>
    interactive && filled && !s.fullscreenOpen
      ? { borderBottom: `1px dashed ${editHintColor}` }
      : {};

  const naamStyle: React.CSSProperties = {
    fontFamily: pairing.naamFamily,
    fontWeight: pairing.naamWeight,
    fontStyle: pairing.naamStyle || 'normal',
    textTransform: pairing.naamTransform || 'none',
    letterSpacing: pairing.naamTracking || 'normal',
    fontSize: ptcqw(naamPt),
    color: textColor,
    textAlign: alignCss,
    lineHeight: 1.18,
    display: 'block',
    textWrap: 'balance' as any,
    overflowWrap: 'break-word',
    wordBreak: 'normal',
    hyphens: 'none',
    textShadow: textShadowCss
  };

  const dataStyle: React.CSSProperties = {
    fontFamily: pairing.dataFamily,
    fontWeight: pairing.dataWeight,
    fontSize: ptcqw(dataPt),
    color: textColor,
    opacity: 0.88,
    textAlign: alignCss,
    letterSpacing: '0.03em',
    lineHeight: 1.3,
    display: 'block',
    textWrap: 'balance' as any,
    overflowWrap: 'break-word',
    wordBreak: 'normal',
    textShadow: textShadowCss
  };

  const spreukStyle: React.CSSProperties = {
    fontFamily: pairing.spreukFamily,
    fontStyle: 'italic',
    fontWeight: pairing.spreukWeight || 400,
    fontSize: ptcqw(spreukPt),
    color: textColor,
    textAlign: alignCss,
    lineHeight: 1.4,
    display: 'block',
    textWrap: 'balance' as any,
    overflowWrap: 'break-word',
    wordBreak: 'normal',
    whiteSpace: 'pre-wrap',
    textShadow: textShadowCss
  };

  const placeholderStyle: React.CSSProperties = {
    fontFamily: '"EB Garamond", serif',
    fontStyle: 'italic',
    fontSize: ptcqw(13),
    color: placeholderColor,
    textAlign: alignCss,
    display: 'block'
  };

  const spreukBoven = s.spreukPositie === 'boven';
  const spreukOnder = s.spreukPositie === 'onder';

  const sfeerZinTop =
    s.sfeerZinPositie === 'midden' ? '50%' : s.sfeerZinPositie === 'tussenin' ? '30%' : '6.8cqw';
  const sfeerZinTransform = s.sfeerZinPositie === 'midden' ? 'translateY(-50%)' : 'none';

  const dataDisplay = [formatDateDutch(s.dataGeboorte), formatDateDutch(s.dataOverlijden)]
    .filter(Boolean)
    .join(' – ');

  const showOrnaments =
    s.ornament !== 'geen' && s.indeling !== 'kader' && s.smaak !== 'vrijgezet';

  const handleAction = (
    e: React.MouseEvent,
    sheetName?: 'naam' | 'data' | 'spreuk' | 'binnen' | 'praktisch' | 'familie' | 'stijl' | 'thema'
  ) => {
    if (!interactive) return;
    if (sheetName && onOpenSheet) {
      e.stopPropagation();
      onOpenSheet(sheetName);
    } else if (onCardClick) {
      onCardClick();
    }
  };

  // Helper for rendering ornaments
  const renderOrnament = () => {
    if (!showOrnaments) return null;
    if (s.ornament === 'rand') {
      return (
        <div
          className="absolute inset-[3cqw] rounded-[1.6cqw] pointer-events-none z-20"
          style={{
            border: `1px solid ${isLichtMode ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.35)'}`
          }}
        />
      );
    }
    if (s.ornament === 'waas') {
      return (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 55%, rgba(255,255,255,.16) 100%)'
          }}
        />
      );
    }
    if (s.ornament === 'hoeken') {
      return (
        <div className="absolute inset-[3.5cqw] pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-[4cqw] h-[4cqw] border-t border-l border-[rgba(45,45,58,0.3)]" />
          <div className="absolute top-0 right-0 w-[4cqw] h-[4cqw] border-t border-r border-[rgba(45,45,58,0.3)]" />
          <div className="absolute bottom-0 left-0 w-[4cqw] h-[4cqw] border-b border-l border-[rgba(45,45,58,0.3)]" />
          <div className="absolute bottom-0 right-0 w-[4cqw] h-[4cqw] border-b border-r border-[rgba(45,45,58,0.3)]" />
        </div>
      );
    }
    return null;
  };

  // 1. FRONT SIDE RENDERING
  const renderFront = () => (
    <div
      onClick={(e) => handleAction(e)}
      className="relative w-full aspect-[397/559] rounded-[1rem] overflow-hidden bg-[#f0f1f4] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] select-none"
      style={{ containerType: 'inline-size' }}
    >
      {/* INDELING: VOLLEDIG */}
      {s.indeling === 'volledig' && (
        <>
          {isVolledigeFoto ? (
            <>
              {s.showDemoPhoto ? (
                <img
                  src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                  alt="Portret"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 20%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2.4cqw] p-[8cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[16cqw] h-[16cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[3.1cqw] text-[#6b6b7a] leading-tight max-w-[75cqw]">
                    Portret volgt binnen 24 uur.
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: thema ? themeGradient : undefined
                }}
              >
                {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
              </div>
              {s.showDemoPhoto && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                    alt="Vrijgezet portret"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: '50% 20%',
                      WebkitMaskImage:
                        'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                      maskImage:
                        'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                      WebkitMaskComposite: 'destination-in',
                      maskComposite: 'intersect'
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* Top Edge Readability Scrim (if text is at top) */}
          <div
            className="absolute left-0 right-0 top-0 h-[16cqh] pointer-events-none z-10 opacity-60"
            style={{
              backgroundImage: scrimCss,
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)'
            }}
          />

          {/* Bottom Edge Readability Scrim (if text is at bottom) */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[18cqh] pointer-events-none z-10 opacity-70"
            style={{
              backgroundImage: scrimCss,
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
              maskImage: 'linear-gradient(to top, #000 0%, transparent 100%)'
            }}
          />

          {/* --- TOP ZONE --- */}
          {spreukBoven ? (
            /* Spreuk at the TOP */
            <div
              className="absolute left-0 right-0 top-[6.8cqw] px-[6cqw] flex z-20 box-border"
              style={{ justifyContent: alignItemsCss }}
            >
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.8cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                style={{
                  boxShadow: activeRing('spreuk'),
                  ...editHint(!!s.spreuk)
                }}
              >
                {!s.spreuk ? (
                  <span style={placeholderStyle}>Tik om een spreuk toe te voegen</span>
                ) : (
                  <span style={spreukStyle}>{s.spreuk}</span>
                )}
              </div>
            </div>
          ) : (
            /* Naam + Data at the TOP */
            <div
              className="absolute left-0 right-0 top-[6.8cqw] px-[6cqw] flex flex-col z-20 box-border"
              style={{ alignItems: alignItemsCss }}
            >
              <div
                onClick={(e) => handleAction(e, 'naam')}
                className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                style={{
                  boxShadow: activeRing('naam'),
                  ...editHint(!!s.naam)
                }}
              >
                {!s.naam ? (
                  <span style={placeholderStyle}>Tik om de naam toe te voegen</span>
                ) : (
                  <span style={naamStyle}>{s.naam}</span>
                )}
              </div>

              <div
                onClick={(e) => handleAction(e, 'data')}
                className="p-[0.6cqw_1.2cqw] rounded-[1cqw] mt-[0.15cqh] cursor-pointer"
                style={{
                  boxShadow: activeRing('data'),
                  ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                }}
              >
                {!dataDisplay ? (
                  <span style={placeholderStyle}>Tik om de data toe te voegen</span>
                ) : (
                  <span style={dataStyle}>{dataDisplay}</span>
                )}
              </div>
            </div>
          )}

          {/* --- BOTTOM ZONE --- */}
          <div
            className="absolute left-0 right-0 bottom-0 p-[7cqw_6cqw] flex flex-col z-20"
            style={{ alignItems: alignItemsCss }}
          >
            {spreukOnder ? (
              /* Spreuk at the BOTTOM */
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.8cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                style={{
                  boxShadow: activeRing('spreuk'),
                  ...editHint(!!s.spreuk)
                }}
              >
                {!s.spreuk ? (
                  <span style={placeholderStyle}>Tik om een spreuk toe te voegen</span>
                ) : (
                  <span style={spreukStyle}>{s.spreuk}</span>
                )}
              </div>
            ) : (
              /* Naam + Data at the BOTTOM */
              <>
                <div
                  onClick={(e) => handleAction(e, 'naam')}
                  className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('naam'),
                    ...editHint(!!s.naam)
                  }}
                >
                  {!s.naam ? (
                    <span style={placeholderStyle}>Tik om de naam toe te voegen</span>
                  ) : (
                    <span style={naamStyle}>{s.naam}</span>
                  )}
                </div>

                <div
                  onClick={(e) => handleAction(e, 'data')}
                  className="p-[0.6cqw_1.2cqw] rounded-[1cqw] mt-[0.15cqh] cursor-pointer"
                  style={{
                    boxShadow: activeRing('data'),
                    ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                  }}
                >
                  {!dataDisplay ? (
                    <span style={placeholderStyle}>Tik om de data toe te voegen</span>
                  ) : (
                    <span style={dataStyle}>{dataDisplay}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* INDELING: KADER */}
      {s.indeling === 'kader' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: thema ? themeGradient : (isLichtMode ? '#fafafc' : '#1e1e24')
            }}
          />
          {/* Readability scrim over theme background */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: isLichtMode
                ? 'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.55) 100%)'
                : 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.6) 100%)'
            }}
          />

          {/* Top text above frame */}
          <div
            className="absolute left-0 right-0 top-[8cqw] px-[7cqw] flex flex-col z-20 box-border"
            style={{ alignItems: alignItemsCss }}
          >
            {spreukBoven ? (
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer max-w-[86cqw]"
                style={{
                  boxShadow: activeRing('spreuk'),
                  ...editHint(!!s.spreuk)
                }}
              >
                {!s.spreuk ? (
                  <span style={placeholderStyle}>Tik om een spreuk toe te voegen</span>
                ) : (
                  <span style={spreukStyle}>{s.spreuk}</span>
                )}
              </div>
            ) : (
              <>
                <div
                  onClick={(e) => handleAction(e, 'naam')}
                  className="p-[0.4cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('naam'),
                    ...editHint(!!s.naam)
                  }}
                >
                  {!s.naam ? (
                    <span style={placeholderStyle}>Tik om de naam toe te voegen</span>
                  ) : (
                    <span style={naamStyle}>{s.naam}</span>
                  )}
                </div>
                <div
                  onClick={(e) => handleAction(e, 'data')}
                  className="p-[0.3cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('data'),
                    ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                  }}
                >
                  {!dataDisplay ? (
                    <span style={placeholderStyle}>Tik om data toe te voegen</span>
                  ) : (
                    <span style={dataStyle}>{dataDisplay}</span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Centered Photo Frame Box */}
          <div
            className="absolute left-[21cqw] right-[21cqw] top-[26cqw] aspect-[4/5] rounded-[1.6cqw] overflow-hidden z-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(45,45,58,0.08)]"
            style={{ background: isVrijgezet ? 'transparent' : '#e9eaef' }}
          >
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 20%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2.4cqw] p-[8cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[14cqw] h-[14cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[3cqw] text-[#6b6b7a]">Portret volgt binnen 24 uur.</span>
                </div>
              )
            ) : (
              <>
                {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
                {s.showDemoPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 20%',
                        WebkitMaskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom text below frame */}
          <div
            className="absolute left-0 right-0 bottom-[8cqw] px-[7cqw] flex flex-col items-center justify-center z-20"
            style={{ alignItems: alignItemsCss }}
          >
            {spreukOnder ? (
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer max-w-[86cqw]"
                style={{
                  boxShadow: activeRing('spreuk'),
                  ...editHint(!!s.spreuk)
                }}
              >
                {!s.spreuk ? (
                  <span style={placeholderStyle}>Tik om een spreuk toe te voegen</span>
                ) : (
                  <span style={spreukStyle}>{s.spreuk}</span>
                )}
              </div>
            ) : (
              <>
                <div
                  onClick={(e) => handleAction(e, 'naam')}
                  className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('naam'),
                    ...editHint(!!s.naam)
                  }}
                >
                  {!s.naam ? (
                    <span style={placeholderStyle}>Tik om de naam toe te voegen</span>
                  ) : (
                    <span style={naamStyle}>{s.naam}</span>
                  )}
                </div>

                <div
                  onClick={(e) => handleAction(e, 'data')}
                  className="p-[0.4cqw_1.2cqw] rounded-[1cqw] mt-[0.4cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('data'),
                    ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                  }}
                >
                  {!dataDisplay ? (
                    <span style={placeholderStyle}>Tik om de data toe te voegen</span>
                  ) : (
                    <span style={dataStyle}>{dataDisplay}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* INDELING: NAAST-TEKST */}
      {s.indeling === 'naast-tekst' && (
        <div
          className="absolute inset-0 flex z-10"
          style={{ background: thema ? themeGradient : (isLichtMode ? '#fafafc' : '#1e1e24') }}
        >
          {/* Left Column (Photo) */}
          <div className="relative w-[44%] h-full overflow-hidden" style={{ background: isVolledigeFoto ? '#e9eaef' : 'transparent' }}>
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 22%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2.4cqw] p-[8cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[16cqw] h-[16cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[3.1cqw] text-[#6b6b7a]">Portret volgt.</span>
                </div>
              )
            ) : (
              <>
                {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
                {s.showDemoPhoto && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 20%',
                        WebkitMaskImage:
                          'radial-gradient(ellipse 90% 85% at 50% 48%, #000 70%, rgba(0,0,0,0.85) 82%, rgba(0,0,0,0.4) 92%, transparent 100%), linear-gradient(to right, #000 80%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse 90% 85% at 50% 48%, #000 70%, rgba(0,0,0,0.85) 82%, rgba(0,0,0,0.4) 92%, transparent 100%), linear-gradient(to right, #000 80%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column (Text) */}
          <div
            className="relative w-[56%] h-full flex flex-col justify-between py-[12cqw] px-[5cqw] box-border"
            style={{
              alignItems: alignItemsCss
            }}
          >
            {/* Scrim for text readability over continuous theme */}
            {thema && (
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: isLichtMode
                    ? 'rgba(255,255,255,0.4)'
                    : 'rgba(0,0,0,0.35)'
                }}
              />
            )}
            {spreukBoven ? (
              /* Spreuk Top, Name+Data Bottom */
              <>
                <div
                  onClick={(e) => handleAction(e, 'spreuk')}
                  className="p-[0.6cqw_1cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('spreuk'),
                    ...editHint(!!s.spreuk)
                  }}
                >
                  {!s.spreuk ? (
                    <span style={placeholderStyle}>Tik om spreuk toe te voegen</span>
                  ) : (
                    <span style={spreukStyle}>{s.spreuk}</span>
                  )}
                </div>

                <div className="flex flex-col" style={{ alignItems: alignItemsCss }}>
                  <div
                    onClick={(e) => handleAction(e, 'naam')}
                    className="p-[0.5cqw_1cqw] rounded-[1cqw] cursor-pointer"
                    style={{
                      boxShadow: activeRing('naam'),
                      ...editHint(!!s.naam)
                    }}
                  >
                    {!s.naam ? (
                      <span style={placeholderStyle}>Tik om naam toe te voegen</span>
                    ) : (
                      <span style={naamStyle}>{s.naam}</span>
                    )}
                  </div>
                  <div
                    onClick={(e) => handleAction(e, 'data')}
                    className="p-[0.4cqw_1cqw] rounded-[1cqw] mt-[0.5cqw] cursor-pointer"
                    style={{
                      boxShadow: activeRing('data'),
                      ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                    }}
                  >
                    {!dataDisplay ? (
                      <span style={placeholderStyle}>Tik om data toe te voegen</span>
                    ) : (
                      <span style={dataStyle}>{dataDisplay}</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Name+Data Top, Spreuk Bottom */
              <>
                <div className="flex flex-col" style={{ alignItems: alignItemsCss }}>
                  <div
                    onClick={(e) => handleAction(e, 'naam')}
                    className="p-[0.5cqw_1cqw] rounded-[1cqw] cursor-pointer"
                    style={{
                      boxShadow: activeRing('naam'),
                      ...editHint(!!s.naam)
                    }}
                  >
                    {!s.naam ? (
                      <span style={placeholderStyle}>Tik om naam toe te voegen</span>
                    ) : (
                      <span style={naamStyle}>{s.naam}</span>
                    )}
                  </div>
                  <div
                    onClick={(e) => handleAction(e, 'data')}
                    className="p-[0.4cqw_1cqw] rounded-[1cqw] mt-[0.5cqw] cursor-pointer"
                    style={{
                      boxShadow: activeRing('data'),
                      ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
                    }}
                  >
                    {!dataDisplay ? (
                      <span style={placeholderStyle}>Tik om data toe te voegen</span>
                    ) : (
                      <span style={dataStyle}>{dataDisplay}</span>
                    )}
                  </div>
                </div>

                <div
                  onClick={(e) => handleAction(e, 'spreuk')}
                  className="p-[0.6cqw_1cqw] rounded-[1cqw] cursor-pointer"
                  style={{
                    boxShadow: activeRing('spreuk'),
                    ...editHint(!!s.spreuk)
                  }}
                >
                  {!s.spreuk ? (
                    <span style={placeholderStyle}>Tik om spreuk toe te voegen</span>
                  ) : (
                    <span style={spreukStyle}>{s.spreuk}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* INDELING: SFEER-VOOROP (alleen bij gevouwen) */}
      {s.indeling === 'sfeer-voorop' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: thema ? themeGradient : 'linear-gradient(160deg,#cfd2d8,#eceef0)'
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[18cqh] pointer-events-none z-10"
            style={{
              backgroundImage: scrimCss,
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, #000 75%, transparent 100%)',
              maskImage: 'linear-gradient(to top, #000 0%, #000 75%, transparent 100%)'
            }}
          />
          {s.sfeerZinPositie === 'boven' && (
            <div
              className="absolute left-0 right-0 top-0 h-[14cqh] pointer-events-none z-10"
              style={{
                backgroundImage: topScrimCss,
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)'
              }}
            />
          )}

          <div
            className="absolute left-0 right-0 px-[6cqw] flex z-20 box-border"
            style={{
              top: sfeerZinTop,
              transform: sfeerZinTransform,
              justifyContent: alignItemsCss
            }}
          >
            <div
              onClick={(e) => handleAction(e, 'spreuk')}
              className="p-[0.8cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
              style={{
                boxShadow: activeRing('spreuk'),
                ...editHint(!!s.spreuk)
              }}
            >
              {!s.spreuk ? (
                <span style={placeholderStyle}>Tik om een spreuk toe te voegen</span>
              ) : (
                <span style={spreukStyle}>{s.spreuk}</span>
              )}
            </div>
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 p-[7cqw_6cqw] flex flex-col z-20"
            style={{ alignItems: alignItemsCss }}
          >
            <div
              onClick={(e) => handleAction(e, 'naam')}
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
              style={{
                boxShadow: activeRing('naam'),
                ...editHint(!!s.naam)
              }}
            >
              {!s.naam ? (
                <span style={placeholderStyle}>Tik om de naam toe te voegen</span>
              ) : (
                <span style={naamStyle}>{s.naam}</span>
              )}
            </div>
            <div
              onClick={(e) => handleAction(e, 'data')}
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] mt-[0.15cqh] cursor-pointer"
              style={{
                boxShadow: activeRing('data'),
                ...editHint(!!(s.dataGeboorte || s.dataOverlijden))
              }}
            >
              {!dataDisplay ? (
                <span style={placeholderStyle}>Tik om de data toe te voegen</span>
              ) : (
                <span style={dataStyle}>{dataDisplay}</span>
              )}
            </div>
          </div>
        </>
      )}

      {/* Ornaments */}
      {renderOrnament()}
    </div>
  );

  // 2. INSIDE SPREAD / SINGLE PAGE RENDERING
  const renderInsideSinglePage = (zoomSide: 'links' | 'rechts') => (
    <div
      onClick={(e) => handleAction(e)}
      className="relative w-full aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] select-none"
      style={{
        background: matBgColor,
        containerType: 'inline-size'
      }}
    >
      {/* 50% Zoomed Theme + Frosted Glass & Matte Paper Layer */}
      {thema && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute inset-[-25%] w-[150%] h-[150%]"
            style={{
              background: themeGradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isLichtMode
                ? 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.88) 100%)'
                : 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(20,18,24,0.72) 0%, rgba(20,18,24,0.86) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          />
        </div>
      )}

      {zoomSide === 'links' ? (
        s.indeling === 'sfeer-voorop' ? (
          /* SFEER-VOOROP: 100% Full-page portrait photo (volledig pagina) */
          <div className="absolute inset-0 z-10 overflow-hidden">
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                  alt="Portret"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 20%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2.4cqw] p-[8cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[16cqw] h-[16cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[3.1cqw] text-[#6b6b7a]">Portret volgt binnen 24 uur.</span>
                </div>
              )
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{ background: thema ? themeGradient : undefined }}
                >
                  {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
                </div>
                {s.showDemoPhoto && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                      alt="Vrijgezet portret"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 20%',
                        WebkitMaskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Bottom Scrim & Caption Overlay if text is present */}
            {s.binnenTekst && (
              <div
                className="absolute left-0 right-0 bottom-0 p-[7cqw_6cqw] pt-[14cqw] flex flex-col items-center justify-end z-20"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)'
                }}
              >
                <div
                  onClick={(e) => handleAction(e, 'binnen')}
                  className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer text-center max-w-[88cqw]"
                  style={{
                    boxShadow: activeRing('binnen'),
                    ...editHint(true)
                  }}
                >
                  <span
                    style={{
                      fontFamily: pairing.spreukFamily,
                      fontStyle: 'italic',
                      fontSize: ptcqw(10.5),
                      color: '#ffffff',
                      lineHeight: 1.45,
                      display: 'block',
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                    }}
                  >
                    {s.binnenTekst}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Normal text inside left: Poetic & dignified layout */
          <div className="absolute inset-0 flex flex-col justify-between p-[10cqw_9cqw] box-border z-10">
            {/* Top decorative anchor */}
            <div className="flex justify-center pt-[1cqh]">
              <div className="w-[12cqw] h-[1px] bg-current opacity-20" />
            </div>

            {/* Core poem/thought */}
            <div
              onClick={(e) => handleAction(e, 'binnen')}
              className="p-[0.8cqw_1.2cqw] rounded-[1cqw] cursor-pointer my-auto text-center"
              style={{
                boxShadow: activeRing('binnen'),
                ...editHint(!!s.binnenTekst)
              }}
            >
              {!s.binnenTekst ? (
                <span style={placeholderStyle}>Tik om een gedicht of persoonlijke herinnering toe te voegen</span>
              ) : (
                <span
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: ptcqw(binnenPt),
                    color: textColor,
                    textAlign: alignCss,
                    lineHeight: 1.65,
                    display: 'block',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    textShadow: textShadowCss
                  }}
                >
                  {s.binnenTekst}
                </span>
              )}
            </div>

            {/* Bottom closing line */}
            <div
              onClick={(e) => handleAction(e, 'binnen')}
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] pb-[1cqh] cursor-pointer text-center"
              style={{
                boxShadow: activeRing('binnen'),
                ...editHint(!!s.afsluitingTekst)
              }}
            >
              {s.afsluitingTekst ? (
                <span
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontWeight: 400,
                    fontSize: ptcqw(11.5),
                    color: textColor,
                    opacity: 0.85,
                    textAlign: alignCss,
                    lineHeight: 1.5,
                    display: 'block',
                    whiteSpace: 'pre-wrap',
                    textShadow: textShadowCss
                  }}
                >
                  {s.afsluitingTekst}
                </span>
              ) : (
                <span style={{ ...placeholderStyle, fontSize: ptcqw(10) }}>Tik voor afsluiting</span>
              )}
            </div>
          </div>
        )
      ) : (
        /* Right page: Ceremonial Announcement Narrative */
        <div className="absolute inset-0 flex flex-col justify-between p-[9cqw_8cqw] box-border z-10">
          {/* Header */}
          <div className="text-center pt-[1cqh]">
            <span
              className="block font-bold uppercase tracking-[0.14em] opacity-60 text-[0.8em]"
              style={{
                fontFamily: pairing.dataFamily,
                fontSize: ptcqw(8.5),
                color: textColor,
                textShadow: textShadowCss
              }}
            >
              De Afscheidsplechtigheid
            </span>
          </div>

          {/* Ceremony Core Details (Date/Time + Location) */}
          <div className="flex flex-col gap-[1.8cqh] my-auto text-center">
            {/* Datum & Tijd (Primary Focus) */}
            <div
              onClick={(e) => handleAction(e, 'praktisch')}
              className="p-[0.6cqw_1cqw] rounded-[1cqw] cursor-pointer"
              style={{
                boxShadow: activeRing('praktisch'),
                ...editHint(!!s.datumTijdTekst)
              }}
            >
              {s.datumTijdTekst ? (
                <span
                  className="block font-semibold leading-snug tracking-tight"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(13.5),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.datumTijdTekst}
                </span>
              ) : (
                <span style={placeholderStyle}>Tik om datum &amp; tijd toe te voegen</span>
              )}
            </div>

            {/* Locatie & Adres */}
            <div
              onClick={(e) => handleAction(e, 'praktisch')}
              className="p-[0.6cqw_1cqw] rounded-[1cqw] cursor-pointer"
              style={{
                boxShadow: activeRing('praktisch'),
                ...editHint(!!s.locatieTekst)
              }}
            >
              {s.locatieTekst ? (
                <span
                  className="block leading-relaxed opacity-90"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(11.5),
                    color: textColor,
                    whiteSpace: 'pre-wrap',
                    textShadow: textShadowCss
                  }}
                >
                  {s.locatieTekst}
                </span>
              ) : (
                <span style={placeholderStyle}>Tik om locatie toe te voegen</span>
              )}
            </div>

            {/* Hairline Divider */}
            {(s.samenzijnTekst || s.inzamelingTekst) && (
              <div className="flex justify-center my-[0.5cqh]">
                <div className="w-[16cqw] h-[1px] bg-current opacity-20" />
              </div>
            )}

            {/* Samenzijn */}
            {s.samenzijnTekst && (
              <div
                onClick={(e) => handleAction(e, 'praktisch')}
                className="p-[0.4cqw_1cqw] rounded-[1cqw] cursor-pointer"
                style={{
                  boxShadow: activeRing('praktisch'),
                  ...editHint(!!s.samenzijnTekst)
                }}
              >
                <span
                  className="block leading-relaxed opacity-85 italic"
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontSize: ptcqw(11),
                    color: textColor,
                    whiteSpace: 'pre-wrap',
                    textShadow: textShadowCss
                  }}
                >
                  {s.samenzijnTekst}
                </span>
              </div>
            )}

            {/* Inzameling / Goed Doel */}
            {s.inzamelingTekst && (
              <div
                onClick={(e) => handleAction(e, 'praktisch')}
                className="p-[0.4cqw_1cqw] rounded-[1cqw] cursor-pointer"
                style={{
                  boxShadow: activeRing('praktisch'),
                  ...editHint(!!s.inzamelingTekst)
                }}
              >
                <span
                  className="block leading-normal opacity-75 text-[0.9em]"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(9.5),
                    color: textColor,
                    whiteSpace: 'pre-wrap',
                    textShadow: textShadowCss
                  }}
                >
                  {s.inzamelingTekst}
                </span>
              </div>
            )}
          </div>

          {/* Bottom subtle grounding line */}
          <div className="flex justify-center pb-[1cqh]">
            <div className="w-[8cqw] h-[1px] bg-current opacity-15" />
          </div>
        </div>
      )}
    </div>
  );

  const renderInsideSpread = () => (
    <div className="flex justify-center gap-[4%] w-full">
      {/* Left Spread Page */}
      <div
        onClick={() => (onZoomBinnen ? onZoomBinnen('links') : null)}
        className="relative w-[48%] aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] cursor-pointer select-none"
        style={{
          background: matBgColor,
          containerType: 'inline-size'
        }}
      >
        {/* 50% Zoomed Theme + Frosted Glass Layer */}
        {thema && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
              className="absolute inset-[-25%] w-[150%] h-[150%]"
              style={{
                background: themeGradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2px)'
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: isLichtMode
                  ? 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.88) 100%)'
                  : 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(20,18,24,0.72) 0%, rgba(20,18,24,0.86) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            />
          </div>
        )}

        {s.indeling === 'sfeer-voorop' ? (
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                  alt="Portret"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 20%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2cqw] p-[4cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[12cqw] h-[12cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[2.8cqw] text-[#6b6b7a]">Portret volgt.</span>
                </div>
              )
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{ background: thema ? themeGradient : undefined }}
                >
                  {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
                </div>
                {s.showDemoPhoto && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                      alt="Vrijgezet portret"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 20%',
                        WebkitMaskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse 82% 80% at 50% 46%, #000 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.35) 92%, transparent 100%), linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {s.binnenTekst && (
              <div
                className="absolute left-0 right-0 bottom-0 p-[5cqw_4cqw] pt-[10cqw] flex flex-col items-center justify-end z-20"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)'
                }}
              >
                <span
                  className="block text-center line-clamp-2"
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontStyle: 'italic',
                    fontSize: ptcqw(9.5),
                    color: '#ffffff',
                    lineHeight: 1.35,
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                  }}
                >
                  {s.binnenTekst}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-[8cqw_7cqw] box-border pointer-events-none z-10">
            <div className="flex justify-center pt-[0.5cqh]">
              <div className="w-[10cqw] h-[1px] bg-current opacity-20" />
            </div>

            <div className="my-auto text-center">
              {!s.binnenTekst ? (
                <span style={placeholderStyle}>Tik om tekst toe te voegen</span>
              ) : (
                <span
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: ptcqw(binnenPt),
                    color: textColor,
                    textAlign: alignCss,
                    lineHeight: 1.6,
                    display: 'block',
                    whiteSpace: 'pre-wrap',
                    textShadow: textShadowCss
                  }}
                >
                  {s.binnenTekst}
                </span>
              )}
            </div>

            <div className="text-center pb-[0.5cqh]">
              {s.afsluitingTekst && (
                <span
                  className="block opacity-85"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(10.5),
                    color: textColor,
                    textAlign: alignCss,
                    textShadow: textShadowCss
                  }}
                >
                  {s.afsluitingTekst}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Spread Page */}
      <div
        onClick={() => (onZoomBinnen ? onZoomBinnen('rechts') : null)}
        className="relative w-[48%] aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] cursor-pointer select-none"
        style={{
          background: matBgColor,
          containerType: 'inline-size'
        }}
      >
        {/* 50% Zoomed Theme + Frosted Glass Layer */}
        {thema && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
              className="absolute inset-[-25%] w-[150%] h-[150%]"
              style={{
                background: themeGradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2px)'
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: isLichtMode
                  ? 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.88) 100%)'
                  : 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(20,18,24,0.72) 0%, rgba(20,18,24,0.86) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-between p-[8cqw_7cqw] box-border pointer-events-none z-10 text-center">
          <div className="pt-[0.5cqh]">
            <span
              className="block font-bold uppercase tracking-[0.14em] opacity-60 text-[0.8em]"
              style={{ fontFamily: pairing.dataFamily, fontSize: ptcqw(7.5), color: textColor }}
            >
              De Plechtigheid
            </span>
          </div>

          <div className="flex flex-col gap-[1.2cqh] my-auto">
            {s.datumTijdTekst && (
              <span
                className="block font-semibold line-clamp-2"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontSize: ptcqw(12),
                  color: textColor,
                  textShadow: textShadowCss
                }}
              >
                {s.datumTijdTekst}
              </span>
            )}

            {s.locatieTekst && (
              <span
                className="block opacity-90 line-clamp-2"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontSize: ptcqw(10.5),
                  color: textColor,
                  textShadow: textShadowCss
                }}
              >
                {s.locatieTekst}
              </span>
            )}

            {s.samenzijnTekst && (
              <span
                className="block opacity-80 italic line-clamp-2 pt-[0.4cqh]"
                style={{
                  fontFamily: pairing.spreukFamily,
                  fontSize: ptcqw(10),
                  color: textColor,
                  textShadow: textShadowCss
                }}
              >
                {s.samenzijnTekst}
              </span>
            )}
          </div>

          <div className="flex justify-center pb-[0.5cqh]">
            <div className="w-[8cqw] h-[1px] bg-current opacity-15" />
          </div>
        </div>
      </div>
    </div>
  );

  // 3. BACK SIDE RENDERING
  // 3. BACK SIDE RENDERING (De Nabestaanden / Familie)
  const renderBack = () => {
    const parentList = s.familieNamen.filter((n) => !n.parentId);
    const totalLines =
      s.familieNamen.length +
      (s.kopregel ? 1 : 0) +
      (s.samenvattendeRegel ? 1 : 0) +
      (s.bredereKring ? 1 : 0) +
      (s.deFamilies ? 1 : 0);

    // Adaptive scale based on number of names and sections
    const isDense = totalLines >= 10;
    const isMedium = totalLines >= 5 && totalLines < 10;

    const kopregelPt = isDense ? 10.5 : isMedium ? 12 : 13.5;
    const parentPt = isDense ? 10.5 : isMedium ? 12 : 14;
    const childPt = isDense ? 9.5 : isMedium ? 11 : 12.5;
    const rolePt = isDense ? 8.5 : isMedium ? 9.5 : 10.5;
    const closingPt = isDense ? 10 : isMedium ? 11.5 : 13;
    const familyPt = isDense ? 8.5 : isMedium ? 9.5 : 10.5;

    const groupGap = isDense ? 'gap-[0.5cqh]' : isMedium ? 'gap-[0.8cqh]' : 'gap-[1.2cqh]';
    const childGap = isDense ? 'gap-[0.2cqh]' : 'gap-[0.35cqh]';

    return (
      <div
        onClick={(e) => handleAction(e, 'familie')}
        className="relative w-full aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] select-none"
        style={{
          background: matBgColor,
          containerType: 'inline-size'
        }}
      >
        {/* Theme Background with Soft Matte Diffusion Layer */}
        {thema && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
              className="absolute inset-0"
              style={{
                background: themeGradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: isLichtMode
                  ? 'radial-gradient(ellipse 92% 90% at 50% 50%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.90) 100%)'
                  : 'radial-gradient(ellipse 92% 90% at 50% 50%, rgba(18,16,22,0.75) 0%, rgba(18,16,22,0.88) 100%)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            />
          </div>
        )}

        {!s.geenNamenOpKaart && (
          <div className="absolute inset-0 flex flex-col justify-between p-[9cqw_8cqw] box-border z-10">
            {/* TOP: Kopregel */}
            <div
              onClick={(e) => handleAction(e, 'familie')}
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer text-center"
              style={{
                boxShadow: activeRing('familie'),
                ...editHint(!!s.kopregel)
              }}
            >
              {s.kopregel ? (
                <span
                  className="block font-medium italic leading-relaxed tracking-wide opacity-90"
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontSize: ptcqw(kopregelPt),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.kopregel}
                </span>
              ) : (
                <span style={placeholderStyle}>Tik om een kopregel toe te voegen</span>
              )}
            </div>

            {/* MIDDLE: Family List (Structured Centered Block with Inward Alignment) */}
            <div
              className="flex-1 flex flex-col justify-center my-[1.5cqh] max-h-[62cqh] overflow-hidden"
            >
              <div
                className={`flex flex-col ${groupGap} w-full max-w-[88cqw] mx-auto`}
                style={{ textAlign: alignCss }}
              >
                {parentList.map((top) => {
                  const children = s.familieNamen.filter((c) => c.parentId === top.id);
                  return (
                    <div key={top.id} className="flex flex-col">
                      {/* Parent / Main line */}
                      <div
                        className="leading-snug flex flex-wrap items-baseline gap-x-[0.35em]"
                        style={{
                          justifyContent: alignItemsCss,
                          fontFamily: pairing.dataFamily,
                          fontSize: ptcqw(parentPt),
                          color: textColor,
                          textShadow: textShadowCss
                        }}
                      >
                        {top.overleden && (
                          <span className="font-serif text-[0.85em] opacity-80 select-none">†</span>
                        )}
                        <span className="font-semibold tracking-tight">
                          {top.naam || 'Voor- en achternaam'}
                        </span>
                        {top.relatie && (
                          <span
                            className="opacity-70 font-normal italic text-[0.85em]"
                            style={{ fontFamily: pairing.spreukFamily, fontSize: ptcqw(rolePt) }}
                          >
                            {top.relatie}
                          </span>
                        )}
                      </div>

                      {/* Indented Children */}
                      {children.length > 0 && (
                        <div className={`flex flex-col ${childGap} mt-[0.3cqh] ${alignCss === 'left' ? 'pl-[4cqw]' : alignCss === 'right' ? 'pr-[4cqw]' : ''}`}>
                          {children.map((child) => (
                            <div
                              key={child.id}
                              className="leading-snug flex flex-wrap items-baseline gap-x-[0.3em] opacity-90"
                              style={{
                                justifyContent: alignItemsCss,
                                fontFamily: pairing.dataFamily,
                                fontSize: ptcqw(childPt),
                                color: textColor,
                                textShadow: textShadowCss
                              }}
                            >
                              {child.overleden && (
                                <span className="font-serif text-[0.85em] opacity-80 select-none">†</span>
                              )}
                              <span className="font-normal">
                                {child.naam || 'Voor- en achternaam'}
                              </span>
                              {child.relatie && (
                                <span
                                  className="opacity-65 font-normal italic text-[0.85em]"
                                  style={{ fontFamily: pairing.spreukFamily, fontSize: ptcqw(rolePt) }}
                                >
                                  {child.relatie}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM: Closing phrases (Samenvattend, Kring, Families) */}
            <div className="flex flex-col gap-[0.3cqh] text-center pt-[0.5cqh]">
              {s.samenvattendeRegel && (
                <span
                  className="block italic font-medium leading-relaxed opacity-95"
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontSize: ptcqw(closingPt),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.samenvattendeRegel}
                </span>
              )}

              {s.bredereKring && (
                <span
                  className="block opacity-75 leading-normal"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(familyPt),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.bredereKring}
                </span>
              )}

              {s.deFamilies && (
                <span
                  className="block opacity-75 leading-normal"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(familyPt),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.deFamilies}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Ornaments */}
        {renderOrnament()}
      </div>
    );
  };

  // Switch between side modes
  if (s.side === 'binnen' && !isEnkel) {
    if (s.binnenZoom) {
      return (
        <div className={`w-full max-w-[420px] mx-auto ${className}`}>
          {renderInsideSinglePage(s.binnenZoom)}
        </div>
      );
    }
    return <div className={`w-full ${className}`}>{renderInsideSpread()}</div>;
  }

  if (s.side === 'achter') {
    return (
      <div className={`w-full max-w-[420px] mx-auto ${className}`}>{renderBack()}</div>
    );
  }

  return (
    <div className={`w-full max-w-[420px] mx-auto ${className}`}>{renderFront()}</div>
  );
};
