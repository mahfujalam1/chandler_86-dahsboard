import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

// ─── Node Tree API ─────────────────────────────────────────────────────────────
// Injected into baseApi following the same pattern as authApi.js

const nodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /nodes/tree → full nested tree
    // Response: { success, statusCode, data: { id:"root", children:[...] } }
    getNodeTree: builder.query({
      query: () => ({
        url: "/nodes/tree",
        method: "GET",
      }),
      providesTags: [tagTypes.nodeTree],
    }),
    getSingleNode: builder.query({
      query: (id) => ({
        url: `/nodes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.nodeTree],
    }),

    // POST /nodes → create any node (BODY_PART / SERGERY / PRODUCT)
    // Body: { title, type, parent_id? }
    // ⚠️ For PRODUCT: call this first to get node id,
    //    then call createProductInfo with that node id
    createNode: builder.mutation({
      query: (data) => ({
        url: "/nodes",
        method: "POST",
        body: data,
      }),
      // For BODY_PART / SERGERY → invalidates immediately
      // For PRODUCT → do NOT rely on this; invalidation happens via createProductInfo
      invalidatesTags: [tagTypes.nodeTree],
    }),

    // POST /nodes/product-info → upload product files after createNode
    // Body: FormData { product_node_id, description?, brochure_file?, video_file?, banner_image? }
    // product_node_id = id returned from createNode response
    createProductInfo: builder.mutation({
      query: (formData) => ({
        url: "/nodes/product-info",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.nodeTree],
    }),

    // PATCH /nodes/:id → update node title (BODY_PART / SERGERY / PRODUCT)
    // Body: { title, type }
    // id = node id (same for all types)
    updateNode: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/nodes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.nodeTree],
    }),

    // PATCH /nodes/product-info/:id → update product files / description
    // Body: FormData { description?, brochure_file?, video_file?, banner_image? }
    // ⚠️ id = PRODUCT INFO id — returned from createProductInfo response
    //    This is DIFFERENT from the node id
    updateProductInfo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/nodes/product-info/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.nodeTree],
    }),

    // DELETE /nodes/:id → delete any node (cascades to all children)
    // id = node id
    deleteNode: builder.mutation({
      query: (id) => ({
        url: `/nodes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.nodeTree],
    }),
  }),
});

export const {
  useGetNodeTreeQuery,
  useCreateNodeMutation,
  useCreateProductInfoMutation,
  useUpdateNodeMutation,
  useUpdateProductInfoMutation,
  useDeleteNodeMutation,
  useGetSingleNodeQuery,
} = nodeApi;
