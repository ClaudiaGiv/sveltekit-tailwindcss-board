import GoTrue from 'gotrue-js';
import { NETLIFY_IDENTITY_URL } from './api-constants';
// const GoTrue = require('gotrue-js')

// export const auth = new GoTrue({
// 	APIUrl: NETLIFY_IDENTITY_URL,
// 	setCookie: true
// });

GoTrue.APIUrl = NETLIFY_IDENTITY_URL
export const auth = GoTrue
