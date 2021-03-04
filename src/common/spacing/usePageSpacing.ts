import {CTMedia} from '../media/media-queries';
import {useMediaQuery} from '@material-ui/core';
import useIsPrint from '../print/useIsPrint';
import {useEffect, useState} from 'react';

export default function usePageSpacing() {
    const [padding, setPadding] = useState(0);

    const media = CTMedia.is(useMediaQuery);
    const print = useIsPrint();

    useEffect(() => {
        const newPadding = (media.print || print) ? 0 : media.small ? 3 : 2;

        if (newPadding !== padding) {
            setPadding(newPadding);
        }
    }, [media.print, media.small, print, padding] );

    return padding;
}
