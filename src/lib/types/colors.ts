import type Colors from "$lib/data/colors.json"

export type Raw = keyof typeof Colors

export enum Color {
    primary = "primary",
    secondary = "secondary",
    accent = "accent",
    neutral = "neutral"
}

export type ColorKey = keyof typeof Color

export enum Category {
    normal = "normal",
    focus = "focus",
    content = "content"
}
