import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';
import { Tilbakemeldingstatus, Status } from '../api/RestKandidat';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './GiTilbakemelding.less';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';

const GiTilbakemelding: FunctionComponent = () => {
    const [tilbakemelding, setTilbakemelding] = useState<string>('');
    const [status, setStatus] = useState<Tilbakemeldingstatus>(Status.IkkeLastet);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [harTrykketSend, setHarTrykketSend] = useState<boolean>(false);

    const onTilbakemeldingChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.target.value;

        setTilbakemelding(input);

        if (harTrykketSend) {
            validerTilbakemelding(input);
        }
    };

    const validerTilbakemelding = (tilbakemelding: string): boolean => {
        if (tilbakemelding.length === 0) {
            setFeilmelding('Vennligst fyll ut feltet.');
            return false;
        } else if (tilbakemelding.length < 10) {
            setFeilmelding('Forslaget er for kort.');
            return false;
        }

        setFeilmelding(null);
        return true;
    };

    const validerOgSendForslag = () => {
        setHarTrykketSend(true);

        if (validerTilbakemelding(tilbakemelding)) {
            setStatus(Status.LasterInn);
            console.warn('Sender inn tilbakemelding:', tilbakemelding);
        }
    };

    return (
        <Ekspanderbartpanel
            border
            tittel="Savner du et alternativ?"
            tittelProps="element"
            className="gi-tilbakemelding blokk-m"
        >
            {status !== Status.Suksess ? (
                <>
                    <Normaltekst className="blokk-s">
                        Send oss et forslag. Forslaget blir kun brukt til videreutvikling av
                        verktøyet.
                    </Normaltekst>
                    <Textarea
                        label="Forslag"
                        feil={feilmelding}
                        value={tilbakemelding}
                        onChange={onTilbakemeldingChange}
                    />
                    <Knapp
                        mini
                        className="gi-tilbakemelding__sendknapp"
                        htmlType="button"
                        disabled={Boolean(feilmelding)}
                        onClick={validerOgSendForslag}
                        spinner={status === Status.LasterInn}
                    >
                        Send forslag
                    </Knapp>
                </>
            ) : (
                <AlertStripeSuksess>Takk for din tilbakemelding!</AlertStripeSuksess>
            )}
        </Ekspanderbartpanel>
    );
};

export default GiTilbakemelding;
