import {Icon, ListItemIcon, Menu, MenuItem, Snackbar, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import * as resume from '../../assets/resume.json';
import {Clipboard} from 'ts-clipboard';

function AppContact(props: { element: Element | null, onClose: () => any }) {
    const [menuElement, setMenuElement] = useState<Element | null>(props.element);

    const contact = resume.basics;
    const mailToUrl = `mailto:${contact.email}`;
    const [snackBarOpen, setSnackBarOpen] = useState(false);


    const userClosedContactMenu = () => props.onClose();
    const userClickedOnCopyEmail = () => {
        Clipboard.copy(contact.email);
        userClosedContactMenu();
        setSnackBarOpen(true);
    };

    const closeSnackBar = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };
    const twoSeconds = 2000;
    const snackBar = <Snackbar
        open={snackBarOpen}
        autoHideDuration={twoSeconds}
        message={`Copied \`${contact.email}\``}
        onClose={closeSnackBar}/>;

    useEffect(() => {
        setMenuElement(props.element);
    }, [props.element]);

    return <>
        <Menu anchorEl={menuElement} open={!!menuElement} onClose={userClosedContactMenu} id="contact-menu">
            <MenuItem onClick={userClickedOnCopyEmail}>
                <ListItemIcon>
                    <Icon>content_copy</Icon>
                </ListItemIcon>
                <Typography variant="inherit">Copy `ct5845@gmail.com`</Typography>
            </MenuItem>
            <a href={mailToUrl}>
                <MenuItem>
                    <ListItemIcon>
                        <Icon>launch</Icon>
                    </ListItemIcon>
                    <Typography variant="inherit">Email `ct5845@gmail.com`</Typography>
                </MenuItem>
            </a>
        </Menu>
        {snackBar}
    </>;
}

export default AppContact;
