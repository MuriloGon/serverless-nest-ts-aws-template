import type { AWS } from '@serverless/typescript';

import provider from './provider';
import plugins from './plugins';
import custom from './custom';
import resources from './resources';
import * as functionsBase from './functions';

const SERVICE_NAME = 'serverless-nest-ts-aws-template';
const SERVICE_DESCRIPTION =
  'A serverless-nest-ts-aws-template cloud formation stack description';

const functions = Object.fromEntries(
  Object.entries(functionsBase).map(([lambdaName, value]) => {
    value.name =
      '${self:service}-' + lambdaName + '-${self:provider.stage}';
    return [lambdaName, value];
  }),
);

const output: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '3',
  package: { individually: true },
  provider,
  plugins,
  custom,
  functions,
  resources: {
    ...resources,
    Description: SERVICE_DESCRIPTION,
  },
};

export default output;
