

export function DateShortFormat(iso) {
    const date = new Date(iso)

    const day = date.getUTCDate()
    const month = date.toLocaleDateString('fr', { month: 'short', timeZone: 'UTC' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}