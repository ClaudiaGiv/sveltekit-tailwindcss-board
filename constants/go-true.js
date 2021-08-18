import GoTrue from 'gotrue-js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const GoTrue = import('gotrue-js')
import { NETLIFY_IDENTITY_URL } from './api-constants';
// const GoTrue = require('gotrue-js')

export const auth = new GoTrue({
	APIUrl: NETLIFY_IDENTITY_URL,
	audience: '',
	setCookie: true
});
console.log(GoTrue);

// GoTrue.APIUrl = NETLIFY_IDENTITY_URL
// console.log(GoTrue)
// export const auth = GoTrue
