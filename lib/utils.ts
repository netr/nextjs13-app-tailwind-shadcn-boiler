import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
/**
 * Merges Tailwind CSS classes with the provided class names.
 *
 * @param {ClassValue[]} inputs - The class names to be merged.
 *
 * @return {string} - The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Trims an Ethereum address to a more readable format.
 *
 * @param {string} address - The Ethereum address to be trimmed.
 * @param {number} [prefixLen=12] - The length of the prefix to keep.
 *
 * @return {string} - The trimmed Ethereum address.
 */
export function trimAddress(address: string, prefixLen: number = 12): string {
    if (address.length <= 16) return address

    return `${address.slice(0, prefixLen)}...${address.slice(-4)}`
}

/**
 * Formats a number with commas as a separator.
 *
 * @param {number|string} number - The number to be formatted. If a string is provided, it must be convertible to a number.
 * @param [minPrecision=0] - The minimum number of decimal places to include in the formatted number.
 * @param [maxPrecision=4] - The maximum number of decimal places to include in the formatted number.
 * @return {string} The formatted number with commas as a separator.
 */
export function formatNumber(number: number | string, minPrecision: number = 0, maxPrecision: number = 4): string {
    const parsedNumber = parseFloat(number as unknown as string)
    if (isNaN(parsedNumber) || number === '' || number === undefined) return '0'

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision
    }).format(parsedNumber)
}

/**
 * Formats a number as USD currency.
 *
 * @param {number} number - The number to be formatted as USD currency.
 * @return {string} The formatted number as USD currency.
 */
export function formatUSD(number: number | string): string {
    const parsedNumber = parseFloat(number as unknown as string)
    if (isNaN(parsedNumber) || number === '' || number === undefined) return '$0.00'

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(parsedNumber)
}

/**
 * Formats a number with a suitable scale and returns it as a string.
 *
 * @param {number|string} number - The number to be formatted. If a string is provided, it must be convertible to a number.
 * @param {boolean} [usd=false] - Specifies whether the formatted number should have a currency sign (USD) prefix.
 *
 * @return {string} - The formatted number as a string.
 */
export function formatNumberScale(number: number | string, usd: boolean = false): string {
    const parsedNumber = parseFloat(number as unknown as string)
    if (isNaN(parsedNumber) || number === '' || number === undefined) {
        return usd ? '$0.00' : '0'
    }

    const SCALE_DEFINITIONS = [
        { scale: 'T', power: 12 },
        { scale: 'B', power: 9 },
        { scale: 'M', power: 6 },
        { scale: 'K', power: 3 },
    ]

    const wholeNumberLength = String(Math.floor(parsedNumber)).length
    for (const { scale, power } of SCALE_DEFINITIONS) {
        if (wholeNumberLength >= power + 1) {
            return `${usd ? '$' : ''}${(parsedNumber / Math.pow(10, power)).toFixed(1)}${scale}`
        }
    }
    if (parsedNumber < 0.0001 && parsedNumber > 0) {
        return usd ? '< $0.0001' : '< 0.0001'
    }

    if (parsedNumber === 0) {
        return usd ? '$0.00' : '0'
    }

    return `${usd ? '$' : ''}${parsedNumber.toFixed(2)}`
}

/**
 * Formats a number as a percentage.
 *
 * @param {number|string} number - The number to format as a percentage.
 * @param {number} [precision=2] - The number of decimal places to include in the formatted percentage.
 * @param {string} [fallback=-] - The fallback value to return if the number cannot be formatted.
 * @return {string} The formatted number as a percentage.
 */
export function formatPercent(number: number | string, precision: number = 2, fallback: string = '-'): string {
    const parsedNumber = parseFloat(number as unknown as string)
    if (!parsedNumber) {
        return fallback
    }
    if (parsedNumber === Infinity || parsedNumber === 0) {
        return '0%'
    }
    if (parsedNumber < 0.0001 && parsedNumber > 0) {
        return '< 0.0001%'
    }
    if (parsedNumber < 0 && parsedNumber > -0.0001) {
        return '< 0.0001%'
    }
    const percent = parseFloat(parsedNumber.toFixed(precision))
    if (percent === 0) {
        return '0%'
    }
    if (percent > 0) {
        if (percent > 100) {
            return `${parsedNumber.toFixed(0).toLocaleString()}%`
        }
        return `${percent}%`
    }

    return `${percent}%`
}