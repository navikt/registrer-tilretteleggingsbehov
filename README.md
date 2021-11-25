# Registrer tilretteleggingsbehov

Frontend for å vise og endre tilretteleggingsbehov til oppfølgingsbrukere (alias kandidater, dvs. arbeidsssøkere).

Dette er en microfrontend-app som inngår i arbeidsflaten Aktivitetsplanen (alias "Arbeidsrettet oppfølging"? alias "Modia"?) som eies av Produktområde arbeidsoppfølging (POAO). Container-applikasjonen er [Veilarbmaofs](https://github.com/navikt/veilarbmaofs), en tjeneste for veiledere.

Appen er ikke en del av arbeidsflaten/systemet Rekrutteringsbistand, men det er mulig å navigere til den ved å starte fra Rekrutteringsbistand og følge en lenke derfra.


# Hvordan se appen i dev/testmiljø
## Opprette testbruker for innlogging

Du trenger en testbruker (en Nav-veileder) med de riktige rettighetene. Opprettelse og admin av testbruker gjør du i systemet [IDA](https://ida.nais.adeo.no/).
Som vanlig er det litt usikkert hvilke rettigheter som er strengt tatt nødvendige, men Are sin testbruker per novemger 2021 har ihvertfall følgende:

IDAs arkfane "AD grupper":
- 0000-GA-BD06_ModiaGenerellTilgang
- 0000-GA-GOSYS_NASJONAL
- 0000-GA-Modia-Oppfolging

IDAs arkfane "Axsys":
- Enhet 0106 Fredrikstad
- Fagområder "GEN" og "OPA"

Brukernavnet til denne testbrukeren ved innlogging i Rekrutteringsbistand eller Aktivitetsplanen vil være `f<ident>.e_<ident>@trygdeetaten.no

OBS: Det er en del caching på disse rollene. F.eks. i Aktivitesplanen tror jeg det er 1 times cache, så det er ikke så lette å “leke” seg med tilgangene for å finne ut av hva som fungerer eller ikke

Mer detaljer finnes i dokumentasjonen til PO arbeidsoppfølging: [Confluence > Produktteam Oppfølging ATA > Kvalitet og test > Testmiljø og adresser](https://confluence.adeo.no/pages/viewpage.action?pageId=395312875)


## Se appen

Hvis du har et fødselsnummer til en kandidat for hånden kan du gå direkte til https://app-q1.adeo.no/veilarbpersonflatefs/ i [Citrix](https://mobapps.nav.no) eller i utviklerimage (alias VDI).

Ellers kan du først gå inn i [Rekrutteringsbistand](https://rekrutteringsbistand.nais.preprod.local/), finne en kandidat, og inne i visningen av kandidatens jobbønsker og CV klikke på lenken "Se aktivitetsplan".

Inne i Aktivitetsplanen, velg "Detaljer". Du skal få se en liste med ekspanderbare linjer, hvorav en av dem heter "Behov for tilrettelegging. Den er vår microfrontend. Ekspander den for å se våre tilretteleggingsbehovdata for den aktuelle kandidaten.


# Hvordan se appen i prod

## Nødvendige roller/tilganger
Tilganger bestilles per epost på nav.it.identhandtering@nav.no

Are måtte få rollen "Systemforvalter" for å kunne se Aktivitetsplanen.

I tillegg har Are følgende roller, men vet ikke hvilke som strengt tatt er nødvendige:
- Modia Generell
- Modia Endre navn
- Modia Oppfølging
- Modia Oppgavestyring
- 0000-GA-GOSYS_NASJONAL
- 0000-GA-GOSYS_OPPGAVE_BEHANDLER
- 0000-GA-GOSYS_SENSITIVT
- 0000-GA-GOSYS_LESE_INN_DOKUMENTER


## Mac

Samme som for Windows?


## Linux
Per november 2021 er det ikke mulig å se Aktivitetsplanen fra Linux

## Windows

1. Bruk nettleseren Google Chrome eller Microsoft Edge. Firefox er ikke støttet per høsten 2021.
2. Gå til https://mobapps.nav.no for å komme inn i Citrix
3. Det burde funke å starte "Chrome SKSS", men det funker ikke for Are per november 2021. Workaround: Start Confluence. Et nytt Citrix nettleservindu med Cofluence skal åpne seg.
4. I nettleserens adressefelt, skriv inn URL-en til Rekrutteringsbistand: https://rekrutteringsbistand.nais.adeo.no. Du skal komme til Rekrutteringsbistand.
5. Inne i Rekrutteringsbistand, velg en kandidat. Inne i oversikten over kandidatens jobbønsker og CV, klikk lenken "Se aktivitetsplan". Det skal åpne seg en ny nettleserarkfane med Aktivitetsplan/Arbeidsrettet oppfølging.
6. Inne i Aktivitetsplanen, velg "Detaljer". Du skal få se en liste med ekspanderbare linjer, hvorav en av dem heter "Behov for tilrettelegging. Den er vår microfrontend. Ekspander den for å se våre tilretteleggingsbehovdata for den aktuelle kandidaten.


# Henvendelser

## For Nav-ansatte
* Dette Git-repositoriet eies av [Team tiltak og inkludering (TOI) i Produktområde arbeidsgiver](https://teamkatalog.nais.adeo.no/team/0150fd7c-df30-43ee-944e-b152d74c64d6).
* Slack-kanaler:
  * [#arbeidsgiver-toi-dev](https://nav-it.slack.com/archives/C02HTU8DBSR)
  * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)

## For folk utenfor Nav
* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/toi
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)
