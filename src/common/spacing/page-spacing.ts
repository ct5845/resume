import {CTMedia} from '../media/media-queries';

export default function pageSpacing(mq: (query: string, opts: any) => boolean) {
    if (CTMedia.isPrint(mq)) {
        return 0;
    }
    return CTMedia.isSmall(mq) ? 3 : 2;
}
