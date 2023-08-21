import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const toastMessage = (message, type, option = {}) => {
  const defaultOption = {
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
  };

  const toastOption = isObjectEmpty(option) == false ? option : defaultOption;

  const promiseMessage = {
    pending: "Please wait",
    success: "Login Successfully 👌",
    error: "Incorrect Credentials 🤯",
    status: "success",
  };

  if (
    type != "success" &&
    type != "warn" &&
    type != "error" &&
    type != "info" &&
    type != "promise"
  ) {
    toast.warn(
      `Incorrect type value, Type should be either success, warn, error or info An error occurred.`,
      toastOption
    );
  }
  if (type == "success") {
    toast.success(message, toastOption);
  }
  if (type == "warn") {
    toast.warn(message, toastOption);
  }
  if (type == "error") {
    toast.error(message, toastOption);
  }
  if (type == "info") {
    toast.info(message, toastOption);
  }

  if (type == "promise") {
    const resolveAfter3Sec = new Promise((resolve, reject) => {
      // setTimeout(() => {
      if (!message.status) {
          console.log("in")
          resolve("Promise resolved successfully");
      } else {
        console.log("in err");
          reject(new Error("Promise rejected with an error"));
        }
      // }, 3000);
    });

    toast.promise(resolveAfter3Sec, {
      pending: message.pending ? message.pending : promiseMessage.pending,
      success: message.success ? message.success : promiseMessage.success,
      error: message.error ? message.error : promiseMessage.error,
    });
  }
};

export default { toastMessage };
