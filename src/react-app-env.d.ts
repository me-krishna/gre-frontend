/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_TOKEN_KEY: string;
    REACT_APP_USER_KEY: string;
    REACT_APP_ENCODE_KEY: string;
  }
}