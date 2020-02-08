import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import apigw = require("@aws-cdk/aws-apigateway");
import { HitCounter } from "./hitcounter";

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.PYTHON_3_7, // execution environment
      code: lambda.Code.asset("lambda"), // code loaded from the "lambda" directory
      handler: "hello.handler" // file is "hello", function is "handler"
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler
    });
  }
}
