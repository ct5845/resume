import useIsPrint from '../print/useIsPrint';
import {useEffect, useState} from 'react';
import {MediaBreakpoints} from '../../app/app-themes/MediaBreakpoints';
import {useMediaQuery} from '@material-ui/core';

function simpleQuery(mq: (query: string, opts: any) => boolean, breakpoint: number, minOrMax = 'min') {
    return mq(`(${minOrMax}-width:${breakpoint}px)`, {noSsr: true});
}

export type MediaQuery = {
    tiny?: boolean,
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    highDef?: boolean,
    print?: boolean
}

export function useMedia() {
    const [media, setMedia] = useState<MediaQuery>({});
    const print = useIsPrint();

    const isTiny = simpleQuery(useMediaQuery, MediaBreakpoints.Small, 'max');
    const isSmall = simpleQuery(useMediaQuery, MediaBreakpoints.Small);
    const isMedium = simpleQuery(useMediaQuery, MediaBreakpoints.Medium);
    const isLarge = simpleQuery(useMediaQuery, MediaBreakpoints.Large);
    const isHighDef = simpleQuery(useMediaQuery, MediaBreakpoints.HighDef);
    const isPrint = useMediaQuery('print', {noSsr: true});

    useEffect(() => {
        if (print || isPrint) {
            setMedia({print: true});
        } else {
            setMedia({
                tiny: isTiny,
                small: isSmall,
                medium: isMedium,
                large: isLarge,
                highDef: isHighDef
            });
        }
    }, [print, isTiny, isSmall, isMedium, isLarge, isHighDef, isPrint]);

    return media;
}
