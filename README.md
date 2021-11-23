# Registrer tilretteleggingsbehov

Microfrontend for å vise og endre tilretteleggingsbehov til oppfølgingsbrukere.

Injiseres i [Veilarbmaofs](https://github.com/navikt/veilarbmaofs), en tjeneste for veiledere.

# Hvordan se appen i prod
Appen er ikke en del av arbeidsflaten Rekrutteringsbistand, den er en microfrontend som inngår arbeidsflaten Aktivitetsplanen (alias "Arbeidsrettet oppfølging"? alias "Modia"?) som eies av Produktområde arbeidsoppfølgign (POAO). Men det er mulig å navigere dit ved å starte fra Rekrutteringsbistand.

## Nødvendige roller/tilganger
Tilganger bestilles per epost på nav.it.identhandtering@nav.no

Are måtte få rollen "Systemforvalter" for å kunne se Aktivitetsplanen.

I tillegg har Are følgende roller, men vet ikke hvilke som egentlig er nødvendig:
- Modia Generell
- Modia Endre navn
- Modia Oppfølging
- Modia Oppgavestyring


## Mac

## Linux
Per november 2021 er det ikke mulig å se Aktivitetsplanen fra Linux

## Windows

1. Bruk nettleseren Google Chrome eller Microsoft Edge. Firefox er ikke støttet per høsten 2021.
2. Gå til https://mobapps.nav.no for å komme inn i Citrix
3. Det burde funke å starte "Chrome SKSS", men det funker ikke for Are per november 2021. Workaround: Start Confluence. Et nytt Citrix nettleservindu med Cofluence skal åpne seg.
4. I nettleserens adressefelt, skriv inn URL-en til Rekrutteringsbistand: https://rekrutteringsbistand.nais.adeo.no. Du skal komme til Rekrutteringsbistand.
5. Inne i Rekrutteringsbistand, velg en tilfeldig kandidat. Inne i oversikten over kandidatens jobbønsker og CV, klikk lenken "Se aktivitetsplan". Det skal åpne seg en ny nettleserarkfane med Aktivitetsplan/Arbeidsrettet oppfølging.
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
