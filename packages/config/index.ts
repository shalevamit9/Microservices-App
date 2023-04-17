export default () => ({
  apiGatewayServicePort: process.env.API_GATEWAY_SERVICE_PORT,
  apiGatewayServiceurl: process.env.API_GATEWAY_SERVICE_URL,
  emailServiceUrl: process.env.EMAIL_SERVICE_URL,
  emailServicePort: process.env.EMAIL_SERVICE_PORT,
  userServicePort: process.env.USER_SERVICE_PORT,
  userServiceUrl: process.env.USER_SERVICE_URL,
});
