import './AppFooter.scss';
import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction, Box, Icon} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AppContact from '../app-contact/app-contact';
import printPage from '../../common/print/printPage';

function AppFooter(props: {
                       next?: { label: string, route: string }
                   }
) {
    const [element, setElement] = useState<Element | null>(null);
    const userClickedOnContact = (event: React.MouseEvent) => setElement(event.currentTarget);
    const userClosedMenu = () => setElement(null);

    return <Box component="footer" className="AppFooter" borderTop={1} borderColor="grey.300">
        <BottomNavigation showLabels>
            <BottomNavigationAction
                component={Link}
                to={'/'}
                label="Home"
                icon={<Icon>home</Icon>}
            />
            <BottomNavigationAction
                label="Print"
                onClick={printPage}
                icon={<Icon>print</Icon>}
            />
            <BottomNavigationAction
                onClick={userClickedOnContact}
                label="Contact"
                icon={<Icon>email</Icon>}
            />
            {!!props.next &&
            <BottomNavigationAction
                component={Link}
                to={props.next.route}
                label={props.next.label}
                icon={<Icon>chevron_right</Icon>}
            />
            }
        </BottomNavigation>
        <AppContact element={element} onClose={userClosedMenu}/>
    </Box>;
}

export default AppFooter;
