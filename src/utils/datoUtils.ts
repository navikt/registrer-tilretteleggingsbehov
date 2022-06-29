enum Språk {
    Bokmål = 'nb-NO',
}

export const formaterDato = (dato: Date) =>
    dato.toLocaleDateString(Språk.Bokmål, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
