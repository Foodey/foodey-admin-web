const Endpoint = {
  REFRESH_TOKEN: "/v1/api/auth/refresh-token",
  LOGIN: "/v1/auth/login",
  REJECT_NEW_ROLE_REQUEST: (requestId) =>
    "/v1/admin/approval/roles/" + requestId,
  APPROVE_NEW_ROLE_REQUEST: (requestId) =>
    "/v1/admin/approval/roles/" + requestId,
  GET_NEW_ROLE_REQUEST: "/v1/admin/approval/roles",

  GET_CATEGORIES: "/v1/product-categories",
  ADD_CATEGORIES: "/v1/product-categories",
  DELETE_CATEGORIES: (categoryId) => "/v1/product-categories/" + categoryId,
};

export default Endpoint;