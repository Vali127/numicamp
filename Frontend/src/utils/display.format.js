

export function DateShortFormat(iso) {
    const date = new Date(iso)

    const day = date.getUTCDate()
    const month = date.toLocaleDateString('fr', { month: 'short', timeZone: 'UTC' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}

export function DurationFormat(iso) {
    const date = new Date(iso)
    const date_now = new Date()

    const duration = date_now - date // millisecondes

    const seconds = Math.floor(duration / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (years !== 0)
        return `il y a ${years} ${years === 1 ? 'an' : 'ans'}`
    if (months !== 0)
        return `il y a ${months} mois`
    if (days !== 0)
        return `il y a ${days} ${days === 1 ? 'jour' : 'jours'}`
    if (hours !== 0)
        return `il y a ${hours} ${hours === 1 ? 'heure' : 'heures'}`
    if (minutes !== 0)
        return `il y a ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
    if (seconds !== 0)
        return `il y a ${seconds} ${seconds === 1 ? 'seconde' : 'secondes'}`

    return "à l'instant"
}