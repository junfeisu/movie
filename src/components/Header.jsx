import React, { PureComponent } from 'react';
import { Balloon, Icon, Input } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router';
import { headerNavs } from '../navs';
import Logo from './Logo';

export default class Header extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { width, theme, isMobile, className, style, user, ...others } = this.props;

    return (
      <Layout.Header
        {...others}
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Input placeholder="搜索电影" />
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      {!isMobile ? nav.text : null}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          {
            user ?
              <Balloon
                trigger={
                  <div
                    className="ice-design-header-userpannel"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 12,
                    }}
                  >
                    <IceImg
                      height={40}
                      width={40}
                      src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                      className="user-avatar"
                    />
                    <div className="user-profile">
                      <span className="user-name" style={{ fontSize: '13px' }}>
                        {user.username}
                      </span>
                    </div>
                    <Icon
                      type="arrow-down-filling"
                      size="xxs"
                      className="icon-down"
                    />
                  </div>
                }
                closable={false}
                className="user-profile-menu"
              >
                <ul>
                  <li className="user-profile-menu-item">
                    <Link to="/user">
                      <FoundationSymbol type="person" size="small" />我的主页
                    </Link>
                  </li>
                  <li className="user-profile-menu-item">
                    <Link to="/user/pwd">
                      <FoundationSymbol type="repair" size="small" />更改密码
                    </Link>
                  </li>
                  <li className="user-profile-menu-item">
                    <Link to="/login">
                      <FoundationSymbol type="compass" size="small" />退出
                    </Link>
                  </li>
                </ul>
              </Balloon> :
              <Link to="/login">
                <div style={{ fontSize: 12, color: '#ffffff' }}>登录</div>
              </Link>
          }
        </div>
      </Layout.Header>
    );
  }
}
