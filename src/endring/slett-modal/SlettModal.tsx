import React, { FunctionComponent, useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestKandidat, Status, ikkeLastet } from '../../api/Rest';
import { slettKandidat } from '../../api/api';
import { navigerTilVisningsside } from '../../utils/navigering';
import './SlettModal.less';

interface Props {
    erÅpen: boolean;
    fnr: string;
    lukk: () => void;
}

const SlettModal: FunctionComponent<Props> = ({ erÅpen, fnr, lukk }) => {
    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);

    useEffect(() => {
        if (respons.status === Status.Slettet) {
            navigerTilVisningsside();
            lukk();
        }
    }, [respons, lukk]);

    const slettKandidatOgLukk = async () => {
        const responsFraSletting: RestKandidat = await slettKandidat(fnr);
        setRespons(responsFraSletting);
    };

    return (
        <Modal
            isOpen={erÅpen}
            onRequestClose={lukk}
            closeButton={true}
            contentLabel="Slett behov for tilrettelegging"
            className="slett-modal"
        >
            <Systemtittel className="blokk-s">Slett behov for tilrettelegging</Systemtittel>
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
