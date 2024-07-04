const Msg = {
  // Not Found
  USER_NOT_FOUND: "User not found.",
  RESOURCE_NOT_FOUND: "Resource not found.",
  USER_EMAIL_NOT_FOUND: "User with this email not found.",
  FORUM_NOT_FOUND: "Forum doesn't exist.",
  THREAD_NOT_FOUND: "Thread not found.",
  POST_NOT_FOUND: "Post not found.",
  ADMIN_NOT_FOUND: "Admin doesn't exist.",
  FORUM_NOT_FOUND: "Forum doesn't exist.",
  THREAD_NOT_FOUND: "Thread not found.",
  POST_NOT_FOUND: "Post not found.",
  ADMIN_NOT_FOUND: "Admin doesn't exist.",
  CATEGORY_NOT_FOUND: "Category doesn't exist.",

  // Error
  INTERNAL_SERVER_ERROR: "Internal server error.",
  USER_EXISTS: "User already exists.",
  USER_EMAIL_EXISTS: "User with this email already exists.",
  USER_PHONE_EXISTS: "User with this mobile number already exists.",
  ACCESS_DENIED: "Access denied.",
  PERMISSION_DENIED: "Permission denied.",
  ADMIN_NAME_EXIST: "Admin already exist with this name.",
  ADMIN_MAIL_EXIST: "Admin already exist with this email.",
  ADMIN_PHONE_EXIST: "Admin already exist with this phone number.",
  INVALID_FORUM_ID: "Forum id is invalid.",
  INVALID_ID: "Enter a valid Id.",
  FORUM_NAME_CANNOT_CHANGE: "Forum name cannot be changed once created.",
  FORUM_CREATOR_CANNOT_CHANGE: "Creator of the forum cannot be changed.",
  FORUM_NAME_EXIST: "Forum with the same name exist",
  CATEGORY_NAME_EXIST: "Category with the same name already exists.",
  CATEGORY_NAME_CANNOT_CHANGE: "Category name cannot be changed once created",
  FORUM_CREATED: "Forum has been created",
  CATEGORY_CREATED: "Category has been created",
  THREAD_CREATED: "Thread has been created",
  POST_CREATED: "Post created successfully.",

  // Required
  USERNAME_REQUIRED: "Username is required.",
  FIRST_NAME_REQUIRED: "First name is required.",
  LAST_NAME_REQUIRED: "Last name is required.",
  EMAIL_REQUIRED: "Email is required.",
  PASSWORD_REQUIRED: "Password is required.",
  MOBILE_NUMBER_REQUIRED: "Mobile number is required.",
  GENDER_REQUIRED: "Gender is required.",
  DATE_OF_BIRTH_REQUIRED: "Date of birth is required.",
  ADDRESS_REQUIRED: "Address is required.",
  ROLE_REQUIRED: "Your role is required for admin registration.",
  FORUM_NAME_REQUIRED: "Name of the forum is required for registration.",
  FORUM_DESCRIPTION_REQUIRED:
    "Description of the forum is required for registration.",
  FORUM_CATEGORY_ID_REQUIRED:
    "CategoryId of the forum is required for registration.",
  FORUM_CREATOR_REQUIRED: "Creator of the forum is required for registration.",
  POST_CONTENT_REQUIRED: "Content of the post is required.",
  POST_CREATOR_REQUIRED: "Creator of the post is required.",
  FORUM_ID_REQUIRED: "Forum id required for creating thread.",
  THREAD_TITLE_REQUIRED: "Thread title required for creating thread.",
  THREAD_CONTENT_REQUIRED: "Thread content required.",
  THREAD_CREATOR_REQUIRED: "Thread creator required.",
  THREAD_ID_REQUIRED: "Thread id required.",

  // Deleted
  USER_DELETE: "User has been deleted.",
  ADMIN_DELETED: "Admin account deactivated successfully.",
  FORUM_DELETED: "Forum deleted.",
  THREAD_DELETED: "Thread deleted.",
  POST_DELETED: "Post deleted.",
  CATEGORY_DELETED: "Category deleted.",

  // Updated
  USER_UPDATE: "User has been updated.",
  ADMIN_UPDATED: "Admin updated successfully.",
  FORUM_UPDATED: "Forum updated.",
  THREAD_UPDATED: "Thread updated.",
  CATEGORY_UPDATED: "Category updated.",
  CATEGORY_EDITED: "While updating a category is considered to be edited.",
  POST_UPDATED: "Post updated.",
  DATA_SAVED: "Data saved successfully.",

  // INVALID
  INVALID_EMAIL: "Please enter a valid email.",
  INVALID_PASSWORD: "Please enter a valid password.",
  INVALID_MOBILE_NUMBER: "Please enter a valid mobile number.",
  INVALID_CREDENTIALS: "Your credentials are invalid.",
  INVALID_USER_ID: "Invalid user ID.",
  PASSWORD_SIX_CHAR: "Password must be at least 6 characters long.",
  INVALID_POST_ID: "Invalid post id.",
  INVALID_THREAD_ID: "Invalid thread id.",

  // SUCCESS
  SUCCESS: "Success",
  USER_REGISTER: "User registered successfully.",
  USER_NOT_REGISTER: "User registered failed.",
  ADMIN_NOT_REGISTER: "Admin registered failed.",
  ADMIN_REGISTER: "Admin registered successfully.",
  LOGGED_IN: "Logged in successfully.",
};

const StatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  ALREADY_EXIST: 409,
};

module.exports = { StatusCode, Msg };
