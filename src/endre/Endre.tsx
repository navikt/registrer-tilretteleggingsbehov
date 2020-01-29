import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    Behov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../api/Behov';
import { RestKandidat, Status } from '../api/RestKandidat';
import Lenke from 'nav-frontend-lenker';
import { navigerTilVisningsside } from '../utils/navigering';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Feilmelding, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import KategoriSpørsmål from '../registrering/kategori-spørsmål/KategoriSpørsmål';
import { Kandidat, KandidatDto } from '../api/Kandidat';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import './Endre.less';
import { endreKandidat, slettKandidat } from '../api/api';

interface Props {
    kandidat: Kandidat;
}

const Endre: FunctionComponent<Props> = ({ kandidat }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>(kandidat.arbeidstidBehov);
    const [fysisk, setFysisk] = useState<Behov[]>(kandidat.fysiskeBehov);
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>(kandidat.arbeidsmiljøBehov);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>(kandidat.grunnleggendeBehov);
    const [endreStatus, setEndreStatus] = useState<Status>(Status.IkkeLastet);
    const [sletteStatus, setSletteStatus] = useState<Status>(Status.IkkeLastet);

    useEffect(() => {
        if (endreStatus === Status.Suksess || sletteStatus === Status.Slettet) {
            navigerTilVisningsside();
        }
    }, [endreStatus, sletteStatus]);

    const slettBehov = async () => {
        const respons: RestKandidat = await slettKandidat(kandidat.fnr);
        setSletteStatus(respons.status);
    };

    const endreBehov = async () => {
        if (endreStatus === Status.LasterInn) return;

        const endring: KandidatDto = {
            fnr: kandidat.fnr,
            arbeidstidBehov: arbeidstid as ArbeidstidBehov[],
            fysiskeBehov: fysisk as FysiskBehov[],
            arbeidsmiljøBehov: arbeidsmiljø as ArbeidsmijøBehov[],
            grunnleggendeBehov: grunnleggende as GrunnleggendeBehov[],
        };

        setEndreStatus(Status.LasterInn);
        const respons: RestKandidat = await endreKandidat(endring);
        setEndreStatus(respons.status);
    };

    return (
        <div className="endre">
            <main className="endre__innhold">
                <Lenke
                    href=""
                    onClick={e => {
                        e.preventDefault();
                        navigerTilVisningsside();
                    }}
                    className="endre__tilbake"
                >
                    <VenstreChevron />
                    Tilbake til detaljer
                </Lenke>
                <div className="endre__tittel-wrapper">
                    <Sidetittel>Endre tilretteleggingsbehov</Sidetittel>
                    <Knapp onClick={slettBehov} mini={true}>
                        Slett
                    </Knapp>
                </div>
                <Alertstripe className="blokk-m" type="info">
                    Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                    kunne se disse opplysningene.
                </Alertstripe>
                <form className="endre__form">
                    <KategoriSpørsmål
                        tittel="Arbeidstid"
                        beskrivelse="Behov for tilrettelegging av arbeidstiden"
                        valgteBehov={arbeidstid}
                        onChange={setArbeidstid}
                        kategori="arbeidstid"
                    />
                    <KategoriSpørsmål
                        tittel="Fysisk tilrettelegging"
                        beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                        valgteBehov={fysisk}
                        onChange={setFysisk}
                        kategori="fysisk"
                    />
                    <KategoriSpørsmål
                        tittel="Arbeidsmiljø"
                        beskrivelse="Dersom det er behov for tilrettelegging av arbeidsmiljøet, hvordan bør det tilrettelegges for kandidaten?"
                        valgteBehov={arbeidsmiljø}
                        onChange={setArbeidsmiljø}
                        kategori="arbeidsmiljø"
                    />
                    <KategoriSpørsmål
                        tittel="Grunnleggende ferdigheter"
                        beskrivelse="Har kandidaten utfordringer med noe av dette?"
                        valgteBehov={grunnleggende}
                        onChange={setGrunnleggende}
                        kategori="grunnleggende"
                    />
                    <Hovedknapp
                        onClick={endreBehov}
                        spinner={endreStatus === Status.LasterInn}
                        htmlType="button"
                        className="endre__lagreknapp"
                    >
                        Lagre endringer
                    </Hovedknapp>
                    <Knapp onClick={navigerTilVisningsside}>Avbryt</Knapp>
                    {endreStatus === Status.Feil ||
                        (endreStatus === Status.UkjentFeil && (
                            <Feilmelding>Kunne ikke endre tilretteleggingsbehov</Feilmelding>
                        ))}
                </form>
            </main>
        </div>
    );
};

export default Endre;
