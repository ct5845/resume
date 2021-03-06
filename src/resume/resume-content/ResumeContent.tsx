import './ResumeContent.scss';
import usePageSpacing from '../../common/spacing/usePageSpacing';
import {Box, Typography, useMediaQuery} from '@material-ui/core';
import {CTMedia} from '../../common/media/media-queries';
import React from 'react';
import { useParams } from 'react-router-dom';

function ResumeContent(props: {
    id?: string
    title?: string,
    children: JSX.Element[] | JSX.Element
}) {
    const media = CTMedia.is(useMediaQuery);

    const { section } = useParams<{ section: string }>();
    const padding = usePageSpacing();
    const hideHeader = (!media.medium || !props.title) && !media.print;

    return <Box
        component="div"
        // @ts-ignore
        ref={ el => {
            if(media.large && !media.print) {
                if (!!el && !!section && !!props.id && section === props.id) {
                    el.scrollIntoView();
                } else if (!!el && !section && !props.id) {
                    el.scrollIntoView();
                }
            }
        }}
        className="ResumeContent"
        p={padding}>
        {!hideHeader && <Typography variant="h2">{props.title}</Typography>}
        {props.children}
    </Box>;
}

export default ResumeContent;
