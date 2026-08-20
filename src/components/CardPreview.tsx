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
      ? isVolledigeFoto || isVrijgezet
        ? 'donker'
        : 'licht'
      : s.uitstraling;
  const isLichtMode = effectiveMode === 'licht';
  const textColor = isLichtMode ? '#1a1a1e' : '#fcfcfd';
  const placeholderColor = isLichtMode ? 'rgba(26,26,30,.42)' : 'rgba(252,252,253,.55)';
  const textShadowCss = isLichtMode ? '0 0 6px rgba(252,252,253,.4)' : '0 0 6px rgba(20,17,22,.55)';

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
  const naamPt = sizePt.naam[s.sizes.naam] * (pairing.naamMult || 1);
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
    lineHeight: 1.15,
    display: 'block',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    textShadow: textShadowCss
  };

  const dataStyle: React.CSSProperties = {
    fontFamily: pairing.dataFamily,
    fontWeight: pairing.dataWeight,
    fontSize: ptcqw(dataPt),
    color: textColor,
    textAlign: alignCss,
    letterSpacing: '0.02em',
    display: 'block',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    textShadow: textShadowCss
  };

  const spreukStyle: React.CSSProperties = {
    fontFamily: pairing.spreukFamily,
    fontStyle: 'italic',
    fontSize: ptcqw(spreukPt),
    color: textColor,
    textAlign: alignCss,
    lineHeight: 1.35,
    display: 'block',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
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

  const forceSpreukBoven =
    s.smaak === 'vrijgezet' && (s.indeling === 'volledig' || s.indeling === 'kader');
  const spreukBoven = forceSpreukBoven || s.spreukPositie === 'boven';
  const spreukOnder = !forceSpreukBoven && s.spreukPositie === 'onder';

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
      const cornerBorder = isLichtMode ? 'rgba(0,0,0,.25)' : 'rgba(255,255,255,.6)';
      return (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div
            className="absolute top-[4cqw] left-[4cqw] w-[9cqw] h-[9cqw]"
            style={{ borderTop: `1px solid ${cornerBorder}`, borderLeft: `1px solid ${cornerBorder}` }}
          />
          <div
            className="absolute top-[4cqw] right-[4cqw] w-[9cqw] h-[9cqw]"
            style={{ borderTop: `1px solid ${cornerBorder}`, borderRight: `1px solid ${cornerBorder}` }}
          />
          <div
            className="absolute bottom-[4cqw] left-[4cqw] w-[9cqw] h-[9cqw]"
            style={{ borderBottom: `1px solid ${cornerBorder}`, borderLeft: `1px solid ${cornerBorder}` }}
          />
          <div
            className="absolute bottom-[4cqw] right-[4cqw] w-[9cqw] h-[9cqw]"
            style={{ borderBottom: `1px solid ${cornerBorder}`, borderRight: `1px solid ${cornerBorder}` }}
          />
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
              <div className="absolute inset-0" style={{ background: matBgColor }} />
              <div className="absolute left-[5cqw] right-[5cqw] top-[6cqw] bottom-[6cqw] rounded-[1.5cqw] overflow-hidden">
                {s.showDemoPhoto ? (
                  <img
                    src="/assets/nana-volledig.jpg"
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
              </div>
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
                    src="/assets/nana-cutout.png"
                    alt="Vrijgezet portret"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: '50% 20%',
                      WebkitMaskImage:
                        'radial-gradient(ellipse 62% 58% at 50% 55%, #000 87%, transparent 100%)',
                      maskImage:
                        'radial-gradient(ellipse 62% 58% at 50% 55%, #000 87%, transparent 100%)'
                    }}
                  />
                </div>
              )}
              <div
                className="absolute left-0 right-0 bottom-0 h-[26cqh] pointer-events-none z-10"
                style={{
                  background: themeGradient,
                  WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
                  maskImage: 'linear-gradient(to top, #000 0%, transparent 100%)'
                }}
              />
            </>
          )}

          {/* Scrims */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[18cqh] pointer-events-none z-10"
            style={{
              backgroundImage: scrimCss,
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, #000 75%, transparent 100%)',
              maskImage: 'linear-gradient(to top, #000 0%, #000 75%, transparent 100%)'
            }}
          />
          {spreukBoven && (
            <div
              className="absolute left-0 right-0 top-0 h-[14cqh] pointer-events-none z-10"
              style={{
                backgroundImage: topScrimCss,
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)'
              }}
            />
          )}

          {/* Spreuk Top */}
          {spreukBoven && (
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
          )}

          {/* Cluster Overlay (bottom) */}
          <div
            className="absolute left-0 right-0 bottom-0 p-[7cqw_6cqw] flex flex-col z-20"
            style={{ alignItems: alignItemsCss }}
          >
            {spreukOnder && (
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.8cqw_1.2cqw] rounded-[1cqw] mb-[0.6cqh] cursor-pointer"
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
            )}

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

      {/* INDELING: KADER */}
      {s.indeling === 'kader' && (
        <>
          <div className="absolute inset-0" style={{ background: matBgColor }} />
          {spreukBoven && (
            <div
              className="absolute left-0 right-0 top-[5.5cqw] px-[6cqw] flex z-20 box-border"
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
          )}

          <div
            className="absolute left-[5cqw] right-[5cqw] top-[13cqw] h-[54cqh] rounded-[1.5cqw] overflow-hidden z-10"
            style={{ background: isVrijgezet ? 'transparent' : '#e9eaef' }}
          >
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src="/assets/nana-volledig.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 26%' }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2.4cqw] p-[8cqw] bg-[#f0f1f4] text-center">
                  <div className="w-[16cqw] h-[16cqw] rounded-full bg-[rgba(45,45,58,0.14)] animate-pulse" />
                  <span className="text-[3.1cqw] text-[#6b6b7a]">Portret volgt binnen 24 uur.</span>
                </div>
              )
            ) : (
              s.showDemoPhoto && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/assets/nana-cutout.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: '50% 20%' }}
                  />
                </div>
              )
            )}
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 p-[4cqw_6cqw_5cqw] flex flex-col z-20"
            style={{ alignItems: alignItemsCss }}
          >
            {spreukOnder && (
              <div
                onClick={(e) => handleAction(e, 'spreuk')}
                className="p-[0.8cqw_1.2cqw] rounded-[1cqw] mb-[0.6cqh] cursor-pointer"
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
            )}
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

      {/* INDELING: NAAST-TEKST */}
      {s.indeling === 'naast-tekst' && (
        <div className="absolute inset-0 flex z-10">
          <div className="relative w-[42%] h-full bg-[#e9eaef] overflow-hidden">
            {isVolledigeFoto ? (
              s.showDemoPhoto ? (
                <img
                  src="/assets/nana-volledig.jpg"
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
                <div
                  className="absolute inset-0"
                  style={{
                    background: thema ? themeGradient : undefined
                  }}
                >
                  {!thema && <div className="absolute inset-0 checkerboard-pattern" />}
                </div>
                {s.showDemoPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/nana-cutout.png"
                      alt=""
                      className="h-[94%] w-auto max-w-none block"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className="w-[58%] h-full flex flex-col justify-center p-[6cqw] box-border"
            style={{ background: matBgColor, alignItems: alignItemsCss }}
          >
            <div
              onClick={(e) => handleAction(e, 'spreuk')}
              className="p-[0.8cqw_1.2cqw] rounded-[1cqw] mb-[1.2cqh] cursor-pointer"
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
            <div
              onClick={(e) => handleAction(e, 'naam')}
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
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
              className="p-[0.6cqw_1.2cqw] rounded-[1cqw] mt-[0.2cqh] cursor-pointer"
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
      {zoomSide === 'links' ? (
        <div
          className="absolute inset-0 flex flex-col justify-center p-[10cqw_9cqw] box-border"
          style={{ alignItems: alignItemsCss }}
        >
          <div
            onClick={(e) => handleAction(e, 'binnen')}
            className="p-[0.8cqw_1.2cqw] rounded-[1cqw] cursor-pointer"
            style={{
              boxShadow: activeRing('binnen'),
              ...editHint(!!s.binnenTekst)
            }}
          >
            {!s.binnenTekst ? (
              <span style={placeholderStyle}>Tik om een tekst toe te voegen</span>
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
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                  textShadow: textShadowCss
                }}
              >
                {s.binnenTekst}
              </span>
            )}
          </div>
          <div
            onClick={(e) => handleAction(e, 'binnen')}
            className="p-[0.6cqw_1.2cqw] rounded-[1cqw] mt-[2.4cqh] cursor-pointer"
            style={{
              boxShadow: activeRing('binnen'),
              ...editHint(!!s.afsluitingTekst)
            }}
          >
            {!s.afsluitingTekst ? (
              <span style={placeholderStyle}>Tik om een afsluiting toe te voegen</span>
            ) : (
              <span
                style={{
                  fontFamily: pairing.dataFamily,
                  fontWeight: 400,
                  fontSize: ptcqw(11),
                  color: textColor,
                  opacity: 0.82,
                  textAlign: alignCss,
                  lineHeight: 1.5,
                  display: 'block',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                  textShadow: textShadowCss
                }}
              >
                {s.afsluitingTekst}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex flex-col justify-evenly p-[12cqw_9cqw] box-border"
          style={{ alignItems: alignItemsCss }}
        >
          <div
            onClick={(e) => handleAction(e, 'praktisch')}
            className="p-[0.4cqw_1cqw] rounded-[1cqw] max-w-[88cqw] cursor-pointer"
            style={{
              boxShadow: activeRing('praktisch'),
              ...editHint(!!s.locatieTekst)
            }}
          >
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: ptcqw(8),
                color: textColor,
                textAlign: alignCss
              }}
            >
              Locatie
            </span>
            {!s.locatieTekst ? (
              <span style={placeholderStyle}>Tik om locatie toe te voegen</span>
            ) : (
              <span
                className="block mt-[0.25cqh] leading-relaxed opacity-90"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontWeight: 400,
                  fontSize: ptcqw(11.5),
                  color: textColor,
                  textAlign: alignCss,
                  whiteSpace: 'pre-wrap',
                  textShadow: textShadowCss
                }}
              >
                {s.locatieTekst}
              </span>
            )}
          </div>

          <div
            onClick={(e) => handleAction(e, 'praktisch')}
            className="p-[0.4cqw_1cqw] rounded-[1cqw] max-w-[88cqw] cursor-pointer"
            style={{
              boxShadow: activeRing('praktisch'),
              ...editHint(!!s.datumTijdTekst)
            }}
          >
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: ptcqw(8),
                color: textColor,
                textAlign: alignCss
              }}
            >
              Datum &amp; tijd
            </span>
            {!s.datumTijdTekst ? (
              <span style={placeholderStyle}>Tik om datum &amp; tijd toe te voegen</span>
            ) : (
              <span
                className="block mt-[0.25cqh] leading-relaxed opacity-90"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontWeight: 400,
                  fontSize: ptcqw(11.5),
                  color: textColor,
                  textAlign: alignCss,
                  whiteSpace: 'pre-wrap',
                  textShadow: textShadowCss
                }}
              >
                {s.datumTijdTekst}
              </span>
            )}
          </div>

          <div
            onClick={(e) => handleAction(e, 'praktisch')}
            className="p-[0.4cqw_1cqw] rounded-[1cqw] max-w-[88cqw] cursor-pointer"
            style={{
              boxShadow: activeRing('praktisch'),
              ...editHint(!!s.samenzijnTekst)
            }}
          >
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: ptcqw(8),
                color: textColor,
                textAlign: alignCss
              }}
            >
              Samenzijn
            </span>
            {!s.samenzijnTekst ? (
              <span style={placeholderStyle}>Tik om toe te voegen, indien van toepassing</span>
            ) : (
              <span
                className="block mt-[0.25cqh] leading-relaxed opacity-90"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontWeight: 400,
                  fontSize: ptcqw(11.5),
                  color: textColor,
                  textAlign: alignCss,
                  whiteSpace: 'pre-wrap',
                  textShadow: textShadowCss
                }}
              >
                {s.samenzijnTekst}
              </span>
            )}
          </div>

          <div
            onClick={(e) => handleAction(e, 'praktisch')}
            className="p-[0.4cqw_1cqw] rounded-[1cqw] max-w-[88cqw] cursor-pointer"
            style={{
              boxShadow: activeRing('praktisch'),
              ...editHint(!!s.inzamelingTekst)
            }}
          >
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: ptcqw(8),
                color: textColor,
                textAlign: alignCss
              }}
            >
              Inzameling
            </span>
            {!s.inzamelingTekst ? (
              <span style={placeholderStyle}>Tik om toe te voegen, indien van toepassing</span>
            ) : (
              <span
                className="block mt-[0.25cqh] leading-relaxed opacity-90"
                style={{
                  fontFamily: pairing.dataFamily,
                  fontWeight: 400,
                  fontSize: ptcqw(11.5),
                  color: textColor,
                  textAlign: alignCss,
                  whiteSpace: 'pre-wrap',
                  textShadow: textShadowCss
                }}
              >
                {s.inzamelingTekst}
              </span>
            )}
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
        <div
          className="absolute inset-0 flex flex-col justify-center p-[8cqw_7cqw] box-border pointer-events-none"
          style={{ alignItems: alignItemsCss }}
        >
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
                lineHeight: 1.55,
                display: 'block',
                whiteSpace: 'pre-wrap',
                textShadow: textShadowCss
              }}
            >
              {s.binnenTekst}
            </span>
          )}
          {s.afsluitingTekst && (
            <span
              className="mt-[2cqh] block opacity-80"
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

      {/* Right Spread Page */}
      <div
        onClick={() => (onZoomBinnen ? onZoomBinnen('rechts') : null)}
        className="relative w-[48%] aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] cursor-pointer select-none"
        style={{
          background: matBgColor,
          containerType: 'inline-size'
        }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-evenly p-[10cqw_7cqw] box-border pointer-events-none"
          style={{ alignItems: alignItemsCss }}
        >
          <div>
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{ fontFamily: 'var(--font-family)', fontSize: ptcqw(7.5), color: textColor }}
            >
              Locatie
            </span>
            <span
              className="block mt-[0.2cqh] opacity-90 line-clamp-2"
              style={{
                fontFamily: pairing.dataFamily,
                fontSize: ptcqw(10.5),
                color: textColor,
                textAlign: alignCss
              }}
            >
              {s.locatieTekst || 'Aula "Het Rustpunt"...'}
            </span>
          </div>

          <div>
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{ fontFamily: 'var(--font-family)', fontSize: ptcqw(7.5), color: textColor }}
            >
              Datum &amp; tijd
            </span>
            <span
              className="block mt-[0.2cqh] opacity-90 line-clamp-2"
              style={{
                fontFamily: pairing.dataFamily,
                fontSize: ptcqw(10.5),
                color: textColor,
                textAlign: alignCss
              }}
            >
              {s.datumTijdTekst || 'Donderdag 28 augustus...'}
            </span>
          </div>

          <div>
            <span
              className="block font-bold uppercase tracking-[0.08em] opacity-55"
              style={{ fontFamily: 'var(--font-family)', fontSize: ptcqw(7.5), color: textColor }}
            >
              Samenzijn
            </span>
            <span
              className="block mt-[0.2cqh] opacity-90 line-clamp-2"
              style={{
                fontFamily: pairing.dataFamily,
                fontSize: ptcqw(10.5),
                color: textColor,
                textAlign: alignCss
              }}
            >
              {s.samenzijnTekst || 'Gelegenheid tot samenzijn...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // 3. BACK SIDE RENDERING
  const renderBack = () => {
    const parentList = s.familieNamen.filter((n) => !n.parentId);

    return (
      <div
        onClick={(e) => handleAction(e, 'familie')}
        className="relative w-full aspect-[397/559] rounded-[1rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] select-none"
        style={{
          background: thema ? themeGradient : matBgColor,
          containerType: 'inline-size'
        }}
      >
        {!s.geenNamenOpKaart && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-[10cqw] box-border z-10">
            <div
              className="p-[0.8cqw_1.4cqw] rounded-[1cqw] text-center w-full max-w-[86cqw] cursor-pointer"
              style={{
                boxShadow: activeRing('familie'),
                ...editHint(true)
              }}
            >
              {s.kopregel && (
                <span
                  className="block font-bold text-center mb-[0.6cqh]"
                  style={{
                    fontFamily: pairing.dataFamily,
                    fontSize: ptcqw(11),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.kopregel}
                </span>
              )}

              {/* Family rows list */}
              <div className="flex flex-col gap-[0.35cqh] my-[0.8cqh]">
                {parentList.map((top) => {
                  const children = s.familieNamen.filter((c) => c.parentId === top.id);
                  return (
                    <div key={top.id} className="flex flex-col">
                      <div
                        className="flex items-baseline justify-center gap-[0.2em] leading-snug"
                        style={{
                          fontFamily: pairing.dataFamily,
                          fontWeight: 400,
                          fontSize: ptcqw(12.5),
                          color: textColor,
                          textShadow: textShadowCss
                        }}
                      >
                        {top.overleden && (
                          <span className="text-[0.8em] font-light">†</span>
                        )}
                        <span>{top.naam || 'Voor- en achternaam'}</span>
                        {top.relatie && (
                          <span className="opacity-70 text-[0.85em]">
                            ({top.relatie})
                          </span>
                        )}
                      </div>

                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-baseline justify-center gap-[0.2em] leading-snug opacity-90 pl-[2cqw]"
                          style={{
                            fontFamily: pairing.dataFamily,
                            fontWeight: 400,
                            fontSize: ptcqw(11),
                            color: textColor,
                            textShadow: textShadowCss
                          }}
                        >
                          {child.overleden && (
                            <span className="text-[0.8em] font-light">†</span>
                          )}
                          <span>{child.naam || 'Voor- en achternaam'}</span>
                          {child.relatie && (
                            <span className="opacity-70 text-[0.85em]">
                              ({child.relatie})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {s.samenvattendeRegel && (
                <span
                  className="block italic text-center mt-[0.8cqh] font-light"
                  style={{
                    fontFamily: pairing.spreukFamily,
                    fontSize: ptcqw(12.5),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.samenvattendeRegel}
                </span>
              )}

              {s.bredereKring && (
                <span
                  className="block text-center mt-[0.4cqh] opacity-75"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: ptcqw(9.5),
                    color: textColor,
                    textShadow: textShadowCss
                  }}
                >
                  {s.bredereKring}
                </span>
              )}

              {s.deFamilies && (
                <span
                  className="block text-center mt-[0.4cqh] opacity-75"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: ptcqw(9.5),
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
