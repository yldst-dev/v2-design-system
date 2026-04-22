use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum BadgeVariant {
    Default,
    Primary,
    Success,
    Warning,
    Error,
    Info,
    Outline,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum AlertVariant {
    Info,
    Success,
    Warning,
    Error,
}

#[allow(dead_code)]
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum BannerVariant {
    Primary,
    Neutral,
    Success,
    Warning,
}

#[derive(Clone, PartialEq)]
pub struct AvatarItem {
    pub initials: String,
    pub color_class: String,
}

impl BadgeVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Default => "ds-badge--default",
            Self::Primary => "ds-badge--primary",
            Self::Success => "ds-badge--success",
            Self::Warning => "ds-badge--warning",
            Self::Error => "ds-badge--error",
            Self::Info => "ds-badge--info",
            Self::Outline => "ds-badge--outline",
        }
    }
}

impl AlertVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Info => "ds-alert--info",
            Self::Success => "ds-alert--success",
            Self::Warning => "ds-alert--warning",
            Self::Error => "ds-alert--error",
        }
    }

    fn icon(self) -> IconKind {
        match self {
            Self::Info => IconKind::Info,
            Self::Success => IconKind::Check,
            Self::Warning => IconKind::Bell,
            Self::Error => IconKind::Trash,
        }
    }
}

impl BannerVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Primary => "ds-banner--primary",
            Self::Neutral => "ds-banner--neutral",
            Self::Success => "ds-banner--success",
            Self::Warning => "ds-banner--warning",
        }
    }
}

#[component]
pub fn Badge(
    children: Element,
    #[props(default = BadgeVariant::Default)] variant: BadgeVariant,
    #[props(default)] dot: bool,
    #[props(default)] removable: bool,
    #[props(default)] onremove: Option<EventHandler<()>>,
) -> Element {
    let handler = onremove.clone();
    let classes = format!("ds-badge {}", variant.class_name());

    rsx! {
        span { class: "{classes}",
            if dot {
                span { class: "ds-badge__dot" }
            }
            {children}
            if removable {
                button {
                    class: "ds-badge__remove",
                    r#type: "button",
                    onclick: move |_| {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(());
                        }
                    },
                    "×"
                }
            }
        }
    }
}

#[component]
pub fn Card(
    children: Element,
    #[props(default)] interactive: bool,
    #[props(default)] onclick: Option<EventHandler<MouseEvent>>,
    #[props(default)] class: Option<String>,
    #[props(default)] padding: Option<String>,
) -> Element {
    let handler = onclick.clone();
    let interactive_class = if interactive { "is-interactive" } else { "" };
    let extra_class = class.unwrap_or_default();
    let style = padding
        .map(|padding| format!("padding: {padding};"))
        .unwrap_or_default();
    let classes = format!("ds-card {} {}", interactive_class, extra_class);

    rsx! {
        div {
            class: "{classes}",
            style: "{style}",
            onclick: move |event| {
                if let Some(handler) = handler.as_ref() {
                    handler.call(event);
                }
            },
            {children}
        }
    }
}

#[component]
pub fn Alert(
    children: Element,
    #[props(default = AlertVariant::Info)] variant: AlertVariant,
    #[props(default)] title: Option<String>,
    #[props(default)] dismissible: bool,
    #[props(default)] onclose: Option<EventHandler<()>>,
) -> Element {
    let handler = onclose.clone();
    let classes = format!("ds-alert {}", variant.class_name());

    rsx! {
        div { class: "{classes}",
            span { class: "ds-alert__icon", Icon { kind: variant.icon(), size: 16 } }
            div { class: "ds-alert__body",
                if let Some(title) = title {
                    div { class: "ds-alert__title", "{title}" }
                }
                div { class: "ds-alert__copy", {children} }
            }
            if dismissible {
                button {
                    class: "ds-alert__close",
                    r#type: "button",
                    onclick: move |_| {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(());
                        }
                    },
                    "×"
                }
            }
        }
    }
}

#[component]
pub fn Banner(
    children: Element,
    #[props(default = BannerVariant::Primary)] variant: BannerVariant,
    #[props(default)] icon: Option<IconKind>,
    #[props(default)] action: Option<Element>,
    #[props(default)] onclose: Option<EventHandler<()>>,
) -> Element {
    let handler = onclose.clone();
    let classes = format!("ds-banner {}", variant.class_name());

    rsx! {
        div { class: "{classes}",
            if let Some(icon) = icon {
                span { class: "ds-banner__icon", Icon { kind: icon, size: 16 } }
            }
            div { class: "ds-banner__copy", {children} }
            if let Some(action) = action {
                div { class: "ds-banner__action", {action} }
            }
            if onclose.is_some() {
                button {
                    class: "ds-banner__close",
                    r#type: "button",
                    onclick: move |_| {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(());
                        }
                    },
                    "×"
                }
            }
        }
    }
}

#[component]
pub fn Avatar(
    #[props(default)] initials: String,
    #[props(default = "md".to_string())] size: String,
    #[props(default = "tone-primary".to_string())] color_class: String,
    #[props(default)] src: Option<String>,
    #[props(default)] status: Option<String>,
) -> Element {
    rsx! {
        div { class: "ds-avatar-stack",
            div { class: "ds-avatar ds-avatar--{size} {color_class}",
                if let Some(src) = src {
                    img { class: "ds-avatar__img", src: "{src}", alt: "{initials}" }
                } else {
                    "{initials}"
                }
            }
            if let Some(status) = status {
                span { class: "ds-avatar__status is-{status}" }
            }
        }
    }
}

#[component]
pub fn AvatarGroup(
    #[props(default)] avatars: Vec<AvatarItem>,
    #[props(default = 4)] max: usize,
    #[props(default = "md".to_string())] size: String,
) -> Element {
    let visible: Vec<AvatarItem> = avatars.iter().take(max).cloned().collect();
    let remaining = avatars.len().saturating_sub(max);

    rsx! {
        div { class: "ds-avatar-group",
            for avatar in visible {
                div { class: "ds-avatar-group__item",
                    Avatar { initials: avatar.initials, size: size.clone(), color_class: avatar.color_class }
                }
            }
            if remaining > 0 {
                div { class: "ds-avatar-group__more ds-avatar--{size}", "+{remaining}" }
            }
        }
    }
}

#[component]
pub fn Stat(
    #[props(default)] label: String,
    #[props(default)] value: String,
    #[props(default)] change: Option<String>,
    #[props(default)] change_tone: Option<String>,
    #[props(default)] icon: Option<IconKind>,
) -> Element {
    let tone = change_tone.unwrap_or_else(|| "tone-success".to_string());

    rsx! {
        Card {
            class: Some("ds-stat".to_string()),
            div { class: "ds-stat__top",
                div { class: "ds-stat__label", "{label}" }
                if let Some(icon) = icon {
                    span { class: "ds-stat__icon", Icon { kind: icon, size: 14 } }
                }
            }
            div { class: "ds-stat__value", "{value}" }
            if let Some(change) = change {
                div { class: "ds-stat__change {tone}", "{change}" }
            }
        }
    }
}

#[component]
pub fn Spinner(#[props(default = 16)] size: u32) -> Element {
    rsx! {
        span {
            class: "ds-spinner",
            style: "width: {size}px; height: {size}px;"
        }
    }
}
