import ResumePersonalStatement from '../resume-personal-statement/ResumePersonalStatement';
import ResumeSkills from '../resume-skills/ResumeSkills';
import ResumeWork from '../resume-work/ResumeWork';
import ResumeEducation from '../resume-education/ResumeEducation';
import ResumeProjects from '../resume-projects/ResumeProjects';
import ResumeInterests from '../resume-interests/ResumeInterests';
import React from 'react';
import ResumeContent from '../resume-content/ResumeContent';

function ResumeAll() {
    return <>
        <ResumeContent id='summary' title="Summary">
            <ResumePersonalStatement/>
        </ResumeContent>
        <ResumeContent id='skills' title="Skills">
            <ResumeSkills/>
        </ResumeContent>
        <ResumeContent id='work' title="Work History">
            <ResumeWork/>
        </ResumeContent>
        <ResumeContent id='education' title="Education">
            <ResumeEducation/>
        </ResumeContent>
        <ResumeContent id='projects' title="Projects">
            <ResumeProjects/>
        </ResumeContent>
        <ResumeContent id='interests' title="Interests">
            <ResumeInterests/>
        </ResumeContent>
    </>;
}

export default ResumeAll;
