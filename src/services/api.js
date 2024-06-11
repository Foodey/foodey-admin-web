import { privateRequest } from "../utils/request";
import Endpoint from "../endpoints";

export const approveNewRoleRequest = async (requestId) => {
  try {
    await privateRequest.post(Endpoint.APPROVE_NEW_ROLE_REQUEST(requestId));
  } catch (error) {
    console.error("There was an error approving the role request!", error);
    throw error;
  }
};

export const rejectNewRoleRequest = async (requestId) => {
  // Add this function
  try {
    await privateRequest.delete(Endpoint.REJECT_NEW_ROLE_REQUEST(requestId));
  } catch (error) {
    console.error("There was an error rejecting the role request!", error);
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
    const response = await privateRequest.get(Endpoint.GET_NEW_ROLE_REQUEST, {
      params: {
        page,
        size,
        sort,
        direction,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the new role requests!", error);
    throw error;
  }
};

export const getProductCategories = async (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
) => {
  const response = await privateRequest.get(Endpoint.GET_CATEGORIES, {
    params: {
      page,
      size,
      sort,
      direction,
    },
  });
  console.log("response", response.data);
  return response.data;
};

export const addProductCategory = async (category) => {
  const response = await privateRequest.post(Endpoint.ADD_CATEGORIES, category);
  return response.data;
};

export const deleteProductCategory = async (categoryId) => {
  const response = await privateRequest.delete(
    Endpoint.DELETE_CATEGORIES(categoryId),
  );
  return response.data;
};
