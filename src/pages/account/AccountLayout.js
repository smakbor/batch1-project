// @flow
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// images
import Logo from '../../assets/images/logo.png';

type AccountLayoutProps = {
    bottomLinks?: React$Element<any>,
    children?: any,
    className?: string,
};

const AccountLayout = ({ bottomLinks, children, className }: AccountLayoutProps): React$Element<any> => {
    const { t } = useTranslation();
    const { accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    return (
        <>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col className={className}>
                            <Card>
                                {/* logo */}
                                <Card.Header className="pt-4 pb-4 text-center bg-primary">
                                    <Link to={accessToken ? '/' : '/account/login'}>
                                        <span>
                                            <img src={Logo} alt="" height="18" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">{children}</Card.Body>
                            </Card>

                            {/* bottom links */}
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-alt">{t('2018 - 2021 © Hisab Nikash - Shunnoit.com')}</footer>
        </>
    );
};

export default AccountLayout;
