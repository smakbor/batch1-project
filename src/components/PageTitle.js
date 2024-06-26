// @flow
import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type BreadcrumbItems = {
    label: string,
    path: string,
    active?: boolean,
};

type PageTitleProps = {
    breadCrumbItems: Array<BreadcrumbItems>,
    title: string,
};

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps): React$Element<any> => {
    const { t } = useTranslation()
    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item href="/dashboard">{t('hisab nikash')}</Breadcrumb.Item>

                            {props.breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} href={item.path}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h3 className="ps-2 fw-bold pt-3">{props.title}</h3>
                </div>
            </Col>
        </Row>
    );
};

export default PageTitle;
