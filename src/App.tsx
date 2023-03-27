import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { hentKandidat } from './api/api';
import { ikkeLastet, lasterInn, RestKandidat, Status } from './api/Rest';
import { visDetaljerEvent } from './utils/navigering';
import { BodyLong } from '@navikt/ds-react';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    const [_, setKandidat] = useState<RestKandidat>(ikkeLastet);

    const hentKandidatFraApi = useCallback(async () => {
        setKandidat(lasterInn);
        setKandidat(await hentKandidat(fnr));
    }, [fnr]);

    useEffect(() => {
        hentKandidatFraApi();
    }, [hentKandidatFraApi]);

    useEffect(() => {
        window.addEventListener(visDetaljerEvent, hentKandidatFraApi);
        return () => {
            window.removeEventListener(visDetaljerEvent, hentKandidatFraApi);
        };
    }, [hentKandidatFraApi]);

    return (
        <>
            <BodyLong spacing>
                Muligheten for å registrere tilretteleggingsbehov på kandidater har blitt fjernet.
            </BodyLong>
            <BodyLong>
                Dersom du har noen innspill om dette, kontakt oss via dette skjemaet: URL
            </BodyLong>
        </>
    );
    /*    const kandidatErIkkeRegistrert =
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
            return <Visning kandidat={kandidat.data} />;
        } else if (kandidatErIkkeRegistrert) {
            return <Introduksjon />;
        }
    }

    if (kandidat.status === Status.Feil) {
        return <Alert variant="error">Kunne ikke hente tilretteleggingsbehov</Alert>;
    }

    return null;
    */
};

export default App;
