use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, PartialEq)]
pub struct AccordionItem {
    pub title: String,
    pub content: String,
}

#[derive(Clone, PartialEq)]
pub struct TableColumn {
    pub label: String,
}

#[component]
pub fn Accordion(#[props(default)] items: Vec<AccordionItem>) -> Element {
    let mut open = use_signal(|| None::<usize>);

    rsx! {
        div { class: "ds-accordion",
            for (index, item) in items.into_iter().enumerate() {
                div {
                    key: "{index}",
                    class: if open() == Some(index) { "ds-accordion__item is-open" } else { "ds-accordion__item" },
                    button {
                        class: "ds-accordion__trigger",
                        r#type: "button",
                        onclick: move |_| {
                            if open() == Some(index) {
                                open.set(None);
                            } else {
                                open.set(Some(index));
                            }
                        },
                        span { class: "ds-accordion__title", "{item.title}" }
                        span { class: "ds-accordion__caret",
                            Icon { kind: IconKind::ChevronDown, size: 16 }
                        }
                    }
                    if open() == Some(index) {
                        div { class: "ds-accordion__content", "{item.content}" }
                    }
                }
            }
        }
    }
}

#[component]
pub fn Table(#[props(default)] columns: Vec<TableColumn>, children: Element) -> Element {
    rsx! {
        div { class: "ds-table-wrap",
            table { class: "ds-table",
                thead {
                    tr {
                        for column in columns {
                            th { "{column.label}" }
                        }
                    }
                }
                tbody { {children} }
            }
        }
    }
}

#[component]
pub fn Divider(
    #[props(default)] label: Option<String>,
    #[props(default)] vertical: bool,
) -> Element {
    if vertical {
        rsx! { div { class: "ds-divider ds-divider--vertical" } }
    } else if let Some(label) = label {
        rsx! {
            div { class: "ds-divider ds-divider--label",
                span { class: "ds-divider__line" }
                span { class: "ds-divider__label", "{label}" }
                span { class: "ds-divider__line" }
            }
        }
    } else {
        rsx! { div { class: "ds-divider" } }
    }
}
