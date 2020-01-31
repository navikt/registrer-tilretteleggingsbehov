import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';
import { Normaltekst } from 'nav-frontend-typografi';
import { ikkeLastet, lasterInn, RestKandidat, Status, Jobbprofilstatus } from './api/RestKandidat';
import { hentKandidat } from './api/api';
import Endring from './endring/Endring';
import Introduksjon from './introduksjon/Introduksjon';
import { visDetaljerEvent } from './utils/navigering';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Kandidat } from './api/Kandidat';
import { hentJobbprofilstatus } from './api/jobbprofilApi';
import './App.less';

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
    const [jobbprofilstatus, setJobbprofilstatus] = useState<Jobbprofilstatus>(Status.IkkeLastet);

    const hentKandidatFraApi = useCallback(async () => {
        setKandidat(lasterInn);
        setKandidat(await hentKandidat(fnr));
    }, [fnr]);

    const hentJobbprofil = async (kandidat: Kandidat) => {
        setJobbprofilstatus(Status.LasterInn);
        setJobbprofilstatus(await hentJobbprofilstatus(kandidat.aktørId));
    };

    useEffect(() => {
        hentKandidatFraApi();
    }, [hentKandidatFraApi]);

    useEffect(() => {
        if (kandidat.status === Status.Suksess) {
            hentJobbprofil(kandidat.data);
        }
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

    const visKomponent = () => {
        if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return <Endring kandidat={kandidat.data} />;
            } else if (kandidatErIkkeRegistrert) {
                return <Registrering fnr={fnr} />;
            }
        } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return <Visning kandidat={kandidat.data} jobbprofilstatus={jobbprofilstatus} />;
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
