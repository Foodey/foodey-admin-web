import { privateRequest } from "../utils/request";
import AuthEndpoint from "../endpoints/authEndpoints";

export const approveNewRoleRequest = async (requestId) => {
  try {
    await privateRequest.post(AuthEndpoint.APPROVE_NEW_ROLE_REQUEST(requestId));
  } catch (error) {
    console.error("There was an error approving the role request!", error);
    throw error;
  }
};

export const getNewRoleRequests = async (
  page = 0,
  size = 12,
  sort = "createdAt",
  direction = "ASC",
) => {
  try {
    const response = await privateRequest.get(
      AuthEndpoint.GET_NEW_ROLE_REQUEST,
      {
        params: {
          page,
          size,
          sort,
          direction,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the new role requests!", error);
    throw error;
  }
};
