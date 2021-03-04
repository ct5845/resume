import React, {useEffect, useState} from 'react';
import './ResumeHome.scss';
import ResumeHeader from '../resume-header/ResumeHeader';
import ResumeNavigation from '../resume-navigation/ResumeNavigation';
import {Box, useMediaQuery} from '@material-ui/core';
import usePageSpacing from '../../common/spacing/usePageSpacing';
import {CTMedia} from '../../common/media/media-queries';
import useResizeObserver from '@react-hook/resize-observer';

function ResumeHome(props: { children?: JSX.Element | JSX.Element[] }) {
    const maxPageSize = 800;

    const [sectionWidth, setSectionWidth] = useState<number | undefined>(undefined);
    const [navWidth, setNavWidth] = useState<number | undefined>(undefined);
    const [pageLeftPadding, setPageLeftPadding] = useState<number>(0);
    const [pageRightPadding, setPageRightPadding] = useState<number>(0);

    const navPadding = usePageSpacing();
    const mediaIsMedium = CTMedia.isMedium(useMediaQuery);

    const sectionRef = React.createRef<HTMLDivElement>();
    useResizeObserver(sectionRef, (entry) => setSectionWidth(entry.borderBoxSize[0].inlineSize));

    const navRef = React.createRef<HTMLDivElement>();
    useResizeObserver(navRef, (entry) => setNavWidth(entry.borderBoxSize[0].inlineSize));

    useEffect(() => {
        if (!sectionWidth || sectionWidth <= maxPageSize) {
            setPageLeftPadding(0);
        } else {
            const pageBorderPadding = -1 * (maxPageSize - sectionWidth) / 2;

            if (!!navWidth && pageBorderPadding >= navWidth) {
                setPageLeftPadding(pageBorderPadding - navWidth);
            } else {
                setPageLeftPadding(pageBorderPadding);
            }
            setPageRightPadding(pageBorderPadding);
        }

    }, [sectionWidth, navWidth]);

    return <section ref={sectionRef} className="ResumeHome">
        <ResumeHeader/>
        <Box style={{paddingLeft: `${pageLeftPadding}px`}} className="ResumeHome_Page">
            <Box px={navPadding}
                // @ts-ignore
                 ref={navRef}
                 py={mediaIsMedium ? navPadding : 0}
                 color="grey.300"
                 borderRight={mediaIsMedium ? 1 : 0}
                 className="ResumeHome_Navigation">
                <ResumeNavigation/>
            </Box>
            {props.children &&
            <div style={{ paddingRight: `${pageRightPadding}px`}} className="ResumeHome_Content">
                {props.children}
            </div>
            }
        </Box>
    </section>;
}

export default ResumeHome;
