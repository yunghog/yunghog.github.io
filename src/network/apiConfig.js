export const ApiConfig = {
  emailJs: {
    userId: process.env.REACT_APP_EMAILJS_USER_ID,
    accessToken: process.env.REACT_APP_EMAILJS_ACCESS_TOKEN,
    sericeId: process.env.REACT_APP_EMAILJS_SERIVCE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    baseUrl: 'https://api.emailjs.com/api/v1.0/email/send',
  },
};
