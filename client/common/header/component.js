import React from 'react';
import DVUtils from 'shared/utils';

import './style.less';

const Header = (props) => {
  return (
    <div className="page-header">
      <img className="logo" src="images/dv_logo.png" alt="Da Vinci" />
      <ul className="workspaces">
        {
          props.workspaces.map((workspace) => {
            return (
              <li
                className="workspace"
                data-selected={ window.location.pathname.indexOf(workspace.href) === 0 }
              >
                <a href={ workspace.href } title={ DVUtils.capitalizeFirstLetter(workspace.name) }>
                  { DVUtils.capitalizeFirstLetter(workspace.name) }
                </a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Header;
