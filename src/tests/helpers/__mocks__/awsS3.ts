import AWS from 'aws-sdk';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

const mockedAwsS3 = mockDeep<AWS.S3>();

beforeEach(() => {
  mockReset(mockedAwsS3);
});

export default mockedAwsS3;
