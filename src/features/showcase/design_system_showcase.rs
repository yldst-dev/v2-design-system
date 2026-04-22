use crate::design_system::components::{
    Accordion, AccordionItem, Alert, AlertVariant, Avatar, AvatarGroup, AvatarItem, Badge,
    BadgeVariant, Banner, BannerVariant, Breadcrumb, Button, ButtonSize, ButtonVariant, Card,
    Checkbox, CircularProgress, Divider, Drawer, EmptyState, Field, IconButton, Input, Kbd, Menu,
    MenuItem, Modal, ModalSize, Pagination, Progress, ProgressVariant, Radio, Select, SelectOption,
    Skeleton, Slider, Spinner, Stat, Switch, SwitchSize, TabItem, Table, TableColumn, Tabs,
    TabsVariant, Text, TextSize, TextTag, TextWeight, Textarea, Toast, ToastEntry, ToastVariant,
    Tooltip,
};
use crate::design_system::theme::use_theme;
use crate::design_system::{Icon, IconKind};
use dioxus::prelude::*;
use std::time::Duration;

#[derive(Clone)]
struct NavGroup {
    label: &'static str,
    items: Vec<NavItem>,
}

#[derive(Clone, Copy)]
struct NavItem {
    id: &'static str,
    label: &'static str,
    icon: IconKind,
}

#[derive(Clone, Copy, PartialEq)]
struct UserRecord {
    initials: &'static str,
    name: &'static str,
    email: &'static str,
    role: &'static str,
    status: &'static str,
    last_active: &'static str,
    avatar_tone: &'static str,
}

#[component]
pub fn DesignSystemShowcase() -> Element {
    let theme = use_theme();
    let palette = theme.palette();

    let mut active_section = use_signal(|| "intro".to_string());
    let mut scroll_observer_started = use_signal(|| false);
    let mut tab_underline = use_signal(|| "overview".to_string());
    let mut tab_pill = use_signal(|| "all".to_string());
    let mut tab_segmented = use_signal(|| "grid".to_string());
    let mut select_fruit = use_signal(|| "apple".to_string());
    let mut select_tz = use_signal(|| "kr".to_string());
    let mut input_email = use_signal(|| "".to_string());
    let mut input_search = use_signal(|| "V2 Design System".to_string());
    let mut textarea_notes = use_signal(|| "".to_string());
    let mut slider_value = use_signal(|| 42i32);
    let mut check_email = use_signal(|| true);
    let mut check_marketing = use_signal(|| false);
    let mut check_terms = use_signal(|| true);
    let mut radio_plan = use_signal(|| "team".to_string());
    let mut switch_public = use_signal(|| true);
    let mut switch_2fa = use_signal(|| false);
    let mut page_value = use_signal(|| 3usize);
    let mut modal_create_open = use_signal(|| false);
    let mut modal_confirm_open = use_signal(|| false);
    let mut drawer_open = use_signal(|| false);
    let mut toast_seed = use_signal(|| 1u32);
    let mut toasts = use_signal(Vec::<ToastEntry>::new);

    let nav_groups = vec![
        NavGroup {
            label: "Getting Started",
            items: vec![
                NavItem {
                    id: "intro",
                    label: "Introduction",
                    icon: IconKind::Sparkles,
                },
                NavItem {
                    id: "foundation",
                    label: "Foundation",
                    icon: IconKind::Palette,
                },
                NavItem {
                    id: "typography",
                    label: "Typography",
                    icon: IconKind::Type,
                },
            ],
        },
        NavGroup {
            label: "Inputs",
            items: vec![
                NavItem {
                    id: "buttons",
                    label: "Buttons",
                    icon: IconKind::Box,
                },
                NavItem {
                    id: "form-inputs",
                    label: "Form Inputs",
                    icon: IconKind::Edit,
                },
                NavItem {
                    id: "selection",
                    label: "Selection",
                    icon: IconKind::Check,
                },
            ],
        },
        NavGroup {
            label: "Data Display",
            items: vec![
                NavItem {
                    id: "badges",
                    label: "Badges",
                    icon: IconKind::Tag,
                },
                NavItem {
                    id: "avatars",
                    label: "Avatars",
                    icon: IconKind::User,
                },
                NavItem {
                    id: "cards",
                    label: "Cards",
                    icon: IconKind::Layers,
                },
                NavItem {
                    id: "table",
                    label: "Table",
                    icon: IconKind::Grid,
                },
                NavItem {
                    id: "stats",
                    label: "Stats",
                    icon: IconKind::BarChart,
                },
            ],
        },
        NavGroup {
            label: "Navigation",
            items: vec![
                NavItem {
                    id: "tabs",
                    label: "Tabs",
                    icon: IconKind::Folder,
                },
                NavItem {
                    id: "breadcrumb",
                    label: "Breadcrumb",
                    icon: IconKind::ChevronRight,
                },
                NavItem {
                    id: "pagination",
                    label: "Pagination",
                    icon: IconKind::More,
                },
                NavItem {
                    id: "menu",
                    label: "Menu",
                    icon: IconKind::List,
                },
            ],
        },
        NavGroup {
            label: "Feedback",
            items: vec![
                NavItem {
                    id: "alerts",
                    label: "Alerts",
                    icon: IconKind::Bell,
                },
                NavItem {
                    id: "progress",
                    label: "Progress",
                    icon: IconKind::Activity,
                },
                NavItem {
                    id: "skeleton",
                    label: "Skeleton",
                    icon: IconKind::Loader,
                },
                NavItem {
                    id: "empty",
                    label: "Empty State",
                    icon: IconKind::Box,
                },
            ],
        },
        NavGroup {
            label: "Overlays",
            items: vec![
                NavItem {
                    id: "modal",
                    label: "Modal",
                    icon: IconKind::Layers,
                },
                NavItem {
                    id: "drawer",
                    label: "Drawer",
                    icon: IconKind::Menu,
                },
                NavItem {
                    id: "tooltip",
                    label: "Tooltip",
                    icon: IconKind::Info,
                },
                NavItem {
                    id: "toast",
                    label: "Toast",
                    icon: IconKind::Send,
                },
            ],
        },
        NavGroup {
            label: "Utility",
            items: vec![
                NavItem {
                    id: "accordion",
                    label: "Accordion",
                    icon: IconKind::ChevronDown,
                },
                NavItem {
                    id: "divider",
                    label: "Divider",
                    icon: IconKind::More,
                },
                NavItem {
                    id: "kbd",
                    label: "Keyboard",
                    icon: IconKind::Command,
                },
            ],
        },
        NavGroup {
            label: "Patterns",
            items: vec![
                NavItem {
                    id: "forms",
                    label: "Forms",
                    icon: IconKind::FileText,
                },
                NavItem {
                    id: "dashboard",
                    label: "Dashboard",
                    icon: IconKind::BarChart,
                },
            ],
        },
    ];

    let fruit_options = vec![
        SelectOption {
            value: "apple".to_string(),
            label: "Apple".to_string(),
        },
        SelectOption {
            value: "banana".to_string(),
            label: "Banana".to_string(),
        },
        SelectOption {
            value: "cherry".to_string(),
            label: "Cherry".to_string(),
        },
        SelectOption {
            value: "date".to_string(),
            label: "Date".to_string(),
        },
    ];

    let tz_options = vec![
        SelectOption {
            value: "kr".to_string(),
            label: "🇰🇷 Seoul (UTC+9)".to_string(),
        },
        SelectOption {
            value: "us".to_string(),
            label: "🇺🇸 New York (UTC-5)".to_string(),
        },
        SelectOption {
            value: "uk".to_string(),
            label: "🇬🇧 London (UTC+0)".to_string(),
        },
    ];

    let underline_tabs = vec![
        TabItem {
            value: "overview".to_string(),
            label: "Overview".to_string(),
            icon: Some(IconKind::Home),
            badge: None,
        },
        TabItem {
            value: "analytics".to_string(),
            label: "Analytics".to_string(),
            icon: Some(IconKind::BarChart),
            badge: Some("12".to_string()),
        },
        TabItem {
            value: "reports".to_string(),
            label: "Reports".to_string(),
            icon: Some(IconKind::FileText),
            badge: None,
        },
        TabItem {
            value: "settings".to_string(),
            label: "Settings".to_string(),
            icon: Some(IconKind::Settings),
            badge: None,
        },
    ];
    let pill_tabs = vec![
        TabItem {
            value: "all".to_string(),
            label: "All".to_string(),
            icon: None,
            badge: None,
        },
        TabItem {
            value: "active".to_string(),
            label: "Active".to_string(),
            icon: None,
            badge: None,
        },
        TabItem {
            value: "archived".to_string(),
            label: "Archived".to_string(),
            icon: None,
            badge: None,
        },
    ];
    let segmented_tabs = vec![
        TabItem {
            value: "grid".to_string(),
            label: "Grid".to_string(),
            icon: Some(IconKind::Grid),
            badge: None,
        },
        TabItem {
            value: "list".to_string(),
            label: "List".to_string(),
            icon: Some(IconKind::List),
            badge: None,
        },
    ];

    let action_menu_items = vec![
        MenuItem {
            value: "new-file".to_string(),
            label: "New file".to_string(),
            icon: Some(IconKind::FileText),
            shortcut: Some("⌘N".to_string()),
            danger: false,
        },
        MenuItem {
            value: "new-folder".to_string(),
            label: "New folder".to_string(),
            icon: Some(IconKind::Folder),
            shortcut: Some("⌘⇧N".to_string()),
            danger: false,
        },
        MenuItem {
            value: "share".to_string(),
            label: "Share".to_string(),
            icon: Some(IconKind::Share),
            shortcut: None,
            danger: false,
        },
        MenuItem {
            value: "download".to_string(),
            label: "Download".to_string(),
            icon: Some(IconKind::Download),
            shortcut: None,
            danger: false,
        },
        MenuItem {
            value: "delete".to_string(),
            label: "Delete".to_string(),
            icon: Some(IconKind::Trash),
            shortcut: Some("⌫".to_string()),
            danger: true,
        },
    ];
    let icon_menu_items = vec![
        MenuItem {
            value: "edit".to_string(),
            label: "Edit".to_string(),
            icon: Some(IconKind::Edit),
            shortcut: None,
            danger: false,
        },
        MenuItem {
            value: "duplicate".to_string(),
            label: "Duplicate".to_string(),
            icon: Some(IconKind::Copy),
            shortcut: None,
            danger: false,
        },
        MenuItem {
            value: "archive".to_string(),
            label: "Archive".to_string(),
            icon: Some(IconKind::Bookmark),
            shortcut: None,
            danger: false,
        },
    ];

    let user_rows = vec![
        UserRecord {
            initials: "JD",
            name: "Jane Doe",
            email: "jane@example.com",
            role: "Admin",
            status: "Active",
            last_active: "2 min ago",
            avatar_tone: "tone-primary",
        },
        UserRecord {
            initials: "MK",
            name: "Mike Kim",
            email: "mike@example.com",
            role: "Editor",
            status: "Active",
            last_active: "5 min ago",
            avatar_tone: "tone-info",
        },
        UserRecord {
            initials: "SL",
            name: "Sarah Lee",
            email: "sarah@example.com",
            role: "Viewer",
            status: "Inactive",
            last_active: "3 days ago",
            avatar_tone: "tone-success",
        },
        UserRecord {
            initials: "AW",
            name: "Alex Wong",
            email: "alex@example.com",
            role: "Editor",
            status: "Active",
            last_active: "1 hour ago",
            avatar_tone: "tone-warning",
        },
    ];

    let accordion_items = vec![
        AccordionItem { title: "이 디자인 시스템은 어떻게 사용하나요?".to_string(), content: "각 컴포넌트는 독립적으로 사용 가능하며, ThemeCtx를 통해 테마를 주입하면 됩니다. 모든 컴포넌트는 tree-shakeable 합니다.".to_string() },
        AccordionItem { title: "다크 모드는 어떻게 지원되나요?".to_string(), content: "ThemeCtx의 isDark 상태를 토글하면 palette.light 또는 palette.dark가 자동으로 적용됩니다. localStorage와 연동하여 유저 선호를 저장할 수 있습니다.".to_string() },
        AccordionItem { title: "커스텀 테마를 만들 수 있나요?".to_string(), content: "네. palette 객체를 복사해서 원하는 색상으로 커스터마이징하면 됩니다. 모든 컴포넌트는 토큰 기반으로 스타일링되어 있어 일관성이 유지됩니다.".to_string() },
        AccordionItem { title: "접근성은 어떻게 보장되나요?".to_string(), content: "WCAG AA 기준 대비비 준수, 키보드 네비게이션, aria-label 등을 기본 지원합니다. 스크린 리더 호환성도 테스트되어 있습니다.".to_string() },
    ];

    let card_avatars = vec![
        AvatarItem {
            initials: "A".to_string(),
            color_class: "tone-primary".to_string(),
        },
        AvatarItem {
            initials: "B".to_string(),
            color_class: "tone-info".to_string(),
        },
        AvatarItem {
            initials: "C".to_string(),
            color_class: "tone-success".to_string(),
        },
    ];
    let group_avatars = vec![
        AvatarItem {
            initials: "JD".to_string(),
            color_class: "tone-primary".to_string(),
        },
        AvatarItem {
            initials: "MK".to_string(),
            color_class: "tone-info".to_string(),
        },
        AvatarItem {
            initials: "SL".to_string(),
            color_class: "tone-success".to_string(),
        },
        AvatarItem {
            initials: "AW".to_string(),
            color_class: "tone-warning".to_string(),
        },
        AvatarItem {
            initials: "BR".to_string(),
            color_class: "tone-danger".to_string(),
        },
        AvatarItem {
            initials: "CD".to_string(),
            color_class: "tone-primary".to_string(),
        },
        AvatarItem {
            initials: "EF".to_string(),
            color_class: "tone-info".to_string(),
        },
    ];

    let neutral_swatches: Vec<(&'static str, &'static str)> = vec![
        ("n0", palette.n0),
        ("n50", palette.n50),
        ("n100", palette.n100),
        ("n200", palette.n200),
        ("n300", palette.n300),
        ("n400", palette.n400),
        ("n500", palette.n500),
        ("n600", palette.n600),
        ("n700", palette.n700),
        ("n800", palette.n800),
        ("n900", palette.n900),
    ];
    let primary_swatches: Vec<(&'static str, &'static str)> = vec![
        ("p50", palette.p50),
        ("p100", palette.p100),
        ("p200", palette.p200),
        ("p300", palette.p300),
        ("p400", palette.p400),
        ("p500", palette.p500),
        ("p600", palette.p600),
        ("p700", palette.p700),
    ];
    let semantic_rows: Vec<(&'static str, [&'static str; 4])> = vec![
        (
            "Success",
            [palette.s50, palette.s100, palette.s500, palette.s600],
        ),
        (
            "Warning",
            [palette.w50, palette.w100, palette.w500, palette.w600],
        ),
        (
            "Error",
            [palette.e50, palette.e100, palette.e500, palette.e600],
        ),
        (
            "Info",
            [palette.i50, palette.i100, palette.i500, palette.i600],
        ),
    ];
    let spacing_scale: Vec<(&'static str, &'static str)> = vec![
        ("1", "4px"),
        ("2", "8px"),
        ("3", "12px"),
        ("4", "16px"),
        ("5", "20px"),
        ("6", "24px"),
        ("8", "32px"),
        ("10", "40px"),
        ("12", "48px"),
        ("16", "64px"),
    ];
    let radius_scale: Vec<(&'static str, &'static str)> = vec![
        ("sm", "6px"),
        ("md", "8px"),
        ("lg", "10px"),
        ("xl", "14px"),
        ("2xl", "20px"),
        ("full", "9999px"),
    ];
    let shadow_scale: Vec<(&'static str, &'static str)> = vec![
        ("xs", "0 1px 2px rgba(139,115,85,0.04)"),
        (
            "sm",
            "0 1px 3px rgba(139,115,85,0.06), 0 1px 2px rgba(139,115,85,0.04)",
        ),
        (
            "md",
            "0 4px 8px rgba(139,115,85,0.06), 0 2px 4px rgba(139,115,85,0.04)",
        ),
        (
            "lg",
            "0 12px 24px rgba(139,115,85,0.08), 0 4px 8px rgba(139,115,85,0.04)",
        ),
        (
            "xl",
            "0 24px 48px rgba(139,115,85,0.12), 0 8px 16px rgba(139,115,85,0.06)",
        ),
    ];

    let typography_rows: Vec<(
        &'static str,
        TextSize,
        TextWeight,
        &'static str,
        &'static str,
    )> = vec![
        (
            "Display 5xl",
            TextSize::X5l,
            TextWeight::Semibold,
            "48px",
            "Design with intention",
        ),
        (
            "Display 3xl",
            TextSize::X3l,
            TextWeight::Semibold,
            "28px",
            "Design with intention",
        ),
        (
            "Heading 2xl",
            TextSize::X2l,
            TextWeight::Semibold,
            "22px",
            "Design with intention",
        ),
        (
            "Heading xl",
            TextSize::Xl,
            TextWeight::Semibold,
            "18px",
            "Design with intention",
        ),
        (
            "Body lg",
            TextSize::Lg,
            TextWeight::Normal,
            "16px",
            "The quick brown fox jumps over the lazy dog",
        ),
        (
            "Body md",
            TextSize::Md,
            TextWeight::Normal,
            "14px",
            "The quick brown fox jumps over the lazy dog",
        ),
        (
            "Caption sm",
            TextSize::Sm,
            TextWeight::Medium,
            "12px",
            "The quick brown fox",
        ),
        (
            "Micro xs",
            TextSize::Xs,
            TextWeight::Medium,
            "11px",
            "Metadata label",
        ),
    ];

    let toasts_list = toasts();

    use_effect(move || {
        if scroll_observer_started() {
            return;
        }
        scroll_observer_started.set(true);
        let mut setter = active_section;
        let mut eval = document::eval(
            r#"
            const scroller = document.querySelector('.showcase-scroll');
            if (!scroller) return;
            const ids = Array.from(scroller.querySelectorAll('section[id]')).map(s => s.id);
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        dioxus.send(entry.target.id);
                    }
                }
            }, { root: scroller, rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
            "#,
        );
        spawn(async move {
            while let Ok(msg) = eval.recv::<String>().await {
                setter.set(msg);
            }
        });
    });

    let mut push_toast = move |title: &'static str,
                               description: &'static str,
                               variant: ToastVariant| {
        let id = toast_seed();
        let mut next = toasts();
        next.push(ToastEntry {
            id,
            title: title.to_string(),
            description: description.to_string(),
            variant,
            leaving: false,
        });
        toasts.set(next);
        toast_seed.set(id + 1);

        spawn(async move {
            tokio::time::sleep(Duration::from_millis(4000)).await;
            let mut next = toasts();
            let Some(index) = next.iter().position(|t| t.id == id) else {
                return;
            };
            if next[index].leaving {
                return;
            }
            next[index].leaving = true;
            toasts.set(next);
            tokio::time::sleep(Duration::from_millis(180)).await;
            let remaining: Vec<ToastEntry> = toasts().into_iter().filter(|t| t.id != id).collect();
            toasts.set(remaining);
        });
    };

    rsx! {
        div { class: "showcase-shell",
            aside { class: "showcase-sidebar",
                div { class: "showcase-brand",
                    div { class: "showcase-brand__mark", Icon { kind: IconKind::Sparkles, size: 15 } }
                    div {
                        div { class: "showcase-brand__title", "V2 Design System" }
                        div { class: "showcase-brand__subtitle", "0.1 · Production" }
                    }
                }
                for group in nav_groups.clone() {
                    div { class: "showcase-nav-group",
                        div { class: "showcase-nav-group__label", "{group.label}" }
                        for item in group.items.clone() {
                            button {
                                r#type: "button",
                                key: "{item.id}",
                                class: if active_section() == item.id { "showcase-nav-item is-active" } else { "showcase-nav-item" },
                                onclick: move |_| {
                                    active_section.set(item.id.to_string());
                                    let id = item.id;
                                    document::eval(&format!(
                                        r#"
                                        const el = document.getElementById('{id}');
                                        const scroller = document.querySelector('.showcase-scroll');
                                        const topbar = document.querySelector('.showcase-topbar');
                                        if (el && scroller) {{
                                            const topbarHeight = topbar ? topbar.offsetHeight : 0;
                                            const top = Math.max(0, el.offsetTop - topbarHeight - 24);
                                            scroller.scrollTo({{ top, behavior: 'smooth' }});
                                        }}
                                        "#
                                    ));
                                },
                                Icon { kind: item.icon, size: 14 }
                                span { "{item.label}" }
                            }
                        }
                    }
                }
            }

            main { class: "showcase-content",
                header { class: "showcase-topbar",
                    Breadcrumb { items: vec!["V2 Design System".to_string(), "Components".to_string(), "All".to_string()] }
                    div { class: "showcase-topbar__actions",
                        div { class: "showcase-kbd-hint",
                            Icon { kind: IconKind::Command, size: 12 }
                            span { "K" }
                        }
                        IconButton { icon: Some(IconKind::Github), label: Some("Github".to_string()) }
                        IconButton { icon: Some(IconKind::Figma), label: Some("Figma".to_string()) }
                        Divider { vertical: true }
                        IconButton {
                            icon: Some(if theme.is_dark() { IconKind::Sun } else { IconKind::Moon }),
                            variant: ButtonVariant::Secondary,
                            label: Some("Toggle theme".to_string()),
                            onclick: move |_| theme.toggle()
                        }
                    }
                }

                div { class: "showcase-scroll",
                    section { id: "intro", class: "showcase-section showcase-hero",
                        Badge { variant: BadgeVariant::Primary, "0.1 · April 2026" }
                        Text { tag: TextTag::H1, size: TextSize::X5l, weight: TextWeight::Semibold,
                            class: Some("showcase-hero__title".to_string()),
                            "A production-ready design system."
                        }
                        Text { size: TextSize::Lg, tone: Some("tone-muted".to_string()),
                            class: Some("showcase-hero__copy".to_string()),
                            "35+ fully accessible components with warm neutral aesthetics. Built for modern web apps — light/dark modes, extensive tokens, and drop-in Dioxus components."
                        }
                        div { class: "showcase-hero__actions",
                            Button { icon: Some(IconKind::Zap), "Get started" }
                            Button { variant: ButtonVariant::Secondary, icon: Some(IconKind::Github), "View on GitHub" }
                            Button { variant: ButtonVariant::Ghost, icon_right: Some(IconKind::ArrowUpRight), "Documentation" }
                        }
                        div { class: "showcase-kpis",
                            HeroKpi { icon: IconKind::Box,     label: "Components",    value: "35+" }
                            HeroKpi { icon: IconKind::Palette, label: "Design tokens", value: "120+" }
                            HeroKpi { icon: IconKind::Sun,     label: "Theme modes",   value: "2" }
                            HeroKpi { icon: IconKind::Package, label: "Bundle size",   value: "12kb" }
                        }
                    }

                    Section { id: "foundation", title: "Foundation", description: "디자인 토큰은 전체 시스템의 기초입니다. 색상, 간격, 반경, 그림자 등이 일관된 룰로 정의됩니다.",
                        SubSection { title: "Neutral scale (warm)",
                            Demo { padding: "16px",
                                div { class: "swatch-grid",
                                    for (name, value) in neutral_swatches.clone() {
                                        div { key: "{name}", class: "swatch",
                                            div { class: "swatch__chip swatch__chip--bordered", style: "background: {value};" }
                                            div { class: "swatch__name", "{name}" }
                                            div { class: "swatch__value", "{value}" }
                                        }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Primary (terracotta)",
                            Demo { padding: "16px",
                                div { class: "swatch-grid",
                                    for (name, value) in primary_swatches.clone() {
                                        div { key: "{name}", class: "swatch",
                                            div { class: "swatch__chip", style: "background: {value};" }
                                            div { class: "swatch__name", "{name}" }
                                            div { class: "swatch__value", "{value}" }
                                        }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Semantic",
                            Demo { padding: "16px",
                                div { class: "semantic-grid",
                                    for (name, values) in semantic_rows.clone() {
                                        div { key: "{name}", class: "semantic-cell",
                                            div { class: "semantic-cell__name", "{name}" }
                                            div { class: "semantic-cell__bar",
                                                for v in values.iter() {
                                                    div { class: "semantic-cell__slice", style: "background: {v};" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Spacing scale",
                            Demo { padding: "16px",
                                div { class: "scale-row",
                                    for (k, v) in spacing_scale.clone() {
                                        div { key: "{k}", class: "scale-cell",
                                            div { class: "scale-cell__box", style: "width: {v}; height: {v}; background: {palette.p500};" }
                                            div { class: "scale-cell__name", "{k}" }
                                            div { class: "scale-cell__value", "{v}" }
                                        }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Border radius",
                            Demo { padding: "16px",
                                div { class: "scale-row",
                                    for (k, v) in radius_scale.clone() {
                                        div { key: "{k}", class: "scale-cell",
                                            div { class: "scale-cell__box scale-cell__box--radius", style: "border-radius: {v}; background: {palette.p100}; border-color: {palette.p200};" }
                                            div { class: "scale-cell__name", "{k}" }
                                            div { class: "scale-cell__value", "{v}" }
                                        }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Shadows",
                            Demo { padding: "24px",
                                div { class: "shadow-grid",
                                    for (k, v) in shadow_scale.clone() {
                                        div { key: "{k}", class: "shadow-cell",
                                            div { class: "shadow-cell__box", style: "box-shadow: {v}; background: {palette.n0}; border-color: {palette.n200};" }
                                            div { class: "shadow-cell__name", "shadow.{k}" }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "typography", title: "Typography", description: "System UI 폰트 기반의 일관된 타이포그래피 스케일.",
                        Demo {
                            div { class: "type-stack",
                                for (label, size, weight, px, sample) in typography_rows.clone() {
                                    div { key: "{label}", class: "type-row",
                                        span { class: "type-row__label", "{label}" }
                                        span { class: "type-row__token", "{px}" }
                                        Text { size: size, weight: weight, "{sample}" }
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "buttons", title: "Buttons", description: "6개 variant × 4개 size. 아이콘, 로딩 상태, disabled 상태를 모두 지원합니다.",
                        SubSection { title: "Variants",
                            Demo {
                                div { class: "row wrap",
                                    Button { "Primary" }
                                    Button { variant: ButtonVariant::Secondary, "Secondary" }
                                    Button { variant: ButtonVariant::Outline, "Outline" }
                                    Button { variant: ButtonVariant::Ghost, "Ghost" }
                                    Button { variant: ButtonVariant::Destructive, "Destructive" }
                                    Button { variant: ButtonVariant::Link, "Link" }
                                }
                            }
                        }
                        SubSection { title: "Sizes",
                            Demo {
                                div { class: "row wrap align-center",
                                    Button { size: ButtonSize::Xs, "Extra small" }
                                    Button { size: ButtonSize::Sm, "Small" }
                                    Button { size: ButtonSize::Md, "Medium" }
                                    Button { size: ButtonSize::Lg, "Large" }
                                }
                            }
                        }
                        SubSection { title: "With icons",
                            Demo {
                                div { class: "row wrap",
                                    Button { icon: Some(IconKind::Plus), "New project" }
                                    Button { variant: ButtonVariant::Secondary, icon_right: Some(IconKind::ArrowRight), "Continue" }
                                    Button { variant: ButtonVariant::Outline, icon: Some(IconKind::Download), "Download" }
                                    Button { variant: ButtonVariant::Ghost, icon: Some(IconKind::Heart), "Favorite" }
                                    Button { variant: ButtonVariant::Destructive, icon: Some(IconKind::Trash), "Delete" }
                                }
                            }
                        }
                        SubSection { title: "States",
                            Demo {
                                div { class: "row wrap",
                                    Button { loading: true, "Loading" }
                                    Button { disabled: true, "Disabled" }
                                    Button { variant: ButtonVariant::Secondary, disabled: true, "Secondary disabled" }
                                }
                            }
                        }
                        SubSection { title: "Icon buttons",
                            Demo {
                                div { class: "row align-center",
                                    IconButton { icon: Some(IconKind::Bell), label: Some("Notifications".to_string()) }
                                    IconButton { icon: Some(IconKind::Settings), variant: ButtonVariant::Secondary, label: Some("Settings".to_string()) }
                                    IconButton { icon: Some(IconKind::Plus), variant: ButtonVariant::Primary, label: Some("Add".to_string()) }
                                    IconButton { icon: Some(IconKind::Edit), size: ButtonSize::Sm, label: Some("Edit".to_string()) }
                                    IconButton { icon: Some(IconKind::Share), size: ButtonSize::Lg, variant: ButtonVariant::Secondary, label: Some("Share".to_string()) }
                                }
                            }
                        }
                    }

                    Section { id: "form-inputs", title: "Form Inputs", description: "텍스트 입력, 패스워드, 검색 등 다양한 입력 필드.",
                        Demo {
                            div { class: "form-grid",
                                Field {
                                    label: Some("Email".to_string()),
                                    required: true,
                                    hint: Some("업무용 이메일을 사용해주세요.".to_string()),
                                    Input {
                                        value: input_email(),
                                        placeholder: Some("you@example.com".to_string()),
                                        icon: Some(IconKind::Mail),
                                        oninput: move |v| input_email.set(v)
                                    }
                                }
                                Field {
                                    label: Some("Password".to_string()),
                                    required: true,
                                    Input {
                                        value: "".to_string(),
                                        placeholder: Some("Enter password".to_string()),
                                        icon: Some(IconKind::Lock)
                                    }
                                }
                                Field {
                                    label: Some("Search".to_string()),
                                    Input {
                                        value: input_search(),
                                        placeholder: Some("Search anything...".to_string()),
                                        icon: Some(IconKind::Search),
                                        oninput: move |v| input_search.set(v)
                                    }
                                }
                                Field {
                                    label: Some("Username".to_string()),
                                    error: Some("이 사용자명은 이미 사용 중입니다.".to_string()),
                                    Input {
                                        value: "".to_string(),
                                        placeholder: Some("username".to_string()),
                                        icon: Some(IconKind::User),
                                        error: true
                                    }
                                }
                                Field {
                                    label: Some("Description".to_string()),
                                    hint: Some("최대 200자까지 입력 가능합니다.".to_string()),
                                    Textarea {
                                        value: textarea_notes(),
                                        oninput: move |v| textarea_notes.set(v)
                                    }
                                }
                                Field {
                                    label: Some("Framework".to_string()),
                                    Select {
                                        options: fruit_options.clone(),
                                        value: select_fruit(),
                                        placeholder: Some("Select a fruit".to_string()),
                                        onselect: move |v| select_fruit.set(v)
                                    }
                                }
                                Field {
                                    label: Some("Volume".to_string()),
                                    Slider {
                                        value: slider_value(),
                                        onchange: move |v| slider_value.set(v)
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "selection", title: "Selection controls", description: "Checkbox, Radio, Switch — 선택형 컨트롤.",
                        Demo {
                            div { class: "selection-grid",
                                div { class: "selection-column",
                                    div { class: "selection-column__title", "Checkbox" }
                                    div { class: "stack",
                                        Checkbox {
                                            checked: check_email(),
                                            label: Some("이메일 알림 받기".to_string()),
                                            description: Some("중요한 업데이트와 주간 요약을 받습니다.".to_string()),
                                            onchange: move |v| check_email.set(v)
                                        }
                                        Checkbox {
                                            checked: check_marketing(),
                                            label: Some("마케팅 이메일".to_string()),
                                            onchange: move |v| check_marketing.set(v)
                                        }
                                        Checkbox {
                                            checked: check_terms(),
                                            label: Some("이용약관 동의".to_string()),
                                            onchange: move |v| check_terms.set(v)
                                        }
                                        Checkbox {
                                            checked: false,
                                            label: Some("Disabled option".to_string()),
                                            disabled: true
                                        }
                                    }
                                }
                                div { class: "selection-column",
                                    div { class: "selection-column__title", "Radio" }
                                    div { class: "stack",
                                        Radio {
                                            checked: radio_plan() == "personal",
                                            label: Some("Personal".to_string()),
                                            description: Some("개인 사용자용".to_string()),
                                            onchange: move |_| radio_plan.set("personal".to_string())
                                        }
                                        Radio {
                                            checked: radio_plan() == "team",
                                            label: Some("Team".to_string()),
                                            description: Some("소규모 팀에 적합".to_string()),
                                            onchange: move |_| radio_plan.set("team".to_string())
                                        }
                                        Radio {
                                            checked: radio_plan() == "enterprise",
                                            label: Some("Enterprise".to_string()),
                                            description: Some("대규모 조직용".to_string()),
                                            onchange: move |_| radio_plan.set("enterprise".to_string())
                                        }
                                    }
                                }
                                div { class: "selection-column",
                                    div { class: "selection-column__title", "Switch" }
                                    div { class: "stack",
                                        div {
                                            class: "selection-switch-field",
                                            onclick: move |_| switch_public.set(!switch_public()),
                                            Switch { checked: switch_public(), onchange: move |v| switch_public.set(v) }
                                            div {
                                                div { class: "selection-switch__label", "공개 프로필" }
                                                div { class: "selection-switch__desc", "다른 사용자가 볼 수 있습니다" }
                                            }
                                        }
                                        div {
                                            class: "selection-switch-field",
                                            onclick: move |_| switch_2fa.set(!switch_2fa()),
                                            Switch { checked: switch_2fa(), size: SwitchSize::Sm, onchange: move |v| switch_2fa.set(v) }
                                            span { class: "selection-switch__label", "2단계 인증 (Small)" }
                                        }
                                        div {
                                            class: "selection-switch-field",
                                            Switch { checked: true, size: SwitchSize::Lg }
                                            span { class: "selection-switch__label", "자동 저장 (Large)" }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "badges", title: "Badges", description: "상태, 카테고리, 카운트 등을 표시.",
                        SubSection { title: "Variants",
                            Demo {
                                div { class: "row wrap",
                                    Badge { "Default" }
                                    Badge { variant: BadgeVariant::Primary, "Primary" }
                                    Badge { variant: BadgeVariant::Success, "Success" }
                                    Badge { variant: BadgeVariant::Warning, "Warning" }
                                    Badge { variant: BadgeVariant::Error, "Error" }
                                    Badge { variant: BadgeVariant::Info, "Info" }
                                    Badge { variant: BadgeVariant::Outline, "Outline" }
                                }
                            }
                        }
                        SubSection { title: "With dot indicator",
                            Demo {
                                div { class: "row wrap",
                                    Badge { variant: BadgeVariant::Success, dot: true, "Active" }
                                    Badge { variant: BadgeVariant::Warning, dot: true, "Pending" }
                                    Badge { variant: BadgeVariant::Error, dot: true, "Failed" }
                                    Badge { variant: BadgeVariant::Info, dot: true, "Processing" }
                                }
                            }
                        }
                        SubSection { title: "Removable tags",
                            Demo {
                                div { class: "row wrap",
                                    Badge { variant: BadgeVariant::Primary, removable: true, "design" }
                                    Badge { variant: BadgeVariant::Primary, removable: true, "typescript" }
                                    Badge { variant: BadgeVariant::Primary, removable: true, "react" }
                                    Badge { variant: BadgeVariant::Primary, removable: true, "ui-kit" }
                                }
                            }
                        }
                    }

                    Section { id: "avatars", title: "Avatars", description: "사용자 표시. 이니셜, 상태 인디케이터, 그룹 지원.",
                        SubSection { title: "Sizes",
                            Demo {
                                div { class: "row align-center",
                                    div { class: "ds-avatar ds-avatar--xs tone-primary", "XS" }
                                    div { class: "ds-avatar ds-avatar--sm tone-primary", "SM" }
                                    div { class: "ds-avatar ds-avatar--md tone-primary", "MD" }
                                    div { class: "ds-avatar ds-avatar--lg tone-info", "LG" }
                                    div { class: "ds-avatar ds-avatar--xl tone-success", "XL" }
                                }
                            }
                        }
                        SubSection { title: "With status",
                            Demo {
                                div { class: "row align-center",
                                    div { class: "ds-avatar-stack",
                                        div { class: "ds-avatar ds-avatar--lg tone-primary", "JD" }
                                        span { class: "ds-avatar__status is-online" }
                                    }
                                    div { class: "ds-avatar-stack",
                                        div { class: "ds-avatar ds-avatar--lg tone-info", "MK" }
                                        span { class: "ds-avatar__status is-away" }
                                    }
                                    div { class: "ds-avatar-stack",
                                        div { class: "ds-avatar ds-avatar--lg tone-success", "SL" }
                                        span { class: "ds-avatar__status is-busy" }
                                    }
                                    div { class: "ds-avatar-stack",
                                        div { class: "ds-avatar ds-avatar--lg tone-muted", "AW" }
                                        span { class: "ds-avatar__status is-offline" }
                                    }
                                }
                            }
                        }
                        SubSection { title: "Avatar group",
                            Demo {
                                AvatarGroup { avatars: group_avatars.clone(), max: 4 }
                            }
                        }
                    }

                    Section { id: "cards", title: "Cards", description: "컨텐츠 그룹을 위한 컨테이너.",
                        div { class: "card-grid",
                            Card {
                                Text { size: TextSize::Sm, tone: Some("tone-muted".to_string()), "Basic card" }
                                Text { size: TextSize::Md, weight: TextWeight::Medium, "Simple container" }
                                Text { size: TextSize::Sm, tone: Some("tone-muted".to_string()), "재사용 가능한 기본 카드 컴포넌트입니다." }
                            }
                            Card { interactive: true,
                                div { class: "row align-center",
                                    div { class: "ds-avatar ds-avatar--md tone-primary", "JD" }
                                    div { style: "flex:1",
                                        div { class: "card-person__name", "Jane Doe" }
                                        div { class: "card-person__role", "Product designer" }
                                    }
                                    Badge { variant: BadgeVariant::Success, dot: true, "Active" }
                                }
                                Text { size: TextSize::Sm, tone: Some("tone-muted".to_string()),
                                    "Hover me — interactive card with lift effect."
                                }
                            }
                            Card {
                                div { class: "row align-center", style: "justify-content: space-between;",
                                    Text { size: TextSize::Sm, weight: TextWeight::Semibold, "Project alpha" }
                                    IconButton { icon: Some(IconKind::More), size: ButtonSize::Sm, label: Some("Actions".to_string()) }
                                }
                                Progress { value: 72, show_label: true }
                                div { class: "row align-center", style: "justify-content: space-between;",
                                    span { class: "card-meta", "18 of 25 tasks" }
                                    AvatarGroup { avatars: card_avatars.clone(), max: 3, size: "sm".to_string() }
                                }
                            }
                        }
                    }

                    Section { id: "table", title: "Table", description: "구조화된 데이터 표시.",
                        UserTable { rows: user_rows.clone() }
                    }

                    Section { id: "stats", title: "Stats", description: "메트릭 카드 — KPI, 숫자 지표 표시.",
                        div { class: "stats-grid",
                            Stat { label: "Total revenue".to_string(), value: "$48,293".to_string(), icon: Some(IconKind::DollarSign), change: Some("+12.5% vs last month".to_string()), change_tone: Some("tone-success".to_string()) }
                            Stat { label: "Active users".to_string(), value: "2,847".to_string(), icon: Some(IconKind::Users), change: Some("+8.2% vs last month".to_string()), change_tone: Some("tone-success".to_string()) }
                            Stat { label: "Conversion rate".to_string(), value: "3.42%".to_string(), icon: Some(IconKind::TrendingUp), change: Some("-0.8% vs last month".to_string()), change_tone: Some("tone-danger".to_string()) }
                            Stat { label: "Avg. session".to_string(), value: "4m 23s".to_string(), icon: Some(IconKind::Activity), change: Some("Same as before".to_string()), change_tone: Some("tone-muted".to_string()) }
                        }
                    }

                    Section { id: "tabs", title: "Tabs", description: "3가지 variant: underline, pill, segmented.",
                        div { class: "stack",
                            Demo {
                                Tabs { tabs: underline_tabs.clone(), active: tab_underline(), variant: TabsVariant::Underline, on_change: move |v| tab_underline.set(v) }
                            }
                            Demo {
                                Tabs { tabs: pill_tabs.clone(), active: tab_pill(), variant: TabsVariant::Pill, on_change: move |v| tab_pill.set(v) }
                            }
                            Demo {
                                Tabs { tabs: segmented_tabs.clone(), active: tab_segmented(), variant: TabsVariant::Segmented, on_change: move |v| tab_segmented.set(v) }
                            }
                        }
                    }

                    Section { id: "breadcrumb", title: "Breadcrumb", description: "계층적 네비게이션.",
                        Demo {
                            Breadcrumb { items: vec!["Home".to_string(), "Projects".to_string(), "Design system".to_string(), "Components".to_string()] }
                        }
                    }

                    Section { id: "pagination", title: "Pagination", description: "페이지 이동.",
                        Demo {
                            Pagination { current: page_value(), total: 10, on_change: move |p| page_value.set(p) }
                        }
                    }

                    Section { id: "menu", title: "Menu", description: "드롭다운 메뉴 / 컨텍스트 메뉴.",
                        Demo {
                            div { class: "row",
                                Menu {
                                    trigger: rsx! {
                                        span { class: "showcase-menu-trigger",
                                            "Actions"
                                            Icon { kind: IconKind::ChevronDown, size: 14 }
                                        }
                                    },
                                    items: action_menu_items.clone()
                                }
                                Menu {
                                    trigger: rsx! {
                                        span { class: "showcase-menu-trigger",
                                            Icon { kind: IconKind::More, size: 14 }
                                        }
                                    },
                                    items: icon_menu_items.clone(),
                                    align: Some("right".to_string())
                                }
                            }
                        }
                    }

                    Section { id: "alerts", title: "Alerts", description: "인라인 메시지 — 정보, 성공, 경고, 오류.",
                        div { class: "stack",
                            Alert { variant: AlertVariant::Info, title: Some("New version available".to_string()), "v2.1.0에서 새로운 컴포넌트가 추가되었습니다." }
                            Alert { variant: AlertVariant::Success, title: Some("Changes saved".to_string()), "모든 변경사항이 성공적으로 저장되었습니다." }
                            Alert { variant: AlertVariant::Warning, title: Some("Action required".to_string()), "구독이 7일 후 만료됩니다. 갱신해주세요." }
                            Alert { variant: AlertVariant::Error, title: Some("Something went wrong".to_string()), "파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요." }
                            Banner {
                                variant: BannerVariant::Primary,
                                icon: Some(IconKind::Zap),
                                action: Some(rsx! { Button { size: ButtonSize::Sm, variant: ButtonVariant::Ghost, "Upgrade" } }),
                                onclose: move |_| {},
                                "Pro 플랜으로 업그레이드하고 프리미엄 기능을 이용하세요."
                            }
                        }
                    }

                    Section { id: "progress", title: "Progress", description: "Linear & circular progress indicators.",
                        SubSection { title: "Linear",
                            Demo {
                                div { class: "stack", style: "max-width: 400px;",
                                    Progress { value: 30 }
                                    Progress { value: 60, variant: ProgressVariant::Success }
                                    Progress { value: 75, variant: ProgressVariant::Warning, show_label: true }
                                    Progress { value: 45, variant: ProgressVariant::Error }
                                }
                            }
                        }
                        SubSection { title: "Circular",
                            Demo {
                                div { class: "row align-center",
                                    CircularProgress { value: 25 }
                                    CircularProgress { value: 50, size: 72 }
                                    CircularProgress { value: 75, size: 84 }
                                    div { class: "row align-center",
                                        Spinner {}
                                        Text { size: TextSize::Sm, tone: Some("tone-muted".to_string()), "Loading..." }
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "skeleton", title: "Skeleton", description: "로딩 플레이스홀더.",
                        Demo {
                            div { class: "skeleton-grid",
                                div { class: "stack",
                                    Skeleton { width: "60%".to_string(), height: "20px".to_string() }
                                    Skeleton { height: "14px".to_string() }
                                    Skeleton { height: "14px".to_string() }
                                    Skeleton { width: "80%".to_string(), height: "14px".to_string() }
                                }
                                div { class: "row",
                                    Skeleton { width: "40px".to_string(), height: "40px".to_string(), circle: true }
                                    div { class: "stack", style: "flex:1",
                                        Skeleton { width: "40%".to_string(), height: "14px".to_string() }
                                        Skeleton { height: "12px".to_string() }
                                        Skeleton { width: "70%".to_string(), height: "12px".to_string() }
                                    }
                                }
                            }
                        }
                    }

                    Section { id: "empty", title: "Empty State", description: "데이터가 없을 때 표시할 상태.",
                        Card {
                            EmptyState {
                                icon: IconKind::FileText,
                                title: "아직 프로젝트가 없습니다".to_string(),
                                description: Some("첫 번째 프로젝트를 만들어 시작해보세요. 템플릿도 준비되어 있어요.".to_string()),
                                action: Some(rsx! { Button { icon: Some(IconKind::Plus), "Create project" } })
                            }
                        }
                    }

                    Section { id: "modal", title: "Modal", description: "오버레이 다이얼로그.",
                        Demo {
                            div { class: "row",
                                Button {
                                    icon: Some(IconKind::Sparkles),
                                    onclick: move |_| modal_create_open.set(true),
                                    "Open modal"
                                }
                                Button {
                                    variant: ButtonVariant::Destructive,
                                    icon: Some(IconKind::Trash),
                                    onclick: move |_| modal_confirm_open.set(true),
                                    "Delete item"
                                }
                            }
                        }
                    }

                    Section { id: "drawer", title: "Drawer", description: "사이드 패널 — 설정, 상세 정보 등.",
                        Demo {
                            Button {
                                icon: Some(IconKind::Menu),
                                onclick: move |_| drawer_open.set(true),
                                "Open drawer"
                            }
                        }
                    }

                    Section { id: "tooltip", title: "Tooltip", description: "호버 시 표시되는 힌트.",
                        Demo {
                            div { class: "row tooltip-row",
                                Tooltip { content: "Copy to clipboard".to_string(),
                                    IconButton { icon: Some(IconKind::Copy), variant: ButtonVariant::Secondary, label: Some("Copy".to_string()) }
                                }
                                Tooltip { content: "Add to favorites".to_string(), position: "bottom".to_string(),
                                    IconButton { icon: Some(IconKind::Heart), variant: ButtonVariant::Secondary, label: Some("Favorite".to_string()) }
                                }
                                Tooltip { content: "Share this".to_string(), position: "right".to_string(),
                                    IconButton { icon: Some(IconKind::Share), variant: ButtonVariant::Secondary, label: Some("Share".to_string()) }
                                }
                                Tooltip { content: "More options".to_string(), position: "left".to_string(),
                                    IconButton { icon: Some(IconKind::More), variant: ButtonVariant::Secondary, label: Some("More".to_string()) }
                                }
                            }
                        }
                    }

                    Section { id: "toast", title: "Toast", description: "임시 알림 메시지.",
                        Demo {
                            div { class: "row wrap",
                                Button {
                                    variant: ButtonVariant::Secondary,
                                    onclick: move |_| push_toast("Heads up!", "새로운 업데이트가 있습니다.", ToastVariant::Info),
                                    "Info toast"
                                }
                                Button {
                                    variant: ButtonVariant::Secondary,
                                    onclick: move |_| push_toast("Success!", "저장이 완료되었습니다.", ToastVariant::Success),
                                    "Success"
                                }
                                Button {
                                    variant: ButtonVariant::Secondary,
                                    onclick: move |_| push_toast("Warning", "주의가 필요합니다.", ToastVariant::Warning),
                                    "Warning"
                                }
                                Button {
                                    variant: ButtonVariant::Secondary,
                                    onclick: move |_| push_toast("Error", "문제가 발생했습니다.", ToastVariant::Error),
                                    "Error"
                                }
                            }
                        }
                    }

                    Section { id: "accordion", title: "Accordion", description: "접을 수 있는 컨텐츠.",
                        Accordion { items: accordion_items.clone() }
                    }

                    Section { id: "divider", title: "Divider", description: "섹션 구분.",
                        Demo {
                            div { class: "stack",
                                Divider {}
                                Divider { label: Some("OR".to_string()) }
                                div { class: "row align-center", style: "height: 40px;",
                                    span { "Left" }
                                    Divider { vertical: true }
                                    span { "Middle" }
                                    Divider { vertical: true }
                                    span { "Right" }
                                }
                            }
                        }
                    }

                    Section { id: "kbd", title: "Keyboard", description: "키보드 키 표시.",
                        Demo {
                            div { class: "row wrap align-center",
                                div { class: "row align-center",
                                    Kbd { "⌘" }
                                    Kbd { "K" }
                                    span { class: "kbd-caption", "Open search" }
                                }
                                div { class: "row align-center",
                                    Kbd { "⌘" }
                                    Kbd { "⇧" }
                                    Kbd { "P" }
                                    span { class: "kbd-caption", "Command palette" }
                                }
                                div { class: "row align-center",
                                    Kbd { "Esc" }
                                    span { class: "kbd-caption", "Close" }
                                }
                            }
                        }
                    }

                    Section { id: "forms", title: "Form Pattern", description: "실제 앱에서 폼을 구성하는 예시.",
                        Card { padding: Some("28px".to_string()),
                            div { class: "stack", style: "gap: 4px;",
                                Text { tag: TextTag::H3, size: TextSize::Xl, weight: TextWeight::Semibold, "Account settings" }
                                Text { size: TextSize::Md, tone: Some("tone-muted".to_string()), "프로필 정보를 업데이트하세요." }
                            }
                            div { class: "stack",
                                div { class: "row align-center",
                                    div { class: "ds-avatar ds-avatar--xl tone-primary", "JD" }
                                    div {
                                        div { class: "row",
                                            Button { size: ButtonSize::Sm, variant: ButtonVariant::Secondary, icon: Some(IconKind::Upload), "Upload photo" }
                                            Button { size: ButtonSize::Sm, variant: ButtonVariant::Ghost, "Remove" }
                                        }
                                        Text { size: TextSize::Sm, tone: Some("tone-muted".to_string()), "JPG, PNG — 최대 2MB" }
                                    }
                                }
                                Divider {}
                                div { class: "form-grid",
                                    Field { label: Some("First name".to_string()), required: true,
                                        Input { value: "Jane".to_string(), placeholder: Some("Jane".to_string()) }
                                    }
                                    Field { label: Some("Last name".to_string()), required: true,
                                        Input { value: "Doe".to_string(), placeholder: Some("Doe".to_string()) }
                                    }
                                }
                                Field { label: Some("Email".to_string()), required: true,
                                    Input { value: "jane@example.com".to_string(), placeholder: Some("jane@example.com".to_string()), icon: Some(IconKind::Mail) }
                                }
                                Field { label: Some("Bio".to_string()), hint: Some("간단한 자기소개를 작성해주세요 (최대 160자).".to_string()),
                                    Textarea { value: "".to_string() }
                                }
                                Field { label: Some("Timezone".to_string()),
                                    Select {
                                        options: tz_options.clone(),
                                        value: select_tz(),
                                        placeholder: Some("Select timezone".to_string()),
                                        onselect: move |v| select_tz.set(v)
                                    }
                                }
                                Divider {}
                                div { class: "row", style: "justify-content: flex-end;",
                                    Button { variant: ButtonVariant::Ghost, "Cancel" }
                                    Button { "Save changes" }
                                }
                            }
                        }
                    }

                    Section { id: "dashboard", title: "Dashboard Pattern", description: "실제 대시보드 구성 예시.",
                        div { class: "stack",
                            div { class: "dashboard-head",
                                div {
                                    Text { tag: TextTag::H3, size: TextSize::Xl, weight: TextWeight::Semibold, "Overview" }
                                    Text { size: TextSize::Md, tone: Some("tone-muted".to_string()), "지난 30일 요약" }
                                }
                                div { class: "row",
                                    Button { variant: ButtonVariant::Secondary, size: ButtonSize::Sm, icon: Some(IconKind::Filter), "Filter" }
                                    Button { variant: ButtonVariant::Secondary, size: ButtonSize::Sm, icon: Some(IconKind::Download), "Export" }
                                    Button { size: ButtonSize::Sm, icon: Some(IconKind::Plus), "New report" }
                                }
                            }
                            div { class: "stats-grid",
                                Stat { label: "Revenue".to_string(), value: "$48.2K".to_string(), icon: Some(IconKind::DollarSign), change: Some("+12.5%".to_string()), change_tone: Some("tone-success".to_string()) }
                                Stat { label: "Users".to_string(), value: "2,847".to_string(), icon: Some(IconKind::Users), change: Some("+8.2%".to_string()), change_tone: Some("tone-success".to_string()) }
                                Stat { label: "Orders".to_string(), value: "342".to_string(), icon: Some(IconKind::Package), change: Some("-2.4%".to_string()), change_tone: Some("tone-danger".to_string()) }
                                Stat { label: "Conversion".to_string(), value: "3.42%".to_string(), icon: Some(IconKind::TrendingUp), change: Some("+0.8%".to_string()), change_tone: Some("tone-success".to_string()) }
                            }
                            Card {
                                div { class: "row align-center", style: "justify-content: space-between;",
                                    Text { size: TextSize::Md, weight: TextWeight::Semibold, "Recent activity" }
                                    Tabs {
                                        tabs: vec![
                                            TabItem { value: "today".to_string(), label: "Today".to_string(), icon: None, badge: None },
                                            TabItem { value: "week".to_string(), label: "Week".to_string(), icon: None, badge: None },
                                            TabItem { value: "month".to_string(), label: "Month".to_string(), icon: None, badge: None },
                                        ],
                                        active: "week".to_string(),
                                        variant: TabsVariant::Pill
                                    }
                                }
                                UserTable { rows: user_rows.clone() }
                            }
                        }
                    }
                }
            }

            Modal {
                is_open: modal_create_open(),
                title: Some("새 프로젝트 만들기".to_string()),
                description: Some("프로젝트의 기본 정보를 입력해주세요.".to_string()),
                onclose: move |_| modal_create_open.set(false),
                footer: Some(rsx! {
                    Button { variant: ButtonVariant::Ghost, onclick: move |_| modal_create_open.set(false), "Cancel" }
                    Button {
                        onclick: move |_| {
                            modal_create_open.set(false);
                            push_toast("프로젝트 생성 완료", "My awesome project가 생성되었습니다.", ToastVariant::Success);
                        },
                        "Create"
                    }
                }),
                div { class: "stack",
                    Field { label: Some("Project name".to_string()), required: true,
                        Input { value: "".to_string(), placeholder: Some("My awesome project".to_string()) }
                    }
                    Field { label: Some("Description".to_string()),
                        Textarea { value: "".to_string() }
                    }
                    Field { label: Some("Visibility".to_string()),
                        div { class: "stack",
                            Radio { checked: true, label: Some("Private".to_string()), description: Some("초대받은 사람만 볼 수 있습니다".to_string()) }
                            Radio { checked: false, label: Some("Public".to_string()), description: Some("모든 사람이 볼 수 있습니다".to_string()) }
                        }
                    }
                }
            }

            Modal {
                is_open: modal_confirm_open(),
                size: ModalSize::Sm,
                title: Some("정말 삭제하시겠어요?".to_string()),
                description: Some("이 작업은 되돌릴 수 없습니다. 항목이 영구적으로 삭제됩니다.".to_string()),
                onclose: move |_| modal_confirm_open.set(false),
                footer: Some(rsx! {
                    Button { variant: ButtonVariant::Ghost, onclick: move |_| modal_confirm_open.set(false), "Cancel" }
                    Button {
                        variant: ButtonVariant::Destructive,
                        onclick: move |_| {
                            modal_confirm_open.set(false);
                            push_toast("삭제됨", "항목이 삭제되었습니다.", ToastVariant::Error);
                        },
                        "Delete"
                    }
                }),
                div {}
            }

            Drawer {
                is_open: drawer_open(),
                title: Some("Settings".to_string()),
                onclose: move |_| drawer_open.set(false),
                div { class: "stack",
                    Field { label: Some("Display name".to_string()),
                        Input { value: "Jane Doe".to_string(), placeholder: Some("Jane Doe".to_string()) }
                    }
                    Field { label: Some("Email".to_string()),
                        Input { value: "jane@example.com".to_string(), placeholder: Some("jane@example.com".to_string()), icon: Some(IconKind::Mail) }
                    }
                    Divider {}
                    div { class: "stack",
                        div { class: "drawer-pref__title", "Preferences" }
                        div { class: "row align-center", style: "justify-content: space-between;",
                            div {
                                div { class: "drawer-pref__label", "Email notifications" }
                                div { class: "drawer-pref__desc", "업데이트 이메일 받기" }
                            }
                            Switch { checked: true }
                        }
                        div { class: "row align-center", style: "justify-content: space-between;",
                            div {
                                div { class: "drawer-pref__label", "Marketing emails" }
                                div { class: "drawer-pref__desc", "마케팅 정보 받기" }
                            }
                            Switch { checked: false }
                        }
                    }
                }
            }

            Toast {
                toasts: toasts_list,
                on_dismiss: move |id| {
                    let mut next = toasts();
                    let Some(index) = next.iter().position(|t| t.id == id) else {
                        return;
                    };
                    if next[index].leaving {
                        return;
                    }
                    next[index].leaving = true;
                    toasts.set(next);
                    spawn(async move {
                        tokio::time::sleep(Duration::from_millis(180)).await;
                        let remaining: Vec<ToastEntry> = toasts().into_iter().filter(|t| t.id != id).collect();
                        toasts.set(remaining);
                    });
                }
            }
        }
    }
}

#[component]
fn Section(
    children: Element,
    id: &'static str,
    title: &'static str,
    description: &'static str,
) -> Element {
    rsx! {
        section { id: "{id}", class: "showcase-section",
            div { class: "showcase-section__head",
                Text { tag: TextTag::H2, size: TextSize::X2l, weight: TextWeight::Semibold, "{title}" }
                Text { size: TextSize::Md, tone: Some("tone-muted".to_string()), "{description}" }
            }
            div { class: "showcase-section__body", {children} }
        }
    }
}

#[component]
fn SubSection(
    children: Element,
    title: &'static str,
    #[props(default)] description: Option<&'static str>,
) -> Element {
    rsx! {
        div { class: "showcase-sub",
            div { class: "showcase-sub__head",
                div { class: "showcase-sub__title", "{title}" }
                if let Some(desc) = description {
                    div { class: "showcase-sub__desc", "{desc}" }
                }
            }
            {children}
        }
    }
}

#[component]
fn Demo(
    children: Element,
    #[props(default = "")] title: &'static str,
    #[props(default = "20px")] padding: &'static str,
) -> Element {
    let style = format!("padding: {padding};");
    rsx! {
        div { class: "showcase-demo-box", style: "{style}",
            if !title.is_empty() {
                div { class: "showcase-demo__title", "{title}" }
            }
            div { class: "showcase-demo__body", {children} }
        }
    }
}

#[component]
fn HeroKpi(icon: IconKind, label: &'static str, value: &'static str) -> Element {
    rsx! {
        div { class: "hero-kpi",
            div { class: "hero-kpi__icon", Icon { kind: icon, size: 15 } }
            div {
                div { class: "hero-kpi__label", "{label}" }
                div { class: "hero-kpi__value", "{value}" }
            }
        }
    }
}

#[component]
fn UserTable(rows: Vec<UserRecord>) -> Element {
    let columns = vec![
        TableColumn {
            label: "User".to_string(),
        },
        TableColumn {
            label: "Role".to_string(),
        },
        TableColumn {
            label: "Status".to_string(),
        },
        TableColumn {
            label: "Last active".to_string(),
        },
        TableColumn {
            label: "".to_string(),
        },
    ];

    rsx! {
        Table { columns: columns,
            for row in rows {
                tr { key: "{row.email}",
                    td {
                        div { class: "row align-center", style: "gap: 10px;",
                            Avatar {
                                initials: row.initials.to_string(),
                                size: "sm".to_string(),
                                color_class: row.avatar_tone.to_string()
                            }
                            div {
                                div { style: "font-weight: 500;", "{row.name}" }
                                div { class: "tone-muted", style: "font-size: 11px;", "{row.email}" }
                            }
                        }
                    }
                    td {
                        Badge { variant: BadgeVariant::Outline, "{row.role}" }
                    }
                    td {
                        Badge {
                            variant: if row.status == "Active" { BadgeVariant::Success } else { BadgeVariant::Default },
                            dot: true,
                            "{row.status}"
                        }
                    }
                    td { "{row.last_active}" }
                    td {
                        div { style: "display: flex; justify-content: flex-end;",
                            IconButton {
                                icon: Some(IconKind::More),
                                size: ButtonSize::Sm,
                                label: Some(format!("{} actions", row.name))
                            }
                        }
                    }
                }
            }
        }
    }
}
