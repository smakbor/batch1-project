//External Lib Import
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import

import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../mappedComponent/MappedComponent';
import { MobileRegx } from '../../../helpers/FormValidation';
//api services
import { useCustomerCreateMutation, useCustomerUpdateMutation } from '../../../redux/services/customerService';

const CustomerCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    //store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [customerCreate, { isLoading, isSuccess, error }] = useCustomerCreateMutation();

    const [customerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCustomerUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter  name')).min(3, t('minimum containing 3 letter')),
            customerType: yup.string().required(t('please select customer type')),
            mobile: yup.string().required(t('enter mobile number')).matches(MobileRegx, t('enter valid number')),

            ledgerNumber: yup.string().required(t('please select ledger number')),
            email: yup.string().email('please valid email'),
            reference: yup.object().shape({
                name: yup.string(),
                address: yup.string(),
                nid: yup.string(),
                relation: yup.string(),
            }),
        })
    );

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    // handle input field

    const inputData = [
        {
            label: t('customer type'),
            type: 'react-select',
            name: 'customerType',
            placeholder: t('please enter customer type'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            options: [
                { label: 'please select customer type', value: '' },
                { label: 'retail', value: 'RETAIL' },
                { label: 'wholesale', value: 'WHOLESALE' },
            ],
        },

        {
            label: t(' name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },

        {
            label: t('mobile'),
            type: 'text',
            name: 'mobile',
            placeholder: t('please enter mobile number'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('father name'),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter father name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('email'),
            type: 'email',
            name: 'email',
            placeholder: t('please enter email'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('nid'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('address'),
            type: 'text',
            name: 'address',
            placeholder: t('please enter address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },

        {
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter previous due'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('ledger number'),
            type: 'text',
            name: 'ledgerNumber',
            placeholder: t('please enter ledger number'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('remarks'),
            type: 'text',
            name: 'remarks',
            placeholder: t('please enter remarks'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('thana'),
            type: 'text',
            name: 'thana',
            placeholder: t('please enter thana'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('district'),
            type: 'text',
            name: 'district',
            placeholder: t('please enter district'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('country'),
            type: 'text',
            name: 'country',
            placeholder: t('please enter country'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('reference name'),
            type: 'text',
            name: 'reference.name',
            placeholder: t('please enter reference name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference mobile'),
            type: 'text',
            name: 'reference.mobile',
            placeholder: t('please enter reference mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference address'),
            type: 'text',
            name: 'reference.address',
            placeholder: t('please enter reference address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference nid'),
            type: 'text',
            name: 'reference.nid',
            placeholder: t('please enter reference nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },

        {
            label: t('reference relation'),
            type: 'text',
            name: 'reference.relation',
            placeholder: t('please enter reference relation'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
    ];

    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        formData.store = store;
        formData.due = Number(formData.due);
        if (!editData) {
            customerCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            customerUpdate(removeEmptyObj(updatedData));
        }
    };

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update customer') : t('add customer')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <MappedComponent
                            inputField={inputData}
                            onSubmit={onSubmit}
                            defaultValues={defaultValues}
                            schemaResolver={schemaResolver}
                            isLoading={isLoading}
                            updateLoad={updateLoad}
                            editData={editData}
                            updateTitle={t('update customer')}
                            createTitle={t('add customer')}
                            error={error?.data}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default CustomerCreateUpdateModal;
