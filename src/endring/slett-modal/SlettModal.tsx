import React, { FunctionComponent, useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestKandidat, Status } from '../../api/RestKandidat';
import { slettKandidat } from '../../api/api';
import { navigerTilVisningsside } from '../../utils/navigering';
import './SlettModal.less';

interface Props {
    erÅpen: boolean;
    fnr: string;
    lukk: () => void;
}

const SlettModal: FunctionComponent<Props> = ({ erÅpen, fnr, lukk }) => {
    const [sletteStatus, setSletteStatus] = useState<Status>(Status.IkkeLastet);

    useEffect(() => {
        if (sletteStatus === Status.Slettet) {
            navigerTilVisningsside();
            lukk();
        }
    }, [sletteStatus, lukk]);

    const slettKandidatOgLukk = async () => {
        const respons: RestKandidat = await slettKandidat(fnr);
        setSletteStatus(respons.status);
    };

    return (
        <Modal
            isOpen={erÅpen}
            onRequestClose={lukk}
            closeButton={true}
            contentLabel="Slett tilretteleggingsbehov"
            className="slett-modal"
        >
            <Systemtittel className="blokk-s">Slett tilretteleggingsbehov</Systemtittel>
            <Normaltekst className="blokk-l">
                Er du sikker på at du vil slette tilretteleggingsbehovene til denne kandidaten?
            </Normaltekst>
            <div>
                <Hovedknapp className="slett-modal__slettknapp" onClick={slettKandidatOgLukk}>
                    Slett
                </Hovedknapp>
                <Knapp onClick={lukk}>Avbryt</Knapp>
            </div>
        </Modal>
    );
};

export default SlettModal;
