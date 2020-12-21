import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import { hentArbeidssøker } from './api/arbeidssøkerApi';
import { hentKandidat } from './api/api';
import {
    ikkeLastet,
    lasterInn,
    RestKandidat,
    Status,
    RestArbeidssøker,
    Samtykkestatus,
} from './api/Rest';
import { hentSamtykke } from './api/api';
import { Kandidat } from './api/Kandidat';
import { visDetaljerEvent } from './utils/navigering';
import Endring from './endring/Endring';
import Introduksjon from './introduksjon/Introduksjon';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';
import './App.less';
import SamtykkeAdvarsel from './advarsel/Samtykkeadvarsel';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    const [kandidat, setKandidat] = useState<RestKandidat>(ikkeLastet);
    const [arbeidssøker, setArbeidssøker] = useState<RestArbeidssøker>(ikkeLastet);
    const [samtykke, setSamtykke] = useState<Samtykkestatus>(Status.IkkeLastet);

    const hentKandidatFraApi = useCallback(async () => {
        setKandidat(lasterInn);
        setKandidat(await hentKandidat(fnr));
    }, [fnr]);

    const finnSamtykke = useCallback(async () => {
        setSamtykke(Status.LasterInn);
        setSamtykke(await hentSamtykke('1000010000000'));
    }, []);

    const hentOgSettArbeidssøker = async (kandidat: Kandidat) => {
        setArbeidssøker(lasterInn);
        setArbeidssøker(await hentArbeidssøker(kandidat.aktørId));
    };

    useEffect(() => {
        hentKandidatFraApi();
        if (kandidat.status !== Status.Suksess) {
            finnSamtykke();
        }
    }, [hentKandidatFraApi, finnSamtykke]);

    useEffect(() => {
        if (kandidat.status === Status.Suksess) {
            hentOgSettArbeidssøker(kandidat.data);
        }
    }, [kandidat]);

    useEffect(() => {
        if (samtykke === Status.Suksess) {
            <SamtykkeAdvarsel />;
        }
    });

    useEffect(() => {
        window.addEventListener(visDetaljerEvent, hentKandidatFraApi);
        return () => {
            window.removeEventListener(visDetaljerEvent, hentKandidatFraApi);
        };
    }, [hentKandidatFraApi]);

    const kandidatErIkkeRegistrert =
        (kandidat.status === Status.Feil && kandidat.statusKode === 404) ||
        kandidat.status === Status.Slettet;

    const visKomponent = () => {
        if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return <Endring kandidat={kandidat.data} />;
            } else if (kandidatErIkkeRegistrert) {
                return <Registrering fnr={fnr} />;
            }
        } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return <Visning kandidat={kandidat.data} arbeidssøker={arbeidssøker} />;
            } else if (kandidatErIkkeRegistrert) {
                return <Introduksjon />;
            }
        }

        if (kandidat.status === Status.Feil) {
            return <AlertStripeFeil>Kunne ikke hente tilretteleggingsbehov</AlertStripeFeil>;
        }
    };

    return (
        <Normaltekst className="registrer-tilretteleggingsbehov-app" tag="div">
            {visKomponent()}
        </Normaltekst>
    );
};

export default App;
