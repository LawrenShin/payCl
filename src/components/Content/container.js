import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { appStarted, setProject } from '@client/store/app';
import View from './view';

export default connect(
    state => ({
        loading: state.app.loading,
        pathname: state.router.location.pathname,
        selectedProject: (
            state.app.project > 0
                ? state.dictionary.projects.find(({ id }) => id === state.app.project)
                : null
        ),
        projects: state.dictionary.projects.filter(({ locale }) => locale !== null),
    }),
    {
        appStarted,
        setProject,
        push,
    },
)(View);
