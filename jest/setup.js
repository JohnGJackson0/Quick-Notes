/* eslint-disable no-undef */

//warning: you are trying to import a file after jest environment has been torn down
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
//async storage is null errors
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
