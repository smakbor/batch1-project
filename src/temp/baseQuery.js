//External Lib Import
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import ToastMessage from '../../helpers/ToastMessage';
import { userLogin, userLogout } from '../features/authReducer';
import { setLoading } from '../features/settingReducer';

const basefetchBaseQuery = () => {
    const baseQuery = fetchBaseQuery({
        baseUrl: `http://10.0.0.91:5000/api/v1/`,
        prepareHeaders: (headers, { getState }) => {
            const {
                setting: { language },
                auth: { accessToken, refreshToken },
            } = getState();
            headers.set('authorization', accessToken ? `Bearer ${accessToken}` : '');
            headers.set('accept-language', language);
            return headers;
        },
    });
    return async (args, api, extraOptions) => {
        api.dispatch(setLoading(true));
        const { error, data } = await baseQuery(args, api, extraOptions);
        if (error) {
            api.dispatch(setLoading(false));
            if (error.status === 401) {
                const refreshToken = api?.getState()?.authReducer?.refreshToken;
                if (refreshToken) {
                    const refreshResult = await baseQuery(`/auth/refreshTokens/${refreshToken}`, api, extraOptions);

                    if (refreshResult?.data) {
                        api.dispatch(userLogin(refreshResult?.data));
                    } else {
                        api.dispatch(userLogout());
                        ToastMessage.errorMessage(error.data?.message);
                    }
                }
            } else if (error.status === 404) {
                ToastMessage.errorMessage(error.data?.message);
            } else if (error.status === 400) {
                ToastMessage.errorMessage(error.data?.message);
            } else {
                ToastMessage.errorMessage('Sorry, Something went wrong');
            }
            return { error: { status: error.status, data: error.data } };
        }

        if (data) {
            api.dispatch(setLoading(false));
            if (data?.message) {
                ToastMessage.successMessage(data?.message);
                delete data.message;
            }
            return { data };
        }
    };
};

export default basefetchBaseQuery;
