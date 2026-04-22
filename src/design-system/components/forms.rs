use crate::design_system::components::typography::{Text, TextSize, TextWeight};
use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, PartialEq)]
pub struct SelectOption {
    pub value: String,
    pub label: String,
}

#[allow(dead_code)]
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum InputSize {
    Sm,
    Md,
    Lg,
}

impl InputSize {
    fn class_name(self) -> &'static str {
        match self {
            Self::Sm => "ds-input--sm",
            Self::Md => "ds-input--md",
            Self::Lg => "ds-input--lg",
        }
    }
}

#[component]
pub fn Input(
    #[props(default)] value: String,
    #[props(default)] placeholder: Option<String>,
    #[props(default = "text".to_string())] input_type: String,
    #[props(default = InputSize::Md)] size: InputSize,
    #[props(default)] icon: Option<IconKind>,
    #[props(default)] icon_right: Option<IconKind>,
    #[props(default)] disabled: bool,
    #[props(default)] error: bool,
    #[props(default)] full_width: bool,
    #[props(default)] oninput: Option<EventHandler<String>>,
) -> Element {
    let mut reveal = use_signal(|| false);
    let handler = oninput.clone();
    let is_controlled = handler.is_some();
    let mut local_value = use_signal({
        let value = value.clone();
        move || value
    });
    let input_mode = if input_type == "password" && reveal() {
        "text".to_string()
    } else {
        input_type.clone()
    };
    let current_value = if is_controlled {
        value.clone()
    } else {
        local_value()
    };
    let placeholder_value = placeholder.unwrap_or_default();
    let width_class = if full_width {
        "ds-input-shell--full"
    } else {
        ""
    };
    let error_class = if error { "is-error" } else { "" };
    let classes = format!(
        "ds-input-shell {} {} {}",
        size.class_name(),
        width_class,
        error_class
    );

    rsx! {
        div {
            class: "{classes}",
            if let Some(icon) = icon {
                span { class: "ds-input-shell__icon", Icon { kind: icon, size: 14 } }
            }
            input {
                class: "ds-input",
                disabled,
                r#type: "{input_mode}",
                value: "{current_value}",
                placeholder: "{placeholder_value}",
                oninput: move |event| {
                    let next = event.value();
                    if let Some(handler) = handler.as_ref() {
                        handler.call(next.clone());
                    } else {
                        local_value.set(next);
                    }
                }
            }
            if input_type == "password" {
                button {
                    class: "ds-input-shell__action",
                    r#type: "button",
                    onclick: move |_| reveal.set(!reveal()),
                    Icon { kind: if reveal() { IconKind::EyeOff } else { IconKind::Eye }, size: 14 }
                }
            } else if let Some(icon_right) = icon_right {
                span { class: "ds-input-shell__icon ds-input-shell__icon--right", Icon { kind: icon_right, size: 14 } }
            }
        }
    }
}

#[component]
pub fn Textarea(
    #[props(default)] value: String,
    #[props(default)] placeholder: Option<String>,
    #[props(default = 4)] rows: usize,
    #[props(default)] error: bool,
    #[props(default)] oninput: Option<EventHandler<String>>,
) -> Element {
    let handler = oninput.clone();
    let is_controlled = handler.is_some();
    let mut local_value = use_signal({
        let value = value.clone();
        move || value
    });
    let error_class = if error { "is-error" } else { "" };
    let current_value = if is_controlled {
        value.clone()
    } else {
        local_value()
    };
    let placeholder_value = placeholder.unwrap_or_default();

    rsx! {
        textarea {
            class: "ds-textarea {error_class}",
            rows: rows.to_string(),
            value: "{current_value}",
            placeholder: "{placeholder_value}",
            oninput: move |event| {
                let next = event.value();
                if let Some(handler) = handler.as_ref() {
                    handler.call(next.clone());
                } else {
                    local_value.set(next);
                }
            }
        }
    }
}

#[component]
pub fn Field(
    children: Element,
    #[props(default)] label: Option<String>,
    #[props(default)] hint: Option<String>,
    #[props(default)] error: Option<String>,
    #[props(default)] required: bool,
) -> Element {
    let message = error.clone().or(hint);
    let tone = if error.is_some() {
        "tone-danger".to_string()
    } else {
        "tone-muted".to_string()
    };

    rsx! {
        div { class: "ds-field",
            if let Some(label) = label {
                div { class: "ds-field__label",
                    Text { tag: super::typography::TextTag::Label, size: TextSize::Sm, weight: TextWeight::Medium, "{label}" }
                    if required {
                        span { class: "ds-field__required", "*" }
                    }
                }
            }
            div { class: "ds-field__control", {children} }
            if let Some(message) = message {
                Text {
                    size: TextSize::Sm,
                    tone: Some(tone),
                    class: Some("ds-field__message".to_string()),
                    "{message}"
                }
            }
        }
    }
}

#[component]
pub fn Select(
    #[props(default)] options: Vec<SelectOption>,
    #[props(default)] value: String,
    #[props(default)] placeholder: Option<String>,
    #[props(default)] onselect: Option<EventHandler<String>>,
) -> Element {
    let mut open = use_signal(|| false);
    let selected = options.iter().find(|option| option.value == value).cloned();
    let handler = onselect.clone();
    let has_selected = selected.is_some();
    let label = selected
        .as_ref()
        .map(|option| option.label.clone())
        .unwrap_or_else(|| placeholder.unwrap_or_else(|| "Select".to_string()));
    let active_class = if open() { "is-open" } else { "" };

    rsx! {
        div { class: "ds-select {active_class}",
            button {
                class: "ds-select__trigger",
                r#type: "button",
                onclick: move |_| open.set(!open()),
                span { class: if has_selected { "ds-select__value" } else { "ds-select__placeholder" }, "{label}" }
                Icon { kind: IconKind::ChevronsUpDown, size: 14 }
            }
            if open() {
                div { class: "ds-select__menu",
                    for option in options {
                        button {
                            key: "{option.value}",
                            class: if option.value == value { "ds-select__option is-active" } else { "ds-select__option" },
                            r#type: "button",
                            onclick: {
                                let option_value = option.value.clone();
                                move |_| {
                                    if let Some(handler) = handler.as_ref() {
                                        handler.call(option_value.clone());
                                    }
                                    open.set(false);
                                }
                            },
                            span { "{option.label}" }
                            if option.value == value {
                                Icon { kind: IconKind::Check, size: 14 }
                            }
                        }
                    }
                }
            }
        }
    }
}
