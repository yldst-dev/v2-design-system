use dioxus::prelude::*;

#[component]
pub fn Checkbox(
    #[props(default)] checked: bool,
    #[props(default)] label: Option<String>,
    #[props(default)] description: Option<String>,
    #[props(default)] disabled: bool,
    #[props(default)] onchange: Option<EventHandler<bool>>,
) -> Element {
    let handler = onchange.clone();
    let classes = if checked {
        "ds-check-control is-checked"
    } else {
        "ds-check-control"
    };

    rsx! {
        label {
            class: "{classes}",
            input {
                class: "ds-check-control__input",
                r#type: "checkbox",
                checked,
                disabled,
                onchange: move |event| {
                    if let Some(handler) = handler.as_ref() {
                        handler.call(event.checked());
                    }
                }
            }
            span { class: "ds-check-control__indicator", if checked { "✓" } }
            if label.is_some() || description.is_some() {
                span { class: "ds-check-control__body",
                    if let Some(label) = label {
                        span { class: "ds-check-control__label", "{label}" }
                    }
                    if let Some(description) = description {
                        span { class: "ds-check-control__description", "{description}" }
                    }
                }
            }
        }
    }
}

#[component]
pub fn Radio(
    #[props(default)] checked: bool,
    #[props(default)] label: Option<String>,
    #[props(default)] description: Option<String>,
    #[props(default)] disabled: bool,
    #[props(default)] onchange: Option<EventHandler<()>>,
) -> Element {
    let handler = onchange.clone();
    let classes = if checked {
        "ds-radio-control is-checked"
    } else {
        "ds-radio-control"
    };

    rsx! {
        label {
            class: "{classes}",
            input {
                class: "ds-radio-control__input",
                r#type: "radio",
                checked,
                disabled,
                onchange: move |_| {
                    if let Some(handler) = handler.as_ref() {
                        handler.call(());
                    }
                }
            }
            span { class: "ds-radio-control__indicator" }
            if label.is_some() || description.is_some() {
                span { class: "ds-radio-control__body",
                    if let Some(label) = label {
                        span { class: "ds-radio-control__label", "{label}" }
                    }
                    if let Some(description) = description {
                        span { class: "ds-radio-control__description", "{description}" }
                    }
                }
            }
        }
    }
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum SwitchSize {
    Sm,
    Md,
    Lg,
}

#[component]
pub fn Switch(
    #[props(default)] checked: bool,
    #[props(default)] disabled: bool,
    #[props(default = SwitchSize::Md)] size: SwitchSize,
    #[props(default)] onchange: Option<EventHandler<bool>>,
) -> Element {
    let handler = onchange.clone();
    let state_class = if checked { "is-checked" } else { "" };
    let size_class = match size {
        SwitchSize::Sm => "ds-switch--sm",
        SwitchSize::Md => "ds-switch--md",
        SwitchSize::Lg => "ds-switch--lg",
    };
    let classes = format!("ds-switch {} {}", state_class, size_class);

    rsx! {
        button {
            class: "{classes}",
            disabled,
            r#type: "button",
            onclick: move |event| {
                event.stop_propagation();
                if disabled {
                    return;
                }
                if let Some(handler) = handler.as_ref() {
                    handler.call(!checked);
                }
            },
            span { class: "ds-switch__thumb" }
        }
    }
}

#[component]
pub fn Slider(
    #[props(default = 0)] value: i32,
    #[props(default = 0)] min: i32,
    #[props(default = 100)] max: i32,
    #[props(default = 1)] step: i32,
    #[props(default)] onchange: Option<EventHandler<i32>>,
) -> Element {
    let handler = onchange.clone();
    let pct = if max > min {
        ((value - min) as f32 / (max - min) as f32 * 100.0).clamp(0.0, 100.0)
    } else {
        0.0
    };

    rsx! {
        div {
            class: "ds-slider",
            style: "--slider-progress: {pct}%;",
            input {
                class: "ds-slider__input",
                r#type: "range",
                min: min.to_string(),
                max: max.to_string(),
                step: step.to_string(),
                value: value.to_string(),
                oninput: move |event| {
                    if let Ok(next) = event.value().parse::<i32>() {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(next);
                        }
                    }
                }
            }
            span { class: "ds-slider__value", "{value}%" }
        }
    }
}
