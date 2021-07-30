import GoTrue from 'gotrue-js';
import { NETLIFY_IDENTITY_URL } from './api-constants';

export const auth = new GoTrue({
	APIUrl: NETLIFY_IDENTITY_URL,
	setCookie: true
});
