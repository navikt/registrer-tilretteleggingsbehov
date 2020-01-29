import React, { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    erÅpen: boolean;
    fnr: string;
    lukk: () => void;
}

const SlettModal: FunctionComponent<Props> = ({ erÅpen, fnr, lukk }) => {
    return null;
    // const [sletterKandidat, toggleSletterKandidat] = useState<boolean>(false);
    //
    // const slettKandidatOgLukk = async () => {};
    //
    // return (
    //     <Modal
    //         className={cls.block}
    //         closeButton
    //         isOpen={erÅpen}
    //         onRequestClose={lukk}
    //         contentLabel="Slett kandidat"
    //     >
    //         <Element className={cls.element('tekst')}>
    //             Er du sikker på at du vil slette tilretteleggingsbehovene til denne kandidaten?
    //         </Element>
    //         <div className={cls.element('knapper')}>
    //             <Hovedknapp spinner={sletterKandidat} onClick={slettKandidatOgLukk}>
    //                 Slett
    //             </Hovedknapp>
    //             <Knapp onClick={lukk}>Avbryt</Knapp>
    //         </div>
    //         {feilmelding && (
    //             <AlertStripeFeil className={cls.element('feilmelding')}>
    //                 {feilmelding}
    //             </AlertStripeFeil>
    //         )}
    //     </Modal>
    // );
};

export default SlettModal;
