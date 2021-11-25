/* eslint-disable no-undef */

//warning: you are trying to import a file after jest environment has been torn down
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));
