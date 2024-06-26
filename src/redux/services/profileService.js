//Internal Lib Import
import { apiService } from '../api/apiService';

export const profileService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        profileDetails: builder.query({
            query: () => ({
                url: `v1/profile`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data,
        }),
    }),
});
export const { useProfileDetailsQuery } = profileService;
