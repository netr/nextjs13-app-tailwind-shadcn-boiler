import {
    cn,
    formatNumber,
    formatNumberScale,
    formatPercent,
    formatUSD,
} from './utils'

describe('formatNumberScale', () => {
    it('should format numbers with trillion scale', () => {
        expect(formatNumberScale(1234567890123)).toBe('1.2T')
        expect(formatNumberScale('2345678901234')).toBe('2.3T')
    })
    
    it('should format numbers with billion scale', () => {
        expect(formatNumberScale(123456789012)).toBe('123.5B')
        expect(formatNumberScale('234567890123')).toBe('234.6B')
    })

    it('should format numbers with million scale', () => {
        expect(formatNumberScale(1234567890)).toBe('1.2B')
        expect(formatNumberScale('2345678901')).toBe('2.3B')
    })

    it('should format numbers with thousand scale', () => {
        expect(formatNumberScale(123456)).toBe('123.5K')
        expect(formatNumberScale('234567')).toBe('234.6K')
    })

    it('should format numbers with decimal places', () => {
        expect(formatNumberScale(1234.56)).toBe('1.2K')
        expect(formatNumberScale('2345.67')).toBe('2.3K')
    })

    it('should format small numbers with "< 0.0001"', () => {
        expect(formatNumberScale(0.00001)).toBe('< 0.0001')
        expect(formatNumberScale('0.000001')).toBe('< 0.0001')
    })

    it('should format zero and invalid input', () => {
        expect(formatNumberScale(0)).toBe('0')
        expect(formatNumberScale('0')).toBe('0')
        expect(formatNumberScale('')).toBe('0')
        expect(formatNumberScale(NaN)).toBe('0')
        expect(formatNumberScale('abc')).toBe('0')
    })

    it('should format numbers with USD currency', () => {
        expect(formatNumberScale(1234567890123, true)).toBe('$1.2T')
        expect(formatNumberScale('234567890123', true)).toBe('$234.6B')
        expect(formatNumberScale(1234567890, true)).toBe('$1.2B')
        expect(formatNumberScale('123456', true)).toBe('$123.5K')
        expect(formatNumberScale(1234.56, true)).toBe('$1.2K')
        expect(formatNumberScale(0.00001, true)).toBe('< $0.0001')
        expect(formatNumberScale(0, true)).toBe('$0.00')
        expect(formatNumberScale('', true)).toBe('$0.00')
        expect(formatNumberScale(NaN, true)).toBe('$0.00')
        expect(formatNumberScale('abc', true)).toBe('$0.00')
    })
})

describe('formatPercent', () => {
    it('should format percentage', () => {
        expect(formatPercent(0.1234)).toBe('0.12%')
        expect(formatPercent('23.45122155')).toBe('23.45%')
    })

    it('should handle invalid input', () => {
        expect(formatPercent('abc')).toBe('-')
        expect(formatPercent('')).toBe('-')
        expect(formatPercent(0)).toBe('-')
    })

    it('should handle negative percentage', () => {
        expect(formatPercent(-0.1234)).toBe('-0.12%')
        expect(formatPercent('-23.45122155')).toBe('-23.45%')
    })

    // precision
    it('should format percentage with precision', () => {
        expect(formatPercent(0.1234, 3)).toBe('0.123%')
        expect(formatPercent('23.45122155', 4)).toBe('23.4512%')
    })

    // fallback
    it('should fallback to 0% for invalid input', () => {
        expect(formatPercent('abc', 2, 'FALLBACK')).toBe('FALLBACK')
        expect(formatPercent('', 2, 'FALLBACK')).toBe('FALLBACK')
        expect(formatPercent(0, 2, 'FALLBACK')).toBe('FALLBACK')
    })
})

describe('formatUSD', () => {
    it('should format number as USD', () => {
        expect(formatUSD(1234567890123)).toBe('$1,234,567,890,123.00')
        expect(formatUSD('2345678901234')).toBe('$2,345,678,901,234.00')
    })

    it('should handle invalid input', () => {
        expect(formatUSD('abc')).toBe('$0.00')
        expect(formatUSD('')).toBe('$0.00')
        expect(formatUSD(0)).toBe('$0.00')
    })
})

describe('formatNumber', () => {
    it('should format number', () => {
        expect(formatNumber(1234567890123)).toBe('1,234,567,890,123')
        expect(formatNumber('2345678901234')).toBe('2,345,678,901,234')
    })

    it('should handle invalid input', () => {
        expect(formatNumber('abc')).toBe('0')
        expect(formatNumber('')).toBe('0')
        expect(formatNumber(0)).toBe('0')
    })

    // min precision
    it('should format number with min precision', () => {
        expect(formatNumber(1234.56, 2)).toBe('1,234.56')
        expect(formatNumber('2345.67', 3)).toBe('2,345.670')
    })

    // max precision
    it('should format number with max precision', () => {
        expect(formatNumber(1234.51241246, 0, 5)).toBe('1,234.51241')
        expect(formatNumber('2346.62151257', 0, 7)).toBe('2,346.6215126')
    })
})

describe('cn', () => {
    it('should concatenate class names', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2')
        expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3')
    })

    it('should handle empty class names', () => {
        expect(cn('')).toBe('')
        expect(cn('', '')).toBe('')
    })
})