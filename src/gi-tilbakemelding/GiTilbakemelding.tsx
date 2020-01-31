import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';
import './GiTilbakemelding.less';
import { Tilbakemeldingstatus, Status } from '../api/RestKandidat';

const GiTilbakemelding: FunctionComponent = () => {
    const [erEkspandert, setEkspandert] = useState<boolean>(false);
    const [tilbakemelding, setTilbakemelding] = useState<string>('');
    const [status, setStatus] = useState<Tilbakemeldingstatus>(Status.IkkeLastet);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);

    const toggle = () => {
        setEkspandert(!erEkspandert);
    };

    const onTilbakemeldingChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTilbakemelding(event.target.value);
    };

    const sendForslag = () => {
        if (tilbakemelding.length === 0) {
            setFeilmelding('Vennligst fyll ut feltet.');
        } else if (tilbakemelding.length < 5) {
            setFeilmelding('Forslaget er for kort.');
        } else {
            setStatus(Status.LasterInn);
            console.warn('Sender inn tilbakemelding:', tilbakemelding);
        }
    };

    return (
        <div className="gi-tilbakemelding">
            {erEkspandert && (
                <>
                    <Undertittel className="blokk-xxs">Savner du et alternativ?</Undertittel>
                    <Normaltekst className="blokk-s">
                        Send oss et forslag. Forslaget blir kun brukt til videreutvikling av
                        verktøyet.
                    </Normaltekst>
                    <Textarea
                        label="Forslag"
                        textareaClass="gi-tilbakemelding__textarea blokk-s"
                        feil={feilmelding}
                        value={tilbakemelding}
                        onChange={onTilbakemeldingChange}
                    />
                    <Knapp
                        mini
                        htmlType="button"
                        className="blokk-s"
                        onClick={sendForslag}
                        spinner={status === Status.LasterInn}
                    >
                        Send forslag
                    </Knapp>
                </>
            )}
            <Flatknapp
                mini
                htmlType="button"
                className="gi-tilbakemelding__toggleknapp"
                onClick={toggle}
            >
                {erEkspandert ? 'Lukk' : 'Savner du et alternativ?'}
                <NavFrontendChevron type={erEkspandert ? 'opp' : 'ned'} />
            </Flatknapp>
        </div>
    );
};

export default GiTilbakemelding;
