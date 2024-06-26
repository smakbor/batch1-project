import React, { useMemo, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';

//api services
import AlertMessage from '../../utils/AleartMessage';
import SupplierCreateUpdate from '../../pages/people/SupplierCreateUpdate';

import { useSupplierListQuery, useSupplierDeleteMutation } from '../../redux/services/suppliersService';
function Supplier() {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({
        companyName: '',
        accountNumber: '',
        name: '',
        email: '',
        mobile: '',
        address: '',
        nid: '',
        prevDue: '',
    });

    const [modal, setModal] = useState(false);

    const [editData, setEditData] = useState(false);

    const [supplierDelete] = useSupplierDeleteMutation();
    const { data, isLoading, isError } = useSupplierListQuery();

    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '', status: 'ACTIVE' });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    const ActionColumn = ({ row }) => {
        const edit = () => {
            setEditData(row?.original);
            setDefaultValues(row?.original);
            toggle();
        };
        return (
            <>
                <span
                    role="button"
                    className="action-icon text-warning"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('edit suppliers data')}
                    onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AlertMessage.Delete(row?.original._id, supplierDelete)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('delete suppliers data')}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

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
                Header: t('Company Name'),
                accessor: 'companyName',
                Cell: ({ row }) => row.original.companyName,
                classes: 'table-user',
            },
            {
                Header: t('Suppliers Name'),
                accessor: 'name',
                sort: true,
                Cell: ({ row }) => row.original.name,
                classes: 'table-user',
            },
            {
                Header: t('Account No.'),
                accessor: 'accountNumber',
                Cell: ({ row }) => row.original.accountNumber,
                classes: 'table-user',
            },
            {
                Header: t('Email'),
                accessor: 'email',
                Cell: ({ row }) => row.original.email,
                classes: 'table-user',
            },
            {
                Header: t('Mobile'),
                accessor: 'mobile',
                Cell: ({ row }) => row.original.mobile,
                classes: 'table-user',
            },
            {
                Header: t('NID'),
                accessor: 'nid',
                Cell: ({ row }) => row.original.nid,
                classes: 'table-user',
            },
            {
                Header: t('Previous Due'),
                accessor: 'prevDue',
                Cell: ({ row }) => row.original.prevDue,
                classes: 'table-user',
            },
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('Suppliers')}
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('Suppliers')}
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('Suppliers')}
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
                                    tableInfo={{ tableName: 'Suppliers' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SupplierCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
}

export default Supplier;
