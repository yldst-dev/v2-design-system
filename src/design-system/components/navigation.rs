use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;

#[derive(Clone, PartialEq)]
pub struct TabItem {
    pub value: String,
    pub label: String,
    pub icon: Option<IconKind>,
    pub badge: Option<String>,
}

#[derive(Clone, PartialEq)]
pub struct MenuItem {
    pub value: String,
    pub label: String,
    pub icon: Option<IconKind>,
    pub shortcut: Option<String>,
    pub danger: bool,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum TabsVariant {
    Underline,
    Pill,
    Segmented,
}

impl TabsVariant {
    fn class_name(self) -> &'static str {
        match self {
            Self::Underline => "ds-tabs--underline",
            Self::Pill => "ds-tabs--pill",
            Self::Segmented => "ds-tabs--segmented",
        }
    }
}

#[component]
pub fn Tabs(
    #[props(default)] tabs: Vec<TabItem>,
    #[props(default)] active: String,
    #[props(default = TabsVariant::Underline)] variant: TabsVariant,
    #[props(default)] on_change: Option<EventHandler<String>>,
) -> Element {
    let handler = on_change.clone();
    let classes = format!("ds-tabs {}", variant.class_name());

    rsx! {
        div { class: "{classes}",
            for tab in tabs {
                button {
                    key: "{tab.value}",
                    class: if tab.value == active { "ds-tabs__item is-active" } else { "ds-tabs__item" },
                    r#type: "button",
                    onclick: {
                        let value = tab.value.clone();
                        move |_| {
                            if let Some(handler) = handler.as_ref() {
                                handler.call(value.clone());
                            }
                        }
                    },
                    if let Some(icon) = tab.icon {
                        Icon { kind: icon, size: 14 }
                    }
                    span { "{tab.label}" }
                    if let Some(badge) = tab.badge {
                        span { class: "ds-tabs__badge", "{badge}" }
                    }
                }
            }
        }
    }
}

#[component]
pub fn Menu(
    trigger: Element,
    #[props(default)] items: Vec<MenuItem>,
    #[props(default)] align: Option<String>,
    #[props(default)] on_select: Option<EventHandler<String>>,
) -> Element {
    let mut open = use_signal(|| false);
    let handler = on_select.clone();
    let align_class = if align.unwrap_or_else(|| "left".to_string()) == "right" {
        "is-right"
    } else {
        ""
    };
    let classes = format!("ds-menu {}", align_class);

    rsx! {
        div {
            class: "{classes}",
            tabindex: "-1",
            onfocusout: move |event| {
                let _ = event;
                open.set(false);
            },
            div {
                class: "ds-menu__trigger",
                role: "button",
                tabindex: "0",
                onclick: move |_| open.set(!open()),
                {trigger}
            }
            if open() {
                div { class: "ds-menu__list",
                    for item in items {
                        button {
                            key: "{item.value}",
                            class: if item.danger { "ds-menu__item is-danger" } else { "ds-menu__item" },
                            r#type: "button",
                            onmousedown: {
                                let value = item.value.clone();
                                move |_| {
                                    if let Some(handler) = handler.as_ref() {
                                        handler.call(value.clone());
                                    }
                                    open.set(false);
                                }
                            },
                            if let Some(icon) = item.icon {
                                Icon { kind: icon, size: 14 }
                            }
                            span { class: "ds-menu__label", "{item.label}" }
                            if let Some(shortcut) = item.shortcut {
                                Kbd { "{shortcut}" }
                            }
                        }
                    }
                }
            }
        }
    }
}

#[component]
pub fn Kbd(children: Element) -> Element {
    rsx! {
        kbd { class: "ds-kbd", {children} }
    }
}

#[component]
pub fn Breadcrumb(#[props(default)] items: Vec<String>) -> Element {
    let last_index = items.len().saturating_sub(1);

    rsx! {
        nav { class: "ds-breadcrumb",
            for (index, item) in items.iter().cloned().enumerate() {
                if index > 0 {
                    span { class: "ds-breadcrumb__divider", Icon { kind: IconKind::ChevronRight, size: 12 } }
                }
                span {
                    class: if index == last_index {
                        "ds-breadcrumb__item is-current"
                    } else {
                        "ds-breadcrumb__item"
                    },
                    "{item}"
                }
            }
        }
    }
}

#[component]
pub fn Pagination(
    #[props(default = 1)] current: usize,
    #[props(default = 1)] total: usize,
    #[props(default)] on_change: Option<EventHandler<usize>>,
) -> Element {
    let handler = on_change.clone();
    let mut pages: Vec<Option<usize>> = Vec::new();
    for i in 1..=total {
        let keep = i == 1 || i == total || (i + 1 >= current && i <= current + 1);
        if keep {
            pages.push(Some(i));
        } else if i + 2 == current || i == current + 2 {
            pages.push(None);
        }
    }

    rsx! {
        div { class: "ds-pagination",
            button {
                class: "ds-pagination__nav",
                r#type: "button",
                disabled: current <= 1,
                "aria-label": "Previous page",
                onclick: move |_| {
                    if current > 1 {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(current - 1);
                        }
                    }
                },
                Icon { kind: IconKind::ChevronLeft, size: 14 }
            }
            for (idx, entry) in pages.iter().enumerate() {
                match entry {
                    Some(page) => {
                        let page = *page;
                        rsx! {
                            button {
                                key: "p-{idx}",
                                class: if page == current { "ds-pagination__page is-active" } else { "ds-pagination__page" },
                                r#type: "button",
                                onclick: move |_| {
                                    if let Some(handler) = handler.as_ref() {
                                        handler.call(page);
                                    }
                                },
                                "{page}"
                            }
                        }
                    }
                    None => rsx! {
                        span { key: "e-{idx}", class: "ds-pagination__ellipsis", "…" }
                    }
                }
            }
            button {
                class: "ds-pagination__nav",
                r#type: "button",
                disabled: current >= total,
                "aria-label": "Next page",
                onclick: move |_| {
                    if current < total {
                        if let Some(handler) = handler.as_ref() {
                            handler.call(current + 1);
                        }
                    }
                },
                Icon { kind: IconKind::ChevronRight, size: 14 }
            }
        }
    }
}
