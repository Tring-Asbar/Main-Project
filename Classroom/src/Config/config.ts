export const config = {
    backendUrl: import.meta.env.VITE_BACKEND_URL,
};

export const amplifyConfig = {
    aws_project_region: import.meta.env.VITE_REGION,
    aws_cognito_region: import.meta.env.VITE_REGION,
    aws_user_pools_id: import.meta.env.VITE_USER_POOL_ID,
    aws_cognito_identity_pool_id: import.meta.env.VITE_IDENTITY_POOL_ID,
    aws_user_pools_web_client_id: import.meta.env.VITE_CLIENT_ID,
    federationTarget: "COGNITO_USER_POOLS",
};