import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { sendTilbakemelding } from '../api/api';
import { Status, Tilbakemeldingstatus } from '../api/Rest';
import './GiTilbakemelding.less';

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
        } else if (tilbakemelding.length < 3) {
            setFeilmelding('Forslaget er for kort.');
            return false;
        }

        setFeilmelding(null);
        return true;
    };

    const validerOgSendForslag = async () => {
        setHarTrykketSend(true);

        if (validerTilbakemelding(tilbakemelding)) {
            setStatus(Status.LasterInn);
            setStatus(await sendTilbakemelding(tilbakemelding));
        }
    };

    const visTilbakemeldingsboks = status === Status.IkkeLastet || status === Status.LasterInn;

    return (
        <Ekspanderbartpanel
            border
            tittel={<Element>Savner du et alternativ?</Element>}
            className="gi-tilbakemelding blokk-m"
        >
            {visTilbakemeldingsboks && (
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
                        onClick={validerOgSendForslag}
                        spinner={status === Status.LasterInn}
                    >
                        Send forslag
                    </Knapp>
                </>
            )}

            {status === Status.Suksess && (
                <AlertStripeSuksess>Takk for din tilbakemelding!</AlertStripeSuksess>
            )}

            {status === Status.Feil && (
                <AlertStripeFeil>Det skjedde en feil, vennligst prøv igjen senere.</AlertStripeFeil>
            )}
        </Ekspanderbartpanel>
    );
};

export default GiTilbakemelding;
