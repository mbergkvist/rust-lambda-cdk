use lambda_runtime::{handler_fn, Context, Error};
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let handler = handler_fn(handler);
    lambda_runtime::run(handler).await?;
    Ok(())
}

async fn handler(event: Value, _: Context) -> Result<Value, Error> {
    let first_name = event["firstName"].as_str().unwrap_or("App 2");

    Ok(json!({ "message": format!("Hello, {}!", first_name) }))
}
