const Endpoint = {
  REFRESH_TOKEN: "/v1/auth/refresh-token",
  LOGIN: "/v1/auth/login",
  REJECT_NEW_ROLE_REQUEST: (requestId) =>
    "/v1/admin/approval/roles/" + requestId,
  APPROVE_NEW_ROLE_REQUEST: (requestId) =>
    "/v1/admin/approval/roles/" + requestId,
  GET_NEW_ROLE_REQUEST: "/v1/admin/approval/roles",

  GET_CATEGORIES: "/v1/product-categories",
  ADD_CATEGORIES: "/v1/product-categories",
  DELETE_CATEGORIES: (categoryId) => "/v1/product-categories/" + categoryId,
  IMAGE_UPLOAD_API_OPTIONS: "/v1/product-categories/image-upload-api-options",

  GET_VOUCHERS: "/v1/vouchers",
  ADD_VOUCHER: "/v1/vouchers",
};

export default Endpoint;
