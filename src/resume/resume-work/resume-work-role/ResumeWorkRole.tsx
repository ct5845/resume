import React from 'react';
import List from '../../../common/list/List';
import './ResumeWorkRole.scss';
import {ResumeWorkHistoryRole} from '../ResumeWorkHistoryRole';
import Header3AndSecondaryText from '../../../common/header3-and-secondary-text/Header3AndSecondaryText';
import {Typography} from '@material-ui/core';

function ResumeWorkRoleHeader(role: ResumeWorkHistoryRole) {
    const endDate = role.endDate ?? 'Present';

    return <Header3AndSecondaryText
        date={`${role.startDate} - ${endDate}`}
        header={role.name}
    />;
}

function ResumeWorkRole(props: { role: ResumeWorkHistoryRole }) {
    return <section className="ResumeWorkRole">
        <List
            header={ResumeWorkRoleHeader(props.role)}
            items={props.role.achievements.map((achievement, index) =>
                <li key={index}>
                    <Typography>{achievement}</Typography>
                </li>
            )}
        />
    </section>;
}

export default ResumeWorkRole;
