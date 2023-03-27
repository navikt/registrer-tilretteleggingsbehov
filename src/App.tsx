import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { hentKandidat } from './api/api';
import { ikkeLastet, lasterInn, RestKandidat } from './api/Rest';
import { visDetaljerEvent } from './utils/navigering';
import { BodyLong, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    const [, setKandidat] = useState<RestKandidat>(ikkeLastet);

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
                Vi tester å ta bort muligheten for å registrere tilretteleggingsbehov. Hva tenker om
                det?
            </BodyLong>
            <BodyLong>
                <Link target="_blank" rel="noreferrer" href="https://forms.office.com/e/1irdQKeKim">
                    Gi oss tilbakemelding om hvordan du jobber med tilrettelegging (Microsoft
                    forms).
                    <ExternalLink />
                </Link>
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
