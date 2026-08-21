import React, { useState, useEffect } from 'react';
import {
  WizardState,
  Formaat,
  Smaak,
  Indeling,
  Side,
  ActiveSheet,
  SizeOption,
  SpreukTone,
  SpreukPositie,
  SfeerZinPositie,
  Uitstraling,
  Uitlijning,
  FontPairingId,
  OrnamentId,
  FamilieLid,
  PersonaDef,
  SavedCreation
} from './types/wizard';
import {
  INITIAL_STATE,
  INITIAL_SAVED_CREATIONS,
  PERSONAS,
  THEMES,
  MAX_NAAM,
  MAX_SPREUK,
  MAX_BINNEN
} from './constants/wizard';
import { HomeScreen } from './components/HomeScreen';
import { Step1ThreeChoices } from './components/Step1ThreeChoices';
import { Step2Personalize } from './components/Step2Personalize';
import { Step3Overview } from './components/Step3Overview';
import { Step4Completed } from './components/Step4Completed';
import { BottomSheetContainer } from './components/BottomSheets/BottomSheetContainer';
import { SheetNaam } from './components/BottomSheets/SheetNaam';
import { SheetData } from './components/BottomSheets/SheetData';
import { SheetSpreuk } from './components/BottomSheets/SheetSpreuk';
import { SheetBinnen } from './components/BottomSheets/SheetBinnen';
import { SheetPraktisch } from './components/BottomSheets/SheetPraktisch';
import { SheetFamilie } from './components/BottomSheets/SheetFamilie';
import { SheetStijl } from './components/BottomSheets/SheetStijl';
import { SheetThema } from './components/BottomSheets/SheetThema';
import { DialogLock } from './components/BottomSheets/DialogLock';
import { ModalLightbox } from './components/BottomSheets/ModalLightbox';

const CREATIONS_KEY = 'memortium_saved_creations';

export const App: React.FC = () => {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Load saved creations from localStorage with fallback
  const [creations, setCreations] = useState<SavedCreation[]>(() => {
    try {
      const stored = localStorage.getItem(CREATIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading creations from localStorage', e);
    }
    return INITIAL_SAVED_CREATIONS;
  });

  // Save creations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CREATIONS_KEY, JSON.stringify(creations));
    } catch (e) {
      console.error('Error saving creations to localStorage', e);
    }
  }, [creations]);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Select Persona from Home Screen
  const handleSelectPersona = (persona: PersonaDef) => {
    setState({
      ...INITIAL_STATE,
      ...persona.defaultState,
      personaId: persona.id,
      photoVolledigUrl: persona.photoVolledigUrl,
      photoCutoutUrl: persona.photoCutoutUrl,
      screen: 'stap1'
    } as WizardState);
  };

  // Open existing creation
  const handleOpenCreation = (creation: SavedCreation) => {
    setState({
      ...creation.state,
      screen: 'stap2'
    });
  };

  // Save current creation
  const handleSaveCurrentCreation = () => {
    const themeObj = THEMES.find((t) => t.id === state.thema);
    const themeName = themeObj ? themeObj.naam : 'Eigen stijl';
    const title = `${state.naam || 'Gedenkkaart'} — ${state.formaat === 'enkel' ? 'Enkel' : 'Gevouwen'} (${themeName})`;
    
    const now = new Date();
    const timeStr = `Vandaag, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newCreation: SavedCreation = {
      id: `creation-${Date.now()}`,
      createdAt: timeStr,
      personaId: state.personaId,
      title,
      state: { ...state, screen: 'stap2' }
    };

    setCreations((prev) => [newCreation, ...prev]);
    showToast('Kaart opgeslagen in Mijn Creaties!');
  };

  // Delete creation
  const handleDeleteCreation = (id: string) => {
    setCreations((prev) => prev.filter((c) => c.id !== id));
    showToast('Kaart verwijderd');
  };

  // Duplicate creation
  const handleDuplicateCreation = (creation: SavedCreation) => {
    const copy: SavedCreation = {
      ...creation,
      id: `creation-${Date.now()}`,
      createdAt: 'Zojuist gedupliceerd',
      title: `${creation.title} (kopie)`
    };
    setCreations((prev) => [copy, ...prev]);
    showToast('Kopie gemaakt in Mijn Creaties!');
  };

  // State modification helpers
  const setFormaat = (formaat: Formaat) => {
    setState((s) => ({
      ...s,
      formaat,
      indeling: formaat === 'enkel' && s.indeling === 'sfeer-voorop' ? 'volledig' : s.indeling,
      side: formaat === 'enkel' && s.side === 'binnen' ? 'voor' : s.side
    }));
  };

  const setSmaak = (smaak: Smaak) => {
    setState((s) => ({ ...s, smaak }));
  };

  const setIndeling = (indeling: Indeling) => {
    setState((s) => ({ ...s, indeling }));
  };

  const setThema = (thema: string) => {
    setState((s) => ({ ...s, thema }));
  };

  const setSide = (side: Side) => {
    setState((s) => ({ ...s, side, binnenZoom: null }));
  };

  const setSize = (block: 'naam' | 'data' | 'spreuk' | 'binnen', val: SizeOption) => {
    setState((s) => {
      const nextSizes = { ...s.sizes, [block]: val };
      const next: Partial<WizardState> = { sizes: nextSizes };
      if (block === 'naam') next.naam = s.naam.slice(0, MAX_NAAM[val]);
      if (block === 'spreuk') next.spreuk = s.spreuk.slice(0, MAX_SPREUK[val]);
      if (block === 'binnen') next.binnenTekst = s.binnenTekst.slice(0, MAX_BINNEN[val]);
      return { ...s, ...next };
    });
  };

  const updateNaamVeld = (id: number, key: keyof FamilieLid, val: any) => {
    setState((s) => ({
      ...s,
      familieNamen: s.familieNamen.map((n) => (n.id === id ? { ...n, [key]: val } : n))
    }));
  };

  const addNaam = () => {
    setState((s) => ({
      ...s,
      familieNamen: [
        ...s.familieNamen,
        {
          id: Date.now(),
          naam: '',
          relatie: '',
          overleden: false,
          parentId: null
        }
      ]
    }));
  };

  const removeNaam = (id: number) => {
    setState((s) => ({
      ...s,
      familieNamen: s.familieNamen.filter((n) => n.id !== id && n.parentId !== id)
    }));
  };

  const toggleNaamOverleden = (id: number) => {
    setState((s) => ({
      ...s,
      familieNamen: s.familieNamen.map((n) =>
        n.id === id ? { ...n, overleden: !n.overleden } : n
      )
    }));
  };

  const indentNaam = (id: number) => {
    setState((s) => {
      const idx = s.familieNamen.findIndex((n) => n.id === id);
      if (idx <= 0) return s;
      const prev = s.familieNamen[idx - 1];
      const targetParentId = prev.parentId !== null ? prev.parentId : prev.id;
      return {
        ...s,
        familieNamen: s.familieNamen.map((n) =>
          n.id === id ? { ...n, parentId: targetParentId } : n
        )
      };
    });
  };

  const outdentNaam = (id: number) => {
    setState((s) => ({
      ...s,
      familieNamen: s.familieNamen.map((n) => (n.id === id ? { ...n, parentId: null } : n))
    }));
  };

  const openSheet = (sheet: ActiveSheet) => {
    if (state.locked) return;
    setState((s) => ({ ...s, activeSheet: sheet }));
  };

  const closeSheet = () => {
    setState((s) => ({ ...s, activeSheet: null }));
  };

  const goToHome = () => {
    setState((s) => ({ ...s, screen: 'home', activeSheet: null }));
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex justify-center selection:bg-[#c99f6c]/30">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-[#2d2d3a] text-white text-[0.8125rem] font-medium shadow-lg animate-bounce">
          {saveToast}
        </div>
      )}

      <div className="w-full max-w-[480px] min-h-screen bg-[var(--background)] shadow-2xl relative flex flex-col">
        {/* SCREEN 1: Stap 1 (Drie keuzes) */}
        {state.screen === 'stap1' && (
          <Step1ThreeChoices
            state={state}
            onSetFormaat={setFormaat}
            onSetSmaak={setSmaak}
            onSetIndeling={setIndeling}
            onSetThema={setThema}
            onOpenLightbox={() => setState((s) => ({ ...s, previewLightboxOpen: true }))}
            onNext={() => setState((s) => ({ ...s, screen: 'stap2', side: 'voor' }))}
            onGoHome={() => setState((s) => ({ ...s, screen: 'stap1' }))}
          />
        )}

        {/* SCREEN 2: Stap 2 (Personaliseren) */}
        {state.screen === 'stap2' && (
          <Step2Personalize
            state={state}
            onBack={() => setState((s) => ({ ...s, screen: 'stap1' }))}
            onNext={() => setState((s) => ({ ...s, screen: 'stap3', side: 'voor' }))}
            onSetSide={setSide}
            onOpenSheet={openSheet}
            onZoomBinnen={(side) => setState((s) => ({ ...s, binnenZoom: side }))}
            onOpenLockDialog={() => setState((s) => ({ ...s, lockDialogOpen: true }))}
            onOpenLightbox={() => setState((s) => ({ ...s, previewLightboxOpen: true }))}
          />
        )}

        {/* SCREEN 3: Stap 3 (Overzicht) */}
        {state.screen === 'stap3' && (
          <Step3Overview
            state={state}
            onBack={() => setState((s) => ({ ...s, screen: 'stap2' }))}
            onConfirm={() => setState((s) => ({ ...s, screen: 'voltooid' }))}
            onSetSide={setSide}
            onZoomBinnen={(side) => setState((s) => ({ ...s, binnenZoom: side }))}
            onOpenLockDialog={() => setState((s) => ({ ...s, lockDialogOpen: true }))}
          />
        )}

        {/* SCREEN 4: Voltooid */}
        {state.screen === 'voltooid' && (
          <Step4Completed
            onRestart={() => setState((s) => ({ ...s, screen: 'stap1' }))}
          />
        )}

        {/* --- BOTTOM SHEETS --- */}

        {/* 1. Sheet Naam */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'naam'}
          onClose={closeSheet}
          category="Tekst"
          title="De naam"
        >
          <SheetNaam
            naam={state.naam}
            size={state.sizes.naam}
            onChangeNaam={(val) => setState((s) => ({ ...s, naam: val }))}
            onChangeSize={(size) => setSize('naam', size)}
          />
        </BottomSheetContainer>

        {/* 2. Sheet Data */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'data'}
          onClose={closeSheet}
          category="Tekst"
          title="Data"
        >
          <SheetData
            dataGeboorte={state.dataGeboorte}
            dataOverlijden={state.dataOverlijden}
            size={state.sizes.data}
            onChangeGeboorte={(val: string) => setState((s) => ({ ...s, dataGeboorte: val }))}
            onChangeOverlijden={(val: string) => setState((s) => ({ ...s, dataOverlijden: val }))}
            onChangeSize={(size) => setSize('data', size)}
          />
        </BottomSheetContainer>

        {/* 3. Sheet Spreuk */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'spreuk'}
          onClose={closeSheet}
          category="Tekst"
          title="Spreuk of regel"
        >
          <SheetSpreuk
            spreuk={state.spreuk}
            size={state.sizes.spreuk}
            spreukTone={state.spreukTone}
            spreukPositie={state.spreukPositie}
            forceBoven={false}
            onChangeSpreuk={(val: string) => setState((s) => ({ ...s, spreuk: val }))}
            onChangeTone={(tone: SpreukTone) => setState((s) => ({ ...s, spreukTone: tone }))}
            onChangePositie={(pos: SpreukPositie) =>
              setState((s) => ({ ...s, spreukPositie: pos }))
            }
            onChangeSize={(size) => setSize('spreuk', size)}
          />
        </BottomSheetContainer>

        {/* 4. Sheet Binnenzijde */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'binnen'}
          onClose={closeSheet}
          category="Tekst"
          title="Binnenzijde"
        >
          <SheetBinnen
            binnenTekst={state.binnenTekst}
            afsluitingTekst={state.afsluitingTekst}
            size={state.sizes.binnen}
            indeling={state.indeling}
            spreuk={state.spreuk}
            onChangeBinnenTekst={(val: string) => setState((s) => ({ ...s, binnenTekst: val }))}
            onChangeAfsluitingTekst={(val: string) => setState((s) => ({ ...s, afsluitingTekst: val }))}
            onChangeSize={(size) => setSize('binnen', size)}
          />
        </BottomSheetContainer>

        {/* 5. Sheet Praktisch */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'praktisch'}
          onClose={closeSheet}
          category="Tekst"
          title="Praktische informatie"
        >
          <SheetPraktisch
            locatieTekst={state.locatieTekst}
            datumTijdTekst={state.datumTijdTekst}
            samenzijnTekst={state.samenzijnTekst}
            inzamelingTekst={state.inzamelingTekst}
            onChangeLocatie={(val) => setState((s) => ({ ...s, locatieTekst: val }))}
            onChangeDatumTijd={(val) => setState((s) => ({ ...s, datumTijdTekst: val }))}
            onChangeSamenzijn={(val) => setState((s) => ({ ...s, samenzijnTekst: val }))}
            onChangeInzameling={(val) => setState((s) => ({ ...s, inzamelingTekst: val }))}
          />
        </BottomSheetContainer>

        {/* 6. Sheet Familie */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'familie'}
          onClose={closeSheet}
          category="Namen"
          title="Familie en betrokkenen"
        >
          <SheetFamilie
            geenNamenOpKaart={state.geenNamenOpKaart}
            kopregel={state.kopregel}
            familieNamen={state.familieNamen}
            samenvattendeRegel={state.samenvattendeRegel}
            bredereKring={state.bredereKring}
            deFamilies={state.deFamilies}
            onToggleGeenNamen={() =>
              setState((s) => ({ ...s, geenNamenOpKaart: !s.geenNamenOpKaart }))
            }
            onChangeKopregel={(val: string) => setState((s) => ({ ...s, kopregel: val }))}
            onAddNaam={addNaam}
            onRemoveNaam={removeNaam}
            onUpdateNaamVeld={updateNaamVeld}
            onToggleOverleden={toggleNaamOverleden}
            onIndentNaam={indentNaam}
            onOutdentNaam={outdentNaam}
            onChangeSamenvattend={(val: string) =>
              setState((s) => ({ ...s, samenvattendeRegel: val }))
            }
            onChangeBredereKring={(val: string) => setState((s) => ({ ...s, bredereKring: val }))}
            onChangeDeFamilies={(val: string) => setState((s) => ({ ...s, deFamilies: val }))}
          />
        </BottomSheetContainer>

        {/* 7. Sheet Stijl */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'stijl'}
          onClose={closeSheet}
          category="Stijl"
          title="Stijl van de kaart"
        >
          <SheetStijl
            naam={state.naam}
            uitstraling={state.uitstraling}
            uitlijning={state.uitlijning}
            spreukPositie={state.spreukPositie}
            sfeerZinPositie={state.sfeerZinPositie}
            fontPairing={state.fontPairing}
            indeling={state.indeling}
            onChangeUitstraling={(val: Uitstraling) =>
              setState((s) => ({ ...s, uitstraling: val }))
            }
            onChangeUitlijning={(val: Uitlijning) =>
              setState((s) => ({ ...s, uitlijning: val }))
            }
            onChangeSpreukPositie={(val: SpreukPositie) =>
              setState((s) => ({ ...s, spreukPositie: val }))
            }
            onChangeSfeerZinPositie={(val: SfeerZinPositie) =>
              setState((s) => ({ ...s, sfeerZinPositie: val }))
            }
            onChangeFontPairing={(val: FontPairingId) =>
              setState((s) => ({ ...s, fontPairing: val }))
            }
          />
        </BottomSheetContainer>

        {/* 8. Sheet Thema */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'thema'}
          onClose={closeSheet}
          category="Thema &amp; sfeer"
          title="Thema en sfeer"
        >
          <SheetThema
            selectedThema={state.thema}
            selectedOrnament={state.ornament}
            onChangeThema={setThema}
            onChangeOrnament={(val: OrnamentId) =>
              setState((s) => ({ ...s, ornament: val }))
            }
          />
        </BottomSheetContainer>

        {/* Lock Dialog */}
        <DialogLock
          isOpen={state.lockDialogOpen}
          isLocked={state.locked}
          onClose={() => setState((s) => ({ ...s, lockDialogOpen: false }))}
          onConfirm={() =>
            setState((s) => ({
              ...s,
              locked: !s.locked,
              lockDialogOpen: false,
              activeSheet: s.locked ? s.activeSheet : null
            }))
          }
        />

        {/* Lightbox Preview */}
        <ModalLightbox
          isOpen={state.previewLightboxOpen}
          state={state}
          onClose={() => setState((s) => ({ ...s, previewLightboxOpen: false }))}
          onSetSide={setSide}
        />
      </div>
    </div>
  );
};
