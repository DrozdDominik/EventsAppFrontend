export const fitMap = (): number  => {
    const width = window.innerWidth

    return width <= 1024 ? 5 : 6
}

export const fitMapCenter = (): [number, number]  => {
    const width = window.innerWidth

    return width > 720 ? [51.5, 20] : [51.5, 19.3]
}