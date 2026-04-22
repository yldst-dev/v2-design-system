use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[component]
pub fn Tooltip(
    children: Element,
    #[props(default)] content: String,
    #[props(default = "top".to_string())] position: String,
) -> Element {
    let mut show = use_signal(|| false);
    let classes = format!("ds-tooltip ds-tooltip--{}", position);

    rsx! {
        span {
            class: "{classes}",
            onmouseenter: move |_| show.set(true),
            onmouseleave: move |_| show.set(false),
            {children}
            if show() {
                span { class: "ds-tooltip__bubble", "{content}" }
            }
        }
    }
}

#[allow(dead_code)]
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ModalSize {
    Xs,
    Sm,
    Md,
    Lg,
}

impl ModalSize {
    fn class_name(self) -> &'static str {
        match self {
            Self::Xs => "ds-modal--xs",
            Self::Sm => "ds-modal--sm",
            Self::Md => "ds-modal--md",
            Self::Lg => "ds-modal--lg",
        }
    }
}

#[component]
pub fn Modal(
    children: Element,
    #[props(default)] is_open: bool,
    #[props(default = ModalSize::Md)] size: ModalSize,
    #[props(default)] title: Option<String>,
    #[props(default)] description: Option<String>,
    #[props(default)] footer: Option<Element>,
    #[props(default)] onclose: Option<EventHandler<()>>,
) -> Element {
    let handler = onclose.clone();
    let overlay_class = if is_open {
        "ds-overlay ds-overlay--modal is-open"
    } else {
        "ds-overlay ds-overlay--modal is-closed"
    };
    let modal_class = format!("ds-modal {}", size.class_name());

    rsx! {
        div { class: "{overlay_class}", "aria-hidden": (!is_open).to_string(),
            button {
                class: "ds-overlay__backdrop",
                r#type: "button",
                "aria-label": "Close",
                onclick: move |_| {
                    if let Some(handler) = handler.as_ref() {
                        handler.call(());
                    }
                }
            }
            div { class: "{modal_class}",
                div { class: "ds-modal__header",
                    div {
                        if let Some(title) = title {
                            h3 { class: "ds-modal__title", "{title}" }
                        }
                        if let Some(description) = description {
                            p { class: "ds-modal__description", "{description}" }
                        }
                    }
                    if onclose.is_some() {
                        button {
                            class: "ds-modal__close",
                            r#type: "button",
                            "aria-label": "Close",
                            onclick: move |_| {
                                if let Some(handler) = onclose.as_ref() {
                                    handler.call(());
                                }
                            },
                            Icon { kind: IconKind::Close, size: 18 }
                        }
                    }
                }
                div { class: "ds-modal__body", {children} }
                if let Some(footer) = footer {
                    div { class: "ds-modal__footer", {footer} }
                }
            }
        }
    }
}

#[component]
pub fn Drawer(
    children: Element,
    #[props(default)] is_open: bool,
    #[props(default)] title: Option<String>,
    #[props(default = "right".to_string())] side: String,
    #[props(default)] onclose: Option<EventHandler<()>>,
) -> Element {
    let side_class = format!("ds-drawer ds-drawer--{}", side);
    let overlay_class = if is_open {
        "ds-overlay ds-overlay--drawer is-open"
    } else {
        "ds-overlay ds-overlay--drawer is-closed"
    };

    rsx! {
        div { class: "{overlay_class}", "aria-hidden": (!is_open).to_string(),
            button {
                class: "ds-overlay__backdrop",
                r#type: "button",
                onclick: move |_| {
                    if let Some(handler) = onclose.as_ref() {
                        handler.call(());
                    }
                }
            }
            div { class: "{side_class}",
                div { class: "ds-drawer__header",
                    if let Some(title) = title {
                        h3 { class: "ds-drawer__title", "{title}" }
                    }
                    button {
                        class: "ds-drawer__close",
                        r#type: "button",
                        "aria-label": "Close",
                    onclick: move |_| {
                        if let Some(handler) = onclose.as_ref() {
                            handler.call(());
                        }
                    },
                    Icon { kind: IconKind::Close, size: 18 }
                }
            }
                div { class: "ds-drawer__body", {children} }
            }
        }
    }
}
