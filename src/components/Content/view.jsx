import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import {
    Icon,
    Layout,
    Menu,
    Spin,
    Divider,
    Dropdown,
    Button,
} from 'antd';
import {
    Home,
    PaymentInfo,
    PayoutInfo,
    Payments,
    Payouts,
} from '@client/app/pages';
import { Authentication } from '@client/widgets';
import {
    Theme,
    LogOutButton,
} from '@client/components';
import {
    GlobalStyles,
    Wrapper,
    Page,
    SpinWrapper,
    ProjectSelector,
    ProjectName,
} from './styled';

const { Sider } = Layout;

class Content extends React.Component {
    componentDidMount() {
        const { appStarted } = this.props;

        appStarted();
    }

    onSelectProject = ({ key }) => {
        const { setProject } = this.props;

        setProject(parseInt(key, 10));
    };

    onSelectLink = ({ key }) => {
        this.props.push(key);
    };

    render() {
        const {
            loading,
            projects,
            selectedProject,
            pathname,
        } = this.props;

        if (loading) {
            return (
                <Wrapper>
                    <SpinWrapper>
                        <Spin size="large" />
                    </SpinWrapper>
                    <Authentication />
                </Wrapper>
            );
        }

        const selectedProjectName = selectedProject
            ? <ProjectName>{selectedProject.name}</ProjectName>
            : <ProjectName>Проект</ProjectName>;

        const menu = (
            <Menu onClick={this.onSelectProject}>
                {projects.map(({ id, name }) => (
                    <Menu.Item key={id} disabled={selectedProject && (id === selectedProject.id)}>
                        {name}
                    </Menu.Item>
                ))}
            </Menu>
        );

        return (
            <Theme>
                <Layout>
                    <Wrapper>
                        <Sider
                            theme="light"
                            breakpoint="lg"
                            collapsedWidth={80}
                            width={200}
                        >
                            <ProjectSelector>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        {selectedProjectName}
                                        <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </ProjectSelector>
                            <Divider />
                            <Menu
                                mode="inline"
                                theme="light"
                                onSelect={this.onSelectLink}
                                selectedKeys={[pathname]}
                                style={{ borderRight: 0 }}
                            >
                                <Menu.Item key="/">
                                    <Icon type="home" />
                                    <span>На главную</span>
                                </Menu.Item>
                                <Menu.ItemGroup
                                    title={(
                                        <span>
                                            <span>Заявки</span>
                                        </span>
                                    )}
                                >
                                    <Menu.Item key="/payments">
                                        <Icon type="import" />
                                        <span>Ввод</span>
                                    </Menu.Item>
                                    <Menu.Item key="/payouts">
                                        <Icon type="export" />
                                        <span>Вывод</span>
                                    </Menu.Item>
                                    <Menu.Item key="/projects">
                                        <Icon type="project" />
                                        <span>Проекты</span>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </Menu>
                            <LogOutButton />
                        </Sider>
                        <Page>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/payments" component={Payments} />
                                <Route
                                    path={['/payments/:id/:section', '/payments/:id']}
                                    component={PaymentInfo}
                                />
                                <Route exact path="/payouts" component={Payouts} />
                                <Route
                                    path={['/payouts/:id/:section', '/payouts/:id']}
                                    component={PayoutInfo}
                                />
                            </Switch>
                        </Page>
                        <Authentication />
                        <GlobalStyles />
                    </Wrapper>
                </Layout>
            </Theme>
        );
    }
}

Content.propTypes = {
    loading: PropTypes.bool.isRequired,
    selectedProject: PropTypes.shape(),
    projects: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    pathname: PropTypes.string.isRequired,
    appStarted: PropTypes.func.isRequired,
    setProject: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
};

Content.defaultProps = {
    selectedProject: null,
};

export default Content;
