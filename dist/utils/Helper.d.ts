export declare class Helper {
    static readonly ALPHABET_7BIT = "@\u00A3$\u00A5\u00E8\u00E9\u00F9\u00EC\u00F2\u00C7\n\u00D8\u00F8\r\u00C5\u00E5\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039E\u001B\u00C6\u00E6\u00DF\u00C9 !\"#\u00A4%&'()*+,-./0123456789:;<=>?\u00A1ABCDEFGHIJKLMNOPQRSTUVWXYZ\u00C4\u00D6\u00D1\u00DC`\u00BFabcdefghijklmnopqrstuvwxyz\u00E4\u00F6\u00F1\u00FC\u00E0";
    static readonly EXTENDED_TABLE = "````````````````````^```````````````````{}`````\\````````````[~]`|````````````````````````````````````\u20AC``````````````````````````";
    static readonly limitNormal = 140;
    static readonly limitCompress = 160;
    static readonly limitUnicode = 70;
    static ucfirst(str: string): string;
    static order(char: string): number;
    static char(order: number): string;
    static decode16Bit(text: string): string;
    static decode8Bit(text: string): string;
    static decode7Bit(text: string, inLen?: number, alignBits?: number): string;
    static encode8Bit(text: string): {
        length: number;
        result: string;
    };
    static encode7Bit(text: string, alignBits?: number): {
        length: number;
        result: string;
    };
    static encode16Bit(text: string): {
        length: number;
        result: string;
    };
    static toStringHex(number: number, fill?: number): string;
}
