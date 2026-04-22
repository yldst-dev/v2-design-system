use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ProgressVariant {
    Primary,
    Success,
    Warning,
    Error,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ToastVariant {
    Success,
    Error,
    Info,
    Warning,
}

#[derive(Clone, PartialEq)]
pub struct ToastEntry {
    pub id: u32,
    pub title: String,
    pub description: String,
    pub variant: ToastVariant,
    pub leaving: bool,
}

impl ProgressVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Primary => "ds-progress--primary",
            Self::Success => "ds-progress--success",
            Self::Warning => "ds-progress--warning",
            Self::Error => "ds-progress--error",
        }
    }
}

impl ToastVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Success => "ds-toast--success",
            Self::Error => "ds-toast--error",
            Self::Info => "ds-toast--info",
            Self::Warning => "ds-toast--warning",
        }
    }

    fn icon(self) -> IconKind {
        match self {
            Self::Success => IconKind::CheckCircle2,
            Self::Error => IconKind::AlertCircle,
            Self::Info => IconKind::Info,
            Self::Warning => IconKind::AlertTriangle,
        }
    }
}

#[component]
pub fn Progress(
    #[props(default = 0)] value: u32,
    #[props(default = ProgressVariant::Primary)] variant: ProgressVariant,
    #[props(default)] show_label: bool,
) -> Element {
    let safe = value.min(100);
    let classes = format!("ds-progress {}", variant.class_name());

    rsx! {
        div {
            class: "{classes}",
            if show_label {
                div { class: "ds-progress__meta",
                    span { "Progress" }
                    span { "{safe}%" }
                }
            }
            div { class: "ds-progress__track",
                span {
                    class: "ds-progress__fill",
                    style: "width: {safe}%;"
                }
            }
        }
    }
}

#[component]
pub fn CircularProgress(
    #[props(default = 0)] value: u32,
    #[props(default = 60)] size: u32,
    #[props(default)] label: Option<String>,
) -> Element {
    let safe = value.min(100);
    let text = label.unwrap_or_else(|| format!("{safe}%"));

    rsx! {
        div {
            class: "ds-circular-progress",
            style: "width: {size}px; height: {size}px; --progress: {safe}%;",
            span { class: "ds-circular-progress__label", "{text}" }
        }
    }
}

#[component]
pub fn Skeleton(
    #[props(default = "100%".to_string())] width: String,
    #[props(default = "16px".to_string())] height: String,
    #[props(default)] circle: bool,
) -> Element {
    let classes = if circle {
        "ds-skeleton is-circle"
    } else {
        "ds-skeleton"
    };

    rsx! {
        div {
            class: "{classes}",
            style: "width: {width}; height: {height};"
        }
    }
}

#[component]
pub fn EmptyState(
    #[props(default = IconKind::FileText)] icon: IconKind,
    #[props(default)] title: String,
    #[props(default)] description: Option<String>,
    #[props(default)] action: Option<Element>,
) -> Element {
    rsx! {
        div { class: "ds-empty",
            div { class: "ds-empty__icon", Icon { kind: icon, size: 22 } }
            div { class: "ds-empty__title", "{title}" }
            if let Some(description) = description {
                p { class: "ds-empty__description", "{description}" }
            }
            if let Some(action) = action {
                div { class: "ds-empty__action", {action} }
            }
        }
    }
}

#[component]
pub fn Toast(
    #[props(default)] toasts: Vec<ToastEntry>,
    #[props(default)] on_dismiss: Option<EventHandler<u32>>,
) -> Element {
    let handler = on_dismiss.clone();

    rsx! {
        div { class: "ds-toast-stack",
            for toast in toasts {
                div {
                    key: "{toast.id}",
                    class: if toast.leaving {
                        format!("ds-toast {} is-leaving", toast.variant.class_name())
                    } else {
                        format!("ds-toast {}", toast.variant.class_name())
                    },
                    span { class: "ds-toast__icon", Icon { kind: toast.variant.icon(), size: 18 } }
                    div { class: "ds-toast__body",
                        div { class: "ds-toast__title", "{toast.title}" }
                        div { class: "ds-toast__description", "{toast.description}" }
                    }
                    button {
                        class: "ds-toast__close",
                        r#type: "button",
                        "aria-label": "Dismiss notification",
                        onclick: {
                            let id = toast.id;
                            move |_| {
                                if let Some(handler) = handler.as_ref() {
                                    handler.call(id);
                                }
                            }
                        },
                        Icon { kind: IconKind::Close, size: 14 }
                    }
                }
            }
        }
    }
}
