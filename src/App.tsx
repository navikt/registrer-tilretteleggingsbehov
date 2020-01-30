import React, { FunctionComponent, useEffect, useState } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';
import { Normaltekst } from 'nav-frontend-typografi';
import { ikkeLastet, lasterInn, RestKandidat, Status } from './api/RestKandidat';
import { hentKandidat } from './api/api';
import Endring from './endring/Endring';
import Introduksjon from './introduksjon/Introduksjon';

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

    useEffect(() => {
        const hent = async () => {
            setKandidat(lasterInn);
            setKandidat(await hentKandidat(fnr));
        };
        hent();
    }, [fnr]);

    const kandidatErIkkeRegistrert =
        (kandidat.status === Status.Feil && kandidat.statusKode === 404) ||
        kandidat.status === Status.Slettet;

    const visKomponent = () => {
        if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return (
                    <Endring
                        kandidat={kandidat.data}
                        setEndretKandidat={setKandidat}
                        setSlettetKandidat={setKandidat}
                    />
                );
            } else if (kandidatErIkkeRegistrert) {
                return <Registrering fnr={fnr} setRegistrertKandidat={setKandidat} />;
            }
        } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
            if (kandidat.status === Status.Suksess) {
                return <Visning kandidat={kandidat.data} />;
            } else if (kandidatErIkkeRegistrert) {
                return <Introduksjon />;
            }
        }
    };

    return <Normaltekst tag="div">{visKomponent()}</Normaltekst>;
};

export default App;
