use crate::design_system::theme::provide_theme;
use crate::features::showcase::DesignSystemShowcase;
use dioxus::prelude::*;

static MAIN_CSS: Asset = asset!("/assets/main.css");

#[component]
pub fn app() -> Element {
    let theme = provide_theme();
    let theme_class = theme.class_name();

    rsx! {
        document::Title { "V2 Design System" }
        document::Stylesheet { href: MAIN_CSS }
        div {
            class: "app-shell {theme_class}",
            DesignSystemShowcase {}
        }
    }
}
