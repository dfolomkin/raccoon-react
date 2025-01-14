import * as React from 'react';
import styled from 'styled-components';

import { COLORS } from 'src/commons/constants';

interface ChildrenProp {
  children: React.ReactNode;
}

const NavButtonInnerComponent = ({ children }: ChildrenProp): JSX.Element => (
  <div>{children}</div>
);

const NavButtonInner = styled(NavButtonInnerComponent)`
  position: relative;
  top: 0.2rem;
  width: 4.2rem;
  height: calc(100% - 0.4rem);
  background-color: ${COLORS.navbarButton};
  font-family: 'Trend Sans One';
  text-align: center;
  color: ${COLORS.navbar};
  cursor: pointer;
  @media (min-width: 480px) {
    font-size: 2.4rem;
    padding-top: 0.7rem;
  }
  @media (max-width: 479px) {
    font-size: 2.2rem;
    padding-top: 0.6rem;
  }
`;

const NavButtonComponent = ({ children }: ChildrenProp): JSX.Element => (
  <div>
    <NavButtonInner>{children}</NavButtonInner>
  </div>
);

export const NavButton = styled(NavButtonComponent)({});

export const NavDropdownButton = styled(NavButton)({});

// export const MenuButton = ({ children, isMenu }) => {
//   const wrapperClass = isMenu
//     ? classNames('navbar__button', 'navbar__button--menu')
//     : 'navbar__button'
//   return (
//     <div className={wrapperClass}>
//       <div className="navbar__button-inner">{children}</div>
//     </div>
//   )
// }
