//Internal Lib Import
import { apiService } from '../api/apiService';
export const categoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        categoryList: builder.query({
            query: (storeID) => ({
                url: `category/allCategory`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        categoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `category/create`,
                method: 'POST',   body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('categoryList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        categoryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `category/update/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('categoryList', store, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                        })
                    );
                });
            },
        }),
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `category/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('categoryList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);
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
export const { useCategoryListQuery, useCategoryDeleteMutation, useCategoryCreateMutation, useCategoryUpdateMutation } =
    categoryService;
