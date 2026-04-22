use dioxus::prelude::*;

#[allow(dead_code)]
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum TextTag {
    P,
    Span,
    H1,
    H2,
    H3,
    Label,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum TextSize {
    Xs,
    Sm,
    Md,
    Lg,
    Xl,
    X2l,
    X3l,
    X5l,
}

#[allow(dead_code)]
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum TextWeight {
    Normal,
    Medium,
    Semibold,
    Bold,
}

impl TextSize {
    fn class_name(self) -> &'static str {
        match self {
            Self::Xs => "ds-text--xs",
            Self::Sm => "ds-text--sm",
            Self::Md => "ds-text--md",
            Self::Lg => "ds-text--lg",
            Self::Xl => "ds-text--xl",
            Self::X2l => "ds-text--2xl",
            Self::X3l => "ds-text--3xl",
            Self::X5l => "ds-text--5xl",
        }
    }
}

impl TextWeight {
    fn class_name(self) -> &'static str {
        match self {
            Self::Normal => "ds-text--normal",
            Self::Medium => "ds-text--medium",
            Self::Semibold => "ds-text--semibold",
            Self::Bold => "ds-text--bold",
        }
    }
}

#[component]
pub fn Text(
    children: Element,
    #[props(default = TextTag::P)] tag: TextTag,
    #[props(default = TextSize::Md)] size: TextSize,
    #[props(default = TextWeight::Normal)] weight: TextWeight,
    #[props(default)] tone: Option<String>,
    #[props(default)] class: Option<String>,
) -> Element {
    let tone_class = tone.unwrap_or_default();
    let extra_class = class.unwrap_or_default();
    let classes = format!(
        "ds-text {} {} {} {}",
        size.class_name(),
        weight.class_name(),
        tone_class,
        extra_class
    );

    match tag {
        TextTag::Span => rsx! { span { class: "{classes}", {children} } },
        TextTag::H1 => rsx! { h1 { class: "{classes}", {children} } },
        TextTag::H2 => rsx! { h2 { class: "{classes}", {children} } },
        TextTag::H3 => rsx! { h3 { class: "{classes}", {children} } },
        TextTag::Label => rsx! { label { class: "{classes}", {children} } },
        TextTag::P => rsx! { p { class: "{classes}", {children} } },
    }
}
