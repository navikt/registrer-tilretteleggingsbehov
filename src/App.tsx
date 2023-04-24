import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { hentKandidat } from './api/api';
import { ikkeLastet, lasterInn, RestKandidat, Status } from './api/Rest';
import { visDetaljerEvent } from './utils/navigering';
import Visning from './visning/Visning';
import { Alert, BodyLong } from '@navikt/ds-react';

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

    const kandidatErIkkeRegistrert =
        (kandidat.status === Status.Feil && kandidat.statusKode === 404) ||
        kandidat.status === Status.Slettet;

    const informasjonOmAvviklingAvTilretteleggingsbehov = (
        <BodyLong>
            Her skal vi skrive inn informasjon som forklarer hvorfor vi avvikler alt dette her!
        </BodyLong>
    );

    if (viewType === Visningstype.VisTilretteleggingsbehov) {
        if (kandidat.status === Status.Suksess) {
            return (
                <>
                    <Visning kandidat={kandidat.data} />
                    {informasjonOmAvviklingAvTilretteleggingsbehov}
                </>
            );
        } else if (kandidatErIkkeRegistrert) {
            return informasjonOmAvviklingAvTilretteleggingsbehov;
        }
    }

    if (kandidat.status === Status.Feil) {
        return <Alert variant="error">Kunne ikke hente tilretteleggingsbehov</Alert>;
    }

    return null;
};

export default App;
