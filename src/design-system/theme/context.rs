use crate::design_system::tokens::palette::{dark_palette, light_palette, Palette};
use dioxus::prelude::*;

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ThemeMode {
    Light,
    Dark,
}

#[derive(Clone, Copy)]
pub struct ThemeController {
    pub mode: Signal<ThemeMode>,
}

impl ThemeController {
    pub fn is_dark(self) -> bool {
        (self.mode)() == ThemeMode::Dark
    }

    pub fn toggle(mut self) {
        let next = if self.is_dark() {
            ThemeMode::Light
        } else {
            ThemeMode::Dark
        };
        self.mode.set(next);
    }

    pub fn class_name(self) -> &'static str {
        if self.is_dark() {
            "theme-dark"
        } else {
            "theme-light"
        }
    }

    pub fn palette(self) -> &'static Palette {
        if self.is_dark() {
            dark_palette()
        } else {
            light_palette()
        }
    }
}

pub fn provide_theme() -> ThemeController {
    let controller = ThemeController {
        mode: use_signal(|| ThemeMode::Light),
    };
    use_context_provider(|| controller);
    controller
}

pub fn use_theme() -> ThemeController {
    use_context::<ThemeController>()
}
