# Rust Lambda CDK

A small CDK project to test and evaluate building and deploying AWS Lambda implemented in Rust.

`App 1` is a simple "Hello World!" app to give a base on size, init time and execution time. `App 2` adds functionality
to call DynamoDB, and `App 3` has the same functionality as `App 2` but with a static reference to the dynamo client.
