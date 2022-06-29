import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Alert } from '@navikt/ds-react';

import { hentArbeidssøker } from './api/arbeidssøkerApi';
import { hentKandidat, hentSamtykke } from './api/api';
import {
    ikkeLastet,
    lasterInn,
    RestArbeidssøker,
    RestKandidat,
    Samtykkestatus,
    Status,
} from './api/Rest';
import { visDetaljerEvent } from './utils/navigering';
import Endring from './endring/Endring';
import Introduksjon from './introduksjon/Introduksjon';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';

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

    useEffect(() => {
        hentKandidatFraApi();
    }, [hentKandidatFraApi]);

    const hentOgSettArbeidssøker = async (aktørId: string) => {
        setArbeidssøker(lasterInn);
        setArbeidssøker(await hentArbeidssøker(aktørId));
    };

    const hentOgSettSamtykke = async (aktørId: string) => {
        setSamtykke(Status.LasterInn);
        setSamtykke(await hentSamtykke(aktørId));
    };

    useEffect(() => {
        if (kandidat.status !== Status.Suksess) return;

        hentOgSettArbeidssøker(kandidat.data.aktørId);
        hentOgSettSamtykke(kandidat.data.aktørId);
    }, [kandidat]);

    useEffect(() => {
        window.addEventListener(visDetaljerEvent, hentKandidatFraApi);
        return () => {
            window.removeEventListener(visDetaljerEvent, hentKandidatFraApi);
        };
    }, [hentKandidatFraApi]);

    const kandidatErIkkeRegistrert =
        (kandidat.status === Status.Feil && kandidat.statusKode === 404) ||
        kandidat.status === Status.Slettet;

    if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
        if (kandidat.status === Status.Suksess) {
            return <Endring kandidat={kandidat.data} />;
        } else if (kandidatErIkkeRegistrert) {
            return <Registrering fnr={fnr} />;
        }
    } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
        if (kandidat.status === Status.Suksess) {
            return (
                <Visning kandidat={kandidat.data} arbeidssøker={arbeidssøker} samtykke={samtykke} />
            );
        } else if (kandidatErIkkeRegistrert) {
            return <Introduksjon />;
        }
    }

    if (kandidat.status === Status.Feil) {
        return <Alert variant="error">Kunne ikke hente tilretteleggingsbehov</Alert>;
    }

    return null;
};

export default App;
