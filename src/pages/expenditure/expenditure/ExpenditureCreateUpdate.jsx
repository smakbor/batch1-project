//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//internal lib import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import { useExpenditureCreateMutation, useExpenditureUpdateMutation } from '../../../redux/services/expenditureService';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues, costSectionData }) => {
    const { t } = useTranslation();
    const [expenditureCreate, { isLoading, isSuccess }] = useExpenditureCreateMutation();
    const [expenditureUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useExpenditureUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter expenditure')).min(2, t('minimum containing 2 letters')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;
        data.status = formData.status;

        if (!editData) {
            expenditureCreate(removeEmptyObj(data));
        } else {
            const postBody = removeEmptyObj(data);
            expenditureUpdate({ id: editData._id, postBody });
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="lg">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('edit expenditure') : t('add expenditure')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                name="select employee"
                                type="select"
                                label={t('employee')}
                                defaultValue="ACTIVE"
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </FormInput>
                            <FormInput
                                name="expenditureType"
                                type="select"
                                label={t('select expenditure')}
                                defaultValue="ACTIVE"
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                {costSectionData.data.map((item) => {
                                    return <option value={item.name}>{item.name}</option>;
                                })}
                                {/* <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option> */}
                            </FormInput>

                            <FormInput
                                label={t('amount')}
                                type="text"
                                name="amount"
                                placeholder={t('please enter amount')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                label={t('note')}
                                type="text"
                                name="note"
                                placeholder={t('please enter note')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update') : t('submit')}
                                    &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                </Button>
                            </div>
                        </VerticalForm>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ModalCreateUpdate;