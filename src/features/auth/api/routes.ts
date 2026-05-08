export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  ME: '/users/me',
  UPDATE_IMAGE: (userId: string) => `/users/${userId}/profile-image`,
};
