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
import { useCategoryDeleteMutation, useCategoryListQuery } from '../../../redux/services/categoryService';

import AleartMessage from '../../../utils/AleartMessage';
import CategoryCreateUpdate from './CategoryCreateUpdate';
import { useSubCategoryListQuery, useSubCategoryDeleteMutation } from '../../../redux/services/subCategory';
import SubCategoryCreateUpdateModal from '../subCategory/SubCreateUpdateModal';
import { useSelector } from 'react-redux';

// main component
const Categories = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });
    const [subCategoryDefaultValues, setSubCategoryDefaultValues] = useState({
        name: '',
        status: 'ACTIVE',
        categoryID: '',
    });

    const [modal, setModal] = useState(false);
    const [subCategoryModal, setSubCategoryModal] = useState(false);
    const [editData, setEditData] = useState(false);
    const [subCategoryEditData, setSubCategoryEditData] = useState(false);
    const storeID = useSelector(state => state.setting.activeStore._id)
    const [categoryDelete] = useCategoryDeleteMutation();
    const { data, isLoading, isError } = useCategoryListQuery(storeID, {
        skip: !storeID
    });
    const { data: subCategory, isLoading: loading, isError: error } = useSubCategoryListQuery(storeID, {
        skip: !storeID
    });
    const [subCategoryDelete] = useSubCategoryDeleteMutation();

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '', status: 'ACTIVE' });
        setModal(!modal);
    };
    const subCategoryShowModal = (id) => {
        setSubCategoryEditData(false);
        setSubCategoryDefaultValues({ name: '', status: 'ACTIVE', categoryID: id });
        setSubCategoryModal(true);
    };
    const toggle = (e) => {
        setModal(!modal);
    };
    const subCategoryModalToggle = () => {
        setSubCategoryModal(!subCategoryModal);
    };
    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            toggle();
            setEditData(row?.original);
            setDefaultValues(row?.original);
        };

        return (
            <>
                <i
                    className="mdi mdi-plus-circle me-2"
                    style={{ fontSize: '1.3rem' }}
                    onClick={() => subCategoryShowModal(row.original._id)}
                />

                <span role="button" className="action-icon text-warning" onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AleartMessage.Delete(row?.original._id, categoryDelete)}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };
    const SubCategoryActionColumn = ({ row }) => {
        return (
            <>
                {subCategory?.map((item) => {
                    const edit = () => {
                        setSubCategoryModal(true);
                        setSubCategoryEditData(item._id);
                        setSubCategoryDefaultValues(item);
                    };

                    if (item.categoryID === row.original._id) {
                        return (
                            <>
                                <span role="button" className="action-icon text-warning" onClick={edit}>
                                    <i className="mdi mdi-square-edit-outline"></i>
                                </span>

                                <span
                                    role="button"
                                    className="action-icon text-danger"
                                    onClick={() => AleartMessage.Delete(item._id, subCategoryDelete)}>
                                    <i className="mdi mdi-delete"></i>
                                </span>

                                <span>{item.name}</span>
                                <br />
                            </>
                        );
                    }
                })}
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
                Header: t('category name'),
                accessor: 'name',
                sort: true,
                Cell: ({ row }) => row.original.name,
                classes: 'table-user',
            },
            {
                Header: t('status'),
                accessor: 'status',
                sort: true,
                Cell: ({ row }) =>
                    row.original.status === 'ACTIVE' ? (
                        <div className="badge bg-success">{t('active')}</div>
                    ) : (
                        <div className="badge bg-danger">{t('inactive')}</div>
                    ),
                classes: 'table-user',
            },
            {
                Header: t('sub category'),
                accessor: '_id',
                sort: false,
                Cell: SubCategoryActionColumn,
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
        [subCategory]
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
                    breadCrumbItems={[{ label: t('category'), path: '/products/categories', active: true }]}
                    title={t('category')}
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
                    breadCrumbItems={[{ label: t('category'), path: '/products/categories', active: true }]}
                    title={t('category')}
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
                    breadCrumbItems={[{ label: t('category'), path: '/products/categories', active: true }]}
                    title={t('category')}
                />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add category')}
                                        </Button>
                                    </Col>

                                    <Col sm={7}>
                                        <div className="text-sm-end">
                                            <Button variant="success" className="mb-2 me-1">
                                                <i className="mdi mdi-cog"></i>
                                            </Button>

                                            <Button variant="light" className="mb-2 me-1">
                                                <BiImport />
                                                {t('import')}
                                            </Button>

                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'xls')}>
                                                <SiMicrosoftexcel />
                                                {t('export')}
                                            </Button>
                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'csv')}>
                                                <GrDocumentCsv /> {t('export')}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                <Table
                                    columns={columns}
                                    data={data}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={false}
                                    isSearchable={true}
                                    tableClass="table-striped"
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <CategoryCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
                <SubCategoryCreateUpdateModal
                    {...{
                        setSubCategoryModal,
                        subCategoryModal,
                        subCategoryModalToggle,
                        subCategoryEditData,
                        subCategoryDefaultValues,
                    }}
                />
            </>
        );
    }
};

export default Categories;