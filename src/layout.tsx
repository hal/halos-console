import {
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageToggleButton,
  SkipToContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { BarsIcon, BellIcon, CogIcon, HelpIcon, QuestionCircleIcon } from '@patternfly/react-icons';
import React, { FunctionComponent, ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logoPng from '~/assets/halos-logo.png';
import logoSvg from '~/assets/halos-logo.svg';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toolbarDropdownOpen, setToolbarDropdownOpen] = React.useState(false);

  const onToolbarDropdownToggle = () => {
    setToolbarDropdownOpen(!toolbarDropdownOpen);
  };

  const onToolbarDropdownSelect = () => {
    setToolbarDropdownOpen(false);
  };

  const dropdownItems = [
    <DropdownItem key='settings' onClick={() => navigate('nyi')}>
      <CogIcon /> Settings
    </DropdownItem>,
    <DropdownItem key='help' onClick={() => navigate('help')}>
      <HelpIcon /> Help
    </DropdownItem>,
  ];

  const headerToolbar = (
    <Toolbar id='toolbar' isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant='icon-button-group'
          alignment={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          <ToolbarItem>
            <Button aria-label='Notifications' variant={ButtonVariant.plain} icon={<BellIcon />} />
          </ToolbarItem>
          <ToolbarGroup variant='icon-button-group' visibility={{ default: 'hidden', md: 'visible', lg: 'visible' }}>
            <ToolbarItem>
              <Button
                aria-label='Settings'
                variant={ButtonVariant.plain}
                icon={<CogIcon />}
                onClick={() => navigate('nyi')}
              />
            </ToolbarItem>
            <ToolbarItem>
              <Button
                aria-label='Help'
                variant={ButtonVariant.plain}
                icon={<QuestionCircleIcon />}
                onClick={() => navigate('help')}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'visible', md: 'hidden', lg: 'hidden' }}>
            <Dropdown
              isPlain
              alignments={{ sm: 'right' }}
              isOpen={toolbarDropdownOpen}
              onSelect={onToolbarDropdownSelect}
              toggle={<KebabToggle id='toggle-kebab' onToggle={onToolbarDropdownToggle} />}
              dropdownItems={dropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton variant='plain' aria-label='Global navigation'>
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand onClick={() => navigate('/')}>
          <Brand src={logoPng} alt='halOs logo'>
            <source srcSet={logoSvg} />
          </Brand>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const pageNav = (
    <Nav>
      <NavList>
        <NavItem key={'services'} isActive={location.pathname === 'services'}>
          <NavLink to={'services'}>Services</NavLink>
        </NavItem>
        <NavItem key={'modelbrowser'} isActive={location.pathname == 'modelbrowser'}>
          <NavLink to={'modelbrowser'}>Model Browser</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );

  return (
    <Page
      header={masthead}
      sidebar={<PageSidebar nav={pageNav} />}
      isManagedSidebar
      skipToContent={<SkipToContent href={`#main-content`}>Skip to content</SkipToContent>}
      mainContainerId={'main-content'}
    >
      {children}
    </Page>
  );
};

export default Layout;
