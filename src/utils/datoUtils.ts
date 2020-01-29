enum Språk {
    Bokmål = 'nb-NO',
}

const sistEndretFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const formaterDato = (dato: Date) => dato.toLocaleDateString(Språk.Bokmål, sistEndretFormat);
