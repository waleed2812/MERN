const errors = [
  {
    msgCode: "UNHANDLED",
    message: "unexpected error.",
  },
  {
    msgCode: "NOTFOUND",
    message: "404 Not Found",
    status: 404,
  },
  {
    msgCode: "INVALID_PASSWORD",
    message: "Invalid password.",
    data: {
      errors: {
        password: "Invalid password.",
      },
    },
  },
  {
    msgCode: "USER_NOTFOUND",
    message: "User not found.",
    data: {
      errors: {
        email: "User not found.",
      },
    },
  },
  {
    msgCode: "EMAIL_REQUIRED",
    message: "Email is required.",
    data: {
      errors: {
        email: "Email is required.",
      },
    },
  },
  {
    msgCode: "PASSWORD_REQUIRED",
    message: "Password is required.",
    data: {
      errors: {
        password: "Password is required.",
      },
    },
  },
  {
    msgCode: "UNAUTHENTICATED",
    message: "User is not logged in.",
  },
  {
    msgCode: "UNAUTHORIZED",
    message: "User is not authorized to access this.",
  },
  {
    msgCode: "UPDATE",
    message: "Failed to update.",
  },
  {
    msgCode: "CREATE",
    message: "Failed to create.",
  },
  {
    msgCode: "DELETE",
    message: "Failed to delete.",
  },
  {
    msgCode: "UPDATE_NOTHING",
    message: "Nothing to update.",
  },
  {
    msgCode: "UNVERIFIED",
    message: "Email is not verified.",
    data: {
      errors: {
        email: "Email is not verified.",
      },
    },
  },
  {
    msgCode: "INVALID_IMAGE",
    message: "Invalid image file provided.",
  },
];

module.exports = errors;