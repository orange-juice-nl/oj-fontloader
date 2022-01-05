export declare const isFontLoaded: (name: string) => boolean;
export declare const getFontUrl: (name: string, weights?: number[]) => string;
export declare const loadFont: (name: string, weights?: number[]) => Promise<void>;
export declare const loadFonts: (families: {
    name: string;
    weights?: number[];
}[]) => Promise<void[]>;
