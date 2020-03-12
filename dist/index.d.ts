import "oj-event";
export default class FontLoader {
    private static loaded;
    static isLoaded(name: string): boolean;
    static loadCustomFont(name: string, url: string, i?: number): Promise<string>;
    private static renderOnBody;
    static loadCustomFonts(families: {
        name: string;
        url: string;
    }[]): Promise<string[]>;
    static loadGoogleFont(name: string, weights?: number[]): Promise<string>;
    static loadGoogleFonts(families: {
        name: string;
        weights?: number[];
    }[]): Promise<string[][]>;
}
