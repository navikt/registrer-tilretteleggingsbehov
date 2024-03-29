import React, { FunctionComponent, useEffect, useState } from 'react';
import { RestKandidat, Status, ikkeLastet } from '../../api/Rest';
import { slettKandidat } from '../../api/api';
import { navigerTilVisningsside } from '../../utils/navigering';
import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import css from './SlettModal.module.css';

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
        setRespons({
            status: Status.LasterInn,
        });

        const responsFraSletting: RestKandidat = await slettKandidat(fnr);
        setRespons(responsFraSletting);
    };

    return (
        <Modal closeButton open={erÅpen} onClose={lukk} className={css.slettModal}>
            <Modal.Content>
                <Heading level="1" size="medium">
                    Slett behov for tilrettelegging
                </Heading>
                <BodyLong className={css.tekst}>
                    Er du sikker på at du vil slette tilretteleggingsbehovene til denne kandidaten?
                </BodyLong>
                <div className={css.knapper}>
                    <Button
                        variant="primary"
                        onClick={slettKandidatOgLukk}
                        loading={respons.status === Status.LasterInn}
                    >
                        Slett
                    </Button>
                    <Button variant="secondary" onClick={lukk}>
                        Avbryt
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default SlettModal;
