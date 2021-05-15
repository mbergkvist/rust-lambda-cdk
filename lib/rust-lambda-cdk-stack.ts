import * as lambda from "@aws-cdk/aws-lambda";
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

    new RustFunction(this, "App 2", {
      bin: "app2",
      path: projectPath,
    });
  }
}
