import {MediaBreakpoints} from '../../app/app-themes/MediaBreakpoints';

function simpleQuery(mq: (query: string, opts: any) => boolean, breakpoint: number, minOrMax = 'min') {
    return mq(`(${minOrMax}-width:${breakpoint}px)`, {noSsr: true});
}

export class CTMedia {
    static is(mq: (query: string, opts: any) => boolean) {
        return {
            tiny: CTMedia.isTiny(mq),
            small: CTMedia.isSmall(mq),
            medium: CTMedia.isMedium(mq),
            large: CTMedia.isLarge(mq),
            highDef: CTMedia.isHighDef(mq),
            print: CTMedia.isPrint(mq)
        };
    }

    static isTiny(mq: (query: string, opts: any) => boolean) {
        return simpleQuery(mq, MediaBreakpoints.Small, 'max');
    }

    static isSmall(mq: (query: string, opts: any) => boolean) {
        return simpleQuery(mq, MediaBreakpoints.Small);
    }

    static isMedium(mq: (query: string, opts: any) => boolean) {
        return simpleQuery(mq, MediaBreakpoints.Medium);
    }

    static isLarge(mq: (query: string, opts: any) => boolean) {
        return simpleQuery(mq, MediaBreakpoints.Large);
    }

    static isHighDef(mq: (query: string, opts: any) => boolean) {
        return simpleQuery(mq, MediaBreakpoints.HighDef);
    }

    static isPrint(mq: (query: string, opts: any) => boolean) {
        return mq(`print`, {noSsr: true});
    }
}
