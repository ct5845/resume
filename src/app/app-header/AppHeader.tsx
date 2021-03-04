import './AppHeader.scss';
import {Box, Button, ButtonBase, Icon, Paper, Toolbar, Typography, useMediaQuery} from '@material-ui/core';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {CTMedia} from '../../common/media/media-queries';
import AppContact from '../app-contact/app-contact';

function Print() {
    window.print();
}

function AppHeader(props: { pageTitle?: string }) {
    const isMedium = CTMedia.isMedium(useMediaQuery);
    const isPrint = CTMedia.isPrint(useMediaQuery);

    const [element, setElement] = useState<Element | null>(null);
    const userClickedOnContact = (event: React.MouseEvent) => setElement(event.currentTarget);
    const userClosedMenu = () => setElement(null);

    return <Box component="header" className="AppHeader">
        <Toolbar className="AppHeader_Toolbar">
            <Paper className="AppHeader_Paper">
                <ButtonBase
                    component={Link} to={'/'}
                    focusRipple>
                    <Box className="AppHeader_Box" bgcolor="primary.main" color="primary.contrastText">
                        <strong>CT</strong>
                    </Box>
                </ButtonBase>
            </Paper>
            {!!props.pageTitle && !isMedium && <Typography variant="h2">{props.pageTitle}</Typography>}
            <div className="AppHeader_spacer"/>
            { (isMedium && !isPrint) &&
            <>
                <Button onClick={Print} startIcon={<Icon>print</Icon>}>
                    Print
                </Button>
                <Button variant="contained"
                        color="secondary"
                        onClick={userClickedOnContact}
                        startIcon={<Icon>email</Icon>}>
                    Contact
                </Button>
                <AppContact element={element} onClose={userClosedMenu} />
            </>
            }
        </Toolbar>
    </Box>;
}

export default AppHeader;
