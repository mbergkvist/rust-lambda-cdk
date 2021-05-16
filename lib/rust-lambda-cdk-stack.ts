import * as ddb from "@aws-cdk/aws-dynamodb";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";
import { RustFunction } from "./rust-function";

import * as path from "path";

export class RustLambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const projectPath = path.join(__dirname, "..", "cdk-lambda");

    new RustFunction(this, "App 1", {
      bin: "app1",
      path: projectPath,
    });

    const app2Func = new RustFunction(this, "App 2", {
      bin: "app2",
      path: projectPath,
    });

    const app3Func = new RustFunction(this, "App 3", {
      bin: "app3",
      path: projectPath,
    });

    const listTablePolicy = new iam.PolicyStatement({
      actions: ["dynamodb:ListTables"],
      effect: iam.Effect.ALLOW,
      resources: ["*"],
    });

    app2Func.function.addToRolePolicy(listTablePolicy);
    app3Func.function.addToRolePolicy(listTablePolicy);

    new ddb.Table(this, "Table1", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    new ddb.Table(this, "Table2", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    new ddb.Table(this, "Table3", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });
  }
}
