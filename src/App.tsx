import React, { FunctionComponent } from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    return (
        <div style={{ maxWidth: '40rem', margin: '1rem 0 0 2rem' }}>
            <Heading level="3" size="medium" spacing>
                Mulighet for å registrere og søke opp personer med tilretteleggingsbehov fjernes
            </Heading>

            <BodyLong spacing>
                Hei! 👋 Vi i teamet bak rekrutteringsbistand jobber kontinuerlig for å skape bedre
                digitale løsninger, og følger med på hva som fungerer og hva som ikke fungerer.
            </BodyLong>

            <BodyLong spacing>
                De siste månedene har vi sett at muligheten for å registrere tilrettelegginsbehov
                brukes ganske lite: ~40 ganger i uken. Filtervalget for å finne kandidater med
                tilretteleggingsbehov har blitt brukt enda mindre: ~6 ganger i uken.
            </BodyLong>

            <BodyLong spacing>
                Dette er problematisk, fordi det kan skape negativ verdi. Det er tre problemer. Det
                ene er at det sannsynligvis burde vært en langt større andel jobbsøkere som burde
                hatt dette registrert, og disse blir ikke funnet ved bruk av filtrering i
                kandidatsøket for «behov for tilrettelegging».
            </BodyLong>

            <BodyLong spacing>
                Det andre er at vi ikke stole på at status fortsatt gjelder, siden det kan ha blitt
                satt for lenge siden samtidig som at personen sin situasjon kan ha endret seg slik
                at personen ikke har behov for tilrettelegging lenger.
            </BodyLong>

            <BodyLong spacing>
                Det siste gjelder at denne funksjonen har en stor teknisk driftskostnad å
                opprettholde, og vi må alltid velge å prioritere det som gir størst verdi først. Det
                betyr også å fjerne noe som ikke fungerer etter intensjonen.
            </BodyLong>

            <BodyLong spacing>
                Hva gjorde vi? Vi kjørte et eksperiment. Vi tok vekk funksjonen, og spurte om
                hvordan dere holder oversikt over tilretteleggingsbehov i dag.
            </BodyLong>

            <BodyLong spacing>
                48 av dere svarte, og vi lærte at måten behovene blir dokumentert på er ganske
                forskjellig fra veileder til veileder: - Noen bruker dagens løsning for
                registrering. - Noen husker behov i hodet. - Noen har det som notater, i dokumenter,
                eller i aktivitetsplanen.
            </BodyLong>

            <BodyLong spacing>
                Vi hørte også at flere opplevde at dagens måte å registrere på ikke var fleksibel
                nok i forhold til det brukerne trenger.
            </BodyLong>

            <BodyLong spacing>
                På grunn av dette ser vi at det er behov for å registrere tilretteleggingsbehov, men
                at det må løses på en bedre måte enn i dag.
            </BodyLong>

            <BodyLong spacing>
                Hvordan? Det ønsker vi undersøke videre i samarbeid med dere i tiden som kommer.
            </BodyLong>

            <BodyLong spacing>Hva betyr det for deg?</BodyLong>

            <BodyLong spacing>
                På kort sikt vil tilretteleggingsbehov som er registrert i Modia vises til og med
                31. mai 2023, og deretter fjernes.
            </BodyLong>

            <BodyLong spacing>
                Hvis du ønsker å beholde informasjonen, anbefaler vi at du går inn på brukerens
                detaljside i Modia, og kopierer denne informasjonen til et annet sted. For eksempel
                brukerens aktivitetsplan.
            </BodyLong>

            <BodyLong spacing>
                Tusen takk til alle som har gitt oss tilbakemeldinger, og meldt interesse for at vi
                tar kontakt.
            </BodyLong>
        </div>
    );
};

export default App;
