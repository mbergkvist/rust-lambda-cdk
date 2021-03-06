use dynamodb;
use lambda_runtime::{handler_fn, Context, Error};
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let handler = handler_fn(handler);
    lambda_runtime::run(handler).await?;
    Ok(())
}

async fn handler(_: Value, _: Context) -> Result<Value, Error> {
    let client = dynamodb::Client::from_env();
    let req = client.list_tables().limit(10);
    let resp = req.send().await?;
    Ok(json!(resp.table_names))
}
