import React from 'react';
import ResumeHome from './resume-home/ResumeHome';
import ResumePrint from './resume-print/ResumePrint';
import AppFooter from '../app/app-footer/AppFooter';
import AppHeader from '../app/app-header/AppHeader';
import ResumePersonalStatement from './resume-personal-statement/ResumePersonalStatement';
import ResumeSkills from './resume-skills/ResumeSkills';
import ResumeWork from './resume-work/ResumeWork';
import ResumeEducation from './resume-education/ResumeEducation';
import ResumeProjects from './resume-projects/ResumeProjects';
import ResumeInterests from './resume-interests/ResumeInterests';
import ResumeContent from './resume-content/ResumeContent';
import {useMediaQuery} from '@material-ui/core';
import {CTMedia} from '../common/media/media-queries';
import ResumeTimeline from './resume-timeline/ResumeTimeline';

export const routes = [
    {
        path: '/print',
        component: ResumePrint,
        header: null
    },
    {
        path: '/summary',
        component: () => <ResumeContent title="Summary">
            <ResumePersonalStatement/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Summary"/>,
        footer: () => <AppFooter next={{route: '/skills', label: 'Skills'}}/>
    },
    {
        path: '/skills',
        component: () => <ResumeContent title="Skills">
            <ResumeSkills/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Skills"/>,
        footer: () => <AppFooter next={{route: '/work', label: 'Work'}}/>
    },
    {
        path: '/work',
        exact: true,
        component: () => <ResumeContent title="Work History">
            <ResumeWork/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Work History"/>,
        footer: () => <AppFooter next={{route: '/education', label: 'Education'}}/>
    },
    {
        path: '/education',
        component: () => <ResumeContent title="Education">
            <ResumeEducation/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Education"/>,
        footer: () => <AppFooter next={{route: '/projects', label: 'Projects'}}/>
    },
    {
        path: '/projects',
        component: () => <ResumeContent title="Projects">
            <ResumeProjects/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Projects"/>,
        footer: () => <AppFooter next={{route: '/interests', label: 'Interests'}}/>
    },
    {
        path: '/interests',
        component: () => <ResumeContent title="Interests">
            <ResumeInterests/>
        </ResumeContent>,
        header: () => <AppHeader pageTitle="Interests"/>,
        footer: () => <AppFooter next={{route: '/summary', label: 'Summary'}}/>
    },
    {
        path: '/',
        exact: true,
        component: () => {
            const mediaIsMediumDef = CTMedia.isMedium(useMediaQuery);

            return mediaIsMediumDef ?
                    <ResumeTimeline/> :
                    <ResumeHome/>;
        },
        header: () => <AppHeader/>,
        footer: () => <AppFooter next={{route: '/summary', label: 'Summary'}}/>
    },
];
