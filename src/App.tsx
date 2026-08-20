import React, { useState } from 'react';
import { WizardState, Formaat, Smaak, Indeling, Side, ActiveSheet, SizeOption, SpreukTone, SpreukPositie, SfeerZinPositie, Uitstraling, Uitlijning, FontPairingId, OrnamentId, FamilieLid } from './types/wizard';
import { INITIAL_STATE, MAX_NAAM, MAX_SPREUK, MAX_BINNEN } from './constants/wizard';
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

export const App: React.FC = () => {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

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
      let prevTop: number | null = null;
      for (let i = idx - 1; i >= 0; i--) {
        if (!s.familieNamen[i].parentId) {
          prevTop = s.familieNamen[i].id;
          break;
        }
      }
      if (!prevTop) return s;
      return {
        ...s,
        familieNamen: s.familieNamen.map((n) => (n.id === id ? { ...n, parentId: prevTop } : n))
      };
    });
  };

  const outdentNaam = (id: number) => {
    setState((s) => ({
      ...s,
      familieNamen: s.familieNamen.map((n) => (n.id === id ? { ...n, parentId: null } : n))
    }));
  };

  const closeSheet = () => setState((s) => ({ ...s, activeSheet: null }));

  return (
    <div className="min-h-screen bg-[var(--surface-page-image)] flex justify-center selection:bg-[rgba(45,45,58,0.15)]">
      {/* Mobile App Shell */}
      <div className="w-full max-w-[480px] min-h-screen bg-[#fcfcfd] shadow-[0_25px_60px_rgba(0,0,0,0.1)] relative flex flex-col overflow-x-hidden">
        {/* Screen 1: Stap 1 */}
        {state.screen === 'stap1' && (
          <Step1ThreeChoices
            state={state}
            onSetFormaat={setFormaat}
            onSetSmaak={setSmaak}
            onSetIndeling={setIndeling}
            onSetThema={setThema}
            onOpenLightbox={() => setState((s) => ({ ...s, previewLightboxOpen: true }))}
            onNext={() => setState((s) => ({ ...s, screen: 'stap2' }))}
          />
        )}

        {/* Screen 2: Stap 2 */}
        {state.screen === 'stap2' && (
          <Step2Personalize
            state={state}
            onBack={() => setState((s) => ({ ...s, screen: 'stap1' }))}
            onNext={() => setState((s) => ({ ...s, screen: 'stap3' }))}
            onSetSide={setSide}
            onOpenSheet={(sheet) => {
              if (!state.locked || sheet === 'naam' || sheet === 'data' || sheet === 'spreuk' || sheet === 'binnen' || sheet === 'praktisch' || sheet === 'familie') {
                setState((s) => ({ ...s, activeSheet: sheet }));
              }
            }}
            onZoomBinnen={(side) => setState((s) => ({ ...s, binnenZoom: side }))}
            onOpenLockDialog={() => setState((s) => ({ ...s, lockDialogOpen: true }))}
          />
        )}

        {/* Screen 3: Stap 3 */}
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

        {/* Screen 4: Voltooid */}
        {state.screen === 'voltooid' && (
          <Step4Completed
            onRestart={() => setState((s) => ({ ...s, screen: 'stap1' }))}
          />
        )}

        {/* BOTTOM SHEETS */}
        {/* 1. Sheet Naam */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'naam'}
          onClose={closeSheet}
          category="Voorkant"
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
          category="Voorkant"
          title="De data"
        >
          <SheetData
            dataGeboorte={state.dataGeboorte}
            dataOverlijden={state.dataOverlijden}
            size={state.sizes.data}
            onChangeGeboorte={(val) => setState((s) => ({ ...s, dataGeboorte: val }))}
            onChangeOverlijden={(val) => setState((s) => ({ ...s, dataOverlijden: val }))}
            onChangeSize={(size) => setSize('data', size)}
          />
        </BottomSheetContainer>

        {/* 3. Sheet Spreuk */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'spreuk'}
          onClose={closeSheet}
          category="Voorkant"
          title="Een spreuk"
        >
          <SheetSpreuk
            spreuk={state.spreuk}
            spreukTone={state.spreukTone}
            spreukPositie={state.spreukPositie}
            size={state.sizes.spreuk}
            forceBoven={
              state.smaak === 'vrijgezet' &&
              (state.indeling === 'volledig' || state.indeling === 'kader')
            }
            onChangeSpreuk={(val) => setState((s) => ({ ...s, spreuk: val }))}
            onChangeTone={(tone: SpreukTone) => setState((s) => ({ ...s, spreukTone: tone }))}
            onChangePositie={(pos: SpreukPositie) =>
              setState((s) => ({ ...s, spreukPositie: pos }))
            }
            onChangeSize={(size) => setSize('spreuk', size)}
          />
        </BottomSheetContainer>

        {/* 4. Sheet Binnen */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'binnen'}
          onClose={closeSheet}
          category="Binnenzijde"
          title="De binnentekst"
        >
          <SheetBinnen
            binnenTekst={state.binnenTekst}
            afsluitingTekst={state.afsluitingTekst}
            size={state.sizes.binnen}
            onChangeBinnenTekst={(val) => setState((s) => ({ ...s, binnenTekst: val }))}
            onChangeAfsluitingTekst={(val) => setState((s) => ({ ...s, afsluitingTekst: val }))}
            onChangeSize={(size) => setSize('binnen', size)}
          />
        </BottomSheetContainer>

        {/* 5. Sheet Praktisch */}
        <BottomSheetContainer
          isOpen={state.activeSheet === 'praktisch'}
          onClose={closeSheet}
          category="Binnenzijde, rechterpagina"
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
          category="Achterkant"
          title="Uit naam van"
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
            onChangeKopregel={(val) => setState((s) => ({ ...s, kopregel: val }))}
            onAddNaam={addNaam}
            onRemoveNaam={removeNaam}
            onUpdateNaamVeld={updateNaamVeld}
            onToggleOverleden={toggleNaamOverleden}
            onIndentNaam={indentNaam}
            onOutdentNaam={outdentNaam}
            onChangeSamenvattend={(val) => setState((s) => ({ ...s, samenvattendeRegel: val }))}
            onChangeBredereKring={(val) => setState((s) => ({ ...s, bredereKring: val }))}
            onChangeDeFamilies={(val) => setState((s) => ({ ...s, deFamilies: val }))}
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
            uitstraling={state.uitstraling}
            uitlijning={state.uitlijning}
            sfeerZinPositie={state.sfeerZinPositie}
            fontPairing={state.fontPairing}
            indeling={state.indeling}
            onChangeUitstraling={(val: Uitstraling) =>
              setState((s) => ({ ...s, uitstraling: val }))
            }
            onChangeUitlijning={(val: Uitlijning) =>
              setState((s) => ({ ...s, uitlijning: val }))
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
        />
      </div>
    </div>
  );
};
