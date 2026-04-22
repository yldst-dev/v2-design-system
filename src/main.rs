use dioxus::desktop::{Config, WindowBuilder};
use dioxus::prelude::*;

mod app;
#[path = "design-system/mod.rs"]
mod design_system;
mod features;

fn main() {
    LaunchBuilder::desktop()
        .with_cfg(
            Config::new().with_window(
                WindowBuilder::new()
                    .with_title("V2 Design System")
                    .with_always_on_top(false),
            ),
        )
        .launch(app::app);
}
