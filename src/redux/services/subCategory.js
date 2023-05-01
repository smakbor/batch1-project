//internal lib import
import { object } from 'joi';
import { apiService } from '../api/apiService';

export const subCategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategories: builder.query({
            query: () => ({
                url: `categories/subcategories`,
                method: 'GET',
            }),
        }),
        subCategoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `categories/subcategories`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getSubCategories', undefined, (draft) => {
                            draft.data.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        subCategoryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `categories/subcategories/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                console.log(postBody);
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiService.util.updateQueryData('getSubCategories', undefined, (draft) => {
                            const findIndex = draft.data.findIndex((item) => item._id === id);
                            draft.data[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        subCategoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/subcategories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getSubCategories', undefined, (draft) => {
                        draft.data = draft.data.filter((item) => item._id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
    }),
});
export const {
    useGetSubCategoriesQuery,
    useSubCategoryCreateMutation,
    useSubCategoryUpdateMutation,
    useSubCategoryDeleteMutation,
} = subCategoryService;
