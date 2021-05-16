import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

const TARGET_DIR = "target/lambda";

export interface RustFunctionProps {
  readonly bin: string;
  readonly path: string;
}

export class RustFunction extends cdk.Construct {
  readonly code: lambda.AssetCode;
  readonly function: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: RustFunctionProps) {
    super(scope, id);

    this.code = lambda.Code.fromAsset(props.path, {
      bundling: {
        image: cdk.DockerImage.fromRegistry("rust"),
        command: [
          "bash",
          "-c",
          [
            `cargo build --release --target-dir ${TARGET_DIR} --bin ${props.bin}`,
            `objcopy -S ${TARGET_DIR}/release/${props.bin} /asset-output/bootstrap`,
          ].join(" && "),
        ],
      },
    });

    this.function = new lambda.Function(this, "Function", {
      code: this.code,
      handler: "bootstrap",
      runtime: lambda.Runtime.PROVIDED_AL2,
      timeout: cdk.Duration.seconds(5),
      tracing: lambda.Tracing.ACTIVE,
    });
  }
}
