// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

// components
import AccountLayout from './AccountLayout';

// images
import logoutIcon from '../../assets/images/logout-icon.svg';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Back to ')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Logout = () => {
    const { t } = useTranslation();
    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />} className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 col-md-8">
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('See You Again !')}</h4>
                    <p className="text-muted mb-4">{t('You are now successfully sign out.')}</p>
                    <div className="logout-icon m-auto">
                        <img src={logoutIcon} alt="" />
                    </div>
                </div>
            </AccountLayout>
        </>
    );
};

export default Logout;