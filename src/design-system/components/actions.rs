use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ButtonVariant {
    Primary,
    Secondary,
    Outline,
    Ghost,
    Destructive,
    Link,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ButtonSize {
    Xs,
    Sm,
    Md,
    Lg,
}

impl ButtonVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Primary => "ds-button--primary",
            Self::Secondary => "ds-button--secondary",
            Self::Outline => "ds-button--outline",
            Self::Ghost => "ds-button--ghost",
            Self::Destructive => "ds-button--destructive",
            Self::Link => "ds-button--link",
        }
    }
}

impl ButtonSize {
    fn class_name(self) -> &'static str {
        match self {
            Self::Xs => "ds-button--xs",
            Self::Sm => "ds-button--sm",
            Self::Md => "ds-button--md",
            Self::Lg => "ds-button--lg",
        }
    }

    fn icon_size(self) -> u32 {
        match self {
            Self::Xs | Self::Sm => 14,
            Self::Md => 16,
            Self::Lg => 18,
        }
    }
}

#[component]
pub fn Button(
    children: Element,
    #[props(default = ButtonVariant::Primary)] variant: ButtonVariant,
    #[props(default = ButtonSize::Md)] size: ButtonSize,
    #[props(default)] icon: Option<IconKind>,
    #[props(default)] icon_right: Option<IconKind>,
    #[props(default)] loading: bool,
    #[props(default)] disabled: bool,
    #[props(default)] full_width: bool,
    #[props(default)] onclick: Option<EventHandler<MouseEvent>>,
) -> Element {
    let handler = onclick.clone();
    let width_class = if full_width { "ds-button--full" } else { "" };
    let classes = format!(
        "ds-button {} {} {}",
        variant.class_name(),
        size.class_name(),
        width_class
    );

    rsx! {
        button {
            class: "{classes}",
            disabled: disabled || loading,
            onclick: move |event| {
                if let Some(handler) = handler.as_ref() {
                    handler.call(event);
                }
            },
            if loading {
                span { class: "ds-button__icon ds-button__spinner" }
            } else if let Some(icon) = icon {
                span { class: "ds-button__icon", Icon { kind: icon, size: 14 } }
            }
            span { class: "ds-button__label", {children} }
            if !loading {
                if let Some(icon_right) = icon_right {
                    span { class: "ds-button__icon", Icon { kind: icon_right, size: 14 } }
                }
            }
        }
    }
}

#[component]
pub fn IconButton(
    #[props(default)] icon: Option<IconKind>,
    #[props(default = ButtonVariant::Ghost)] variant: ButtonVariant,
    #[props(default = ButtonSize::Md)] size: ButtonSize,
    #[props(default)] label: Option<String>,
    #[props(default)] disabled: bool,
    #[props(default)] onclick: Option<EventHandler<MouseEvent>>,
) -> Element {
    let handler = onclick.clone();
    let aria_label = label.unwrap_or_else(|| "icon button".to_string());
    let icon = icon.unwrap_or(IconKind::More);
    let classes = format!(
        "ds-icon-button {} {}",
        variant.class_name(),
        size.class_name()
    );

    rsx! {
        button {
            class: "{classes}",
            "aria-label": "{aria_label}",
            disabled,
            onclick: move |event| {
                if let Some(handler) = handler.as_ref() {
                    handler.call(event);
                }
            },
            Icon { kind: icon, size: size.icon_size() }
        }
    }
}
