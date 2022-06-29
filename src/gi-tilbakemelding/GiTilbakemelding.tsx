import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { Accordion, Alert, BodyShort, Button, Textarea } from '@navikt/ds-react';
import { sendTilbakemelding } from '../api/api';
import { Status, Tilbakemeldingstatus } from '../api/Rest';
import css from './GiTilbakemelding.module.css';

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

    const validerOgSendForslag = async (event: FormEvent) => {
        event.preventDefault();

        setHarTrykketSend(true);

        if (validerTilbakemelding(tilbakemelding)) {
            setStatus(Status.LasterInn);
            setStatus(await sendTilbakemelding(tilbakemelding));
        }
    };

    const visTilbakemeldingsboks = status === Status.IkkeLastet || status === Status.LasterInn;

    return (
        <Accordion className={css.giTilbakemelding}>
            <Accordion.Item>
                <Accordion.Header>Savner du et alternativ?</Accordion.Header>
                <Accordion.Content>
                    {visTilbakemeldingsboks && (
                        <form onSubmit={validerOgSendForslag}>
                            <BodyShort className={css.beskrivelse}>
                                Send oss et forslag. Forslaget blir kun brukt til videreutvikling av
                                verktøyet.
                            </BodyShort>
                            <Textarea
                                label="Forslag"
                                error={feilmelding}
                                value={tilbakemelding}
                                onChange={onTilbakemeldingChange}
                            />
                            <Button loading={status === Status.LasterInn}>Send forslag</Button>
                        </form>
                    )}

                    {status === Status.Suksess && (
                        <Alert variant="success">Takk for din tilbakemelding!</Alert>
                    )}

                    {status === Status.Feil && (
                        <Alert variant="error">
                            Det skjedde en feil, vennligst prøv igjen senere.
                        </Alert>
                    )}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default GiTilbakemelding;
