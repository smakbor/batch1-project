import { useTranslation } from 'react-i18next';

const MENU_ITEMS = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'products',
            label: t('products'),
            isTitle: false,
            icon: 'dripicons-weight',
            children: [
                {
                    key: 'products',
                    label: t('products'),
                    url: '/products',
                    parentKey: 'products',
                },
                {
                    key: 'category',
                    label: t('category'),
                    url: '/products/categories',
                    parentKey: 'products',
                },
                {
                    key: 'unit',
                    label: t('unit'),
                    url: 'products/units',
                    parentKey: 'products',
                },
                {
                    key: 'manufacturer',
                    label: t('manufacturer'),
                    url: '/products/manufacturers',
                    parentKey: 'products',
                },
                {
                    key: 'warranty',
                    label: t('warranty'),
                    url: '/products/warranties',
                    parentKey: 'products',
                },
                {
                    key: 'stock',
                    label: t('stock'),
                    url: '/stock',
                    parentKey: 'products',
                },
            ],
        },
        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'suppliers',
            label: t('suppliers'),
            isTitle: false,
            icon: 'uil-briefcase',
            url: '/suppliers',
        },
        {
            key: 'customers',
            label: t('customers'),
            isTitle: false,
            icon: 'uil-users-alt',
            url: '/customers',
        },
        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'Expenditure',
            label: t('expenditure'),
            isTitle: false,
            icon: 'dripicons-weight',
            children: [
                {
                    key: 'costSection',
                    label: t('cost section'),
                    url: '/costSections',
                    parentKey: 'Expenditure',
                },
                {
                    key: 'expenditure',
                    label: t('expenditure'),
                    url: '/expenditure',
                    parentKey: 'Expenditure',
                },
            ],
        },
        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'Messages',
            label: t('message'),
            isTitle: false,
            icon: 'uil-comment-alt-dots',
            url: '/messages/inbox',
        },
        { key: 'permissions', label: 'permissions', isTitle: true },
        {
            key: 'permissions',
            label: t('permissions'),
            isTitle: false,
            icon: 'uil-shield-exclamation',
            children: [
                {
                    key: 'user-role',
                    label: t('user role'),
                    url: '/user-role',
                    parentKey: 'permissions',
                },
                {
                    key: 'permission',
                    label: t('permissions'),
                    url: '/permissions',
                    parentKey: 'permissions',
                },
            ],
        },
        { key: 'media', label: 'media', isTitle: true },
        {
            key: 'media',
            label: t('media'),
            isTitle: false,
            icon: 'dripicons-photo',
            children: [
                {
                    key: 'media',
                    label: t('media'),
                    url: '/media',
                    parentKey: 'media',
                },
                {
                    key: 'upload',
                    label: t('upload'),
                    url: '/media/upload',
                    parentKey: 'media',
                },
            ],
        },
        { key: 'settings', label: 'settings', isTitle: true },
        {
            key: 'settings',
            label: t('settings'),
            isTitle: false,
            icon: 'dripicons-gear',
            children: [
                {
                    key: 'user',
                    label: t('users'),
                    url: '/users',
                    parentKey: 'settings',
                },
                {
                    key: 'ui',
                    label: t('ui'),
                    url: '/settings/ui',
                    parentKey: 'settings',
                },
            ],
        },
    ];
};

export default MENU_ITEMS;
