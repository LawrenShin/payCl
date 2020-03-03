import React, {
    useMemo,
} from 'react';
import {
    Modal,
} from 'antd';
import { GAuthenticator, Password, OutdatedPassword } from './components';
import withData from './data';

const steps = {
    G_AUTH: 0,
    OTP: 1,
    OUTDATED_PASSWORD: 2,
};

const Auth = (props) => {
    const {
        visible,
        twoFactorVisible,
        codeVisible,
        passwordVisible,
    } = props;
    const step = useMemo(() => {
        if (twoFactorVisible) {
            return steps.G_AUTH;
        }

        if (codeVisible) {
            return steps.OTP;
        }

        if (passwordVisible) {
            return steps.OUTDATED_PASSWORD;
        }

        return -1;
    }, [twoFactorVisible, codeVisible, passwordVisible]);
    const modalWidth = useMemo(() => {
        if (passwordVisible) {
            return 300;
        }

        return 520;
    }, [twoFactorVisible, codeVisible, passwordVisible]);

    return (
        <Modal
            closable={false}
            footer={null}
            visible={visible}
            width={modalWidth}
        >
            {step === steps.G_AUTH && <GAuthenticator />}
            {step === steps.OTP && <Password />}
            {step === steps.OUTDATED_PASSWORD && <OutdatedPassword />}
        </Modal>
    );
};

export default withData(Auth);
