//External Lib Import
import React, { useMemo, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import exportFromJson from '../../../utils/exportFromJson';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';

//api services
// import { useCategoryDeleteMutation, useCategoryListQuery } from '../../../redux/services/categoryService';

import AleartMessage from '../../../utils/AleartMessage';

import { useSelector } from 'react-redux';
import { useBrandDeleteMutation, useBrandListQuery } from '../../../redux/services/brandService';
import BrandCreateUpdate from './BrandCreateUpdate';


// main component
const Brand = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });

    const [modal, setModal] = useState(false);

    const [editData, setEditData] = useState(false);

    const [brandDelete] = useBrandDeleteMutation();
    const { data, isLoading, isError } = useBrandListQuery();
    //     storeID, {
    //     skip: !storeID,
    // }

    /**
     * Show/hide the modal
     */
    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '', status: 'ACTIVE' });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            setEditData(row?.original);
            setDefaultValues(row?.original);
            toggle();
        };
        return (
            <>
                <i
                    className="mdi mdi-plus-circle me-2 text-info"
                    style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                    // onClick={}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('add Brand')}
                />

                <span
                    role="button"
                    className="action-icon text-warning"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('edit Brand')}
                    onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AleartMessage.Delete(row?.original._id, brandDelete)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('delete brand')}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // get all columns
    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'sl',
                sort: true,
                Cell: ({ row }) => row.index + 1,
                classes: 'table-user',
            },

            {
                Header: t('Brand Name'),
                accessor: 'name',
                sort: true,
                Cell: ({ row }) => row.original.name,
                classes: 'table-user',
            },
            {
                Header: t('Brand'),
                accessor: 'note',
                sort: true,
                Cell: ({ row }) => row.original.note,
                classes: 'table-user',
            },
           
            
            // {
            //     Header: t('status'),
            //     accessor: 'status',
            //     sort: true,
            //     Cell: ({ row }) =>
            //         row.original.status === 'ACTIVE' ? (
            //             <div className="badge badge-success-lighten">{t('active')}</div>
            //         ) : (
            //             <div className="badge badge-danger-lighten">{t('inactive')}</div>
            //         ),
            //     classes: 'table-user',
            // },

            {
                Header: t('action'),
                accessor: 'action',
                sort: false,
                classes: 'table-action',
                Cell: ActionColumn,
            },
        ],
        []
    );

    // get pagelist to display
    const sizePerPageList = [
        {
            text: t('5'),
            value: 5,
        },
        {
            text: t('10'),
            value: 10,
        },
        {
            text: t('50'),
            value: 50,
        },
    ];

    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('brand'), path: '/products/brand', active: true }]}
                    title={t('brand')}
                />
                <Card>
                    <Card.Body>
                        <LoadingData />
                    </Card.Body>
                </Card>
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('brand'), path: '/products/brand', active: true }]}
                    title={t('brand')}
                />
                <Card>
                    <Card.Body>
                        <ErrorDataLoad />
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('brand'), path: '/products/brand', active: true }]}
                    title={t('brand')}
                />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Table
                                    columns={columns}
                                    data={data || []}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={false}
                                    isSearchable={true}
                                    tableClass="table-striped"
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    addShowModal={addShowModal}
                                    tableInfo={{ tableName: 'brand' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <BrandCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Brand;
