export interface PowerStats {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
}

export interface Appearance {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
}

export interface Biography {
    fullName: string;
    alterEgos: string;
    aliases: string;
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}

export interface Work {
    occupation: string;
    base: string;
}

export interface Connections {
    groupAffiliation: string;
    relatives: string;
}

export interface Images {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

export interface Hero {
    id: number;
    name: string;
    slug?: string;
    powerStats?: PowerStats;
    apareance?: Appearance;
    biography?: Biography;
    work?: Work;
    connections?: Connections;
    images?: Images;
}

export interface HeroState {
    heroes: Hero[];
    selectedHero: Hero | null;
    searchValue: string;
    filteredHeroes: Hero[];
    isLoading: boolean;
}