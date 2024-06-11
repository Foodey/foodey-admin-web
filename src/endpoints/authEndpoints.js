const AuthEndpoint = {
  REFRESH_TOKEN: "/v1/api/auth/refresh-token",
  LOGIN: "/v1/auth/login",
  APPROVE_NEW_ROLE_REQUEST: (requestId) =>
    "/v1/admin/approval/roles/" + requestId,
  GET_NEW_ROLE_REQUEST: "/v1/admin/approval/roles",
};

export default AuthEndpoint;
