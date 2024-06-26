import { APP_NAME } from "../constants/config";

const localStorage = {
  setItem: (key, value) => {
    try {
      // console.log("setItem", key, value);
      console.log(value);
      return window.localStorage.setItem(
        `${APP_NAME}_${key}`,
        JSON.stringify(value),
      );
    } catch (error) {
      console.log("setItem error", error);
    }
  },
  getItem: (key) => {
    try {
      const item = JSON.parse(
        window.localStorage.getItem(`${APP_NAME}_${key}`),
      );
      console.log("getItem", key, item);
      return item;
    } catch (error) {
      console.log("getItem error", error);
    }
  },

  removeItem: (key) => {
    try {
      return window.localStorage.removeItem(`${APP_NAME}_${key}`);
    } catch (error) {
      console.log("removeItem error", error);
    }
  },
};

export default localStorage;
