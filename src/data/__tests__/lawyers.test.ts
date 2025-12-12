import { describe, it, expect } from 'vitest';
import { getLawyerById, lawyers } from '../lawyers';

describe('Lawyer Data Utilities', () => {
    describe('getLawyerById', () => {
        it('should return the correct lawyer for a valid ID', () => {
            const lawyer = getLawyerById('1');
            expect(lawyer).toBeDefined();
            expect(lawyer?.name).toBe('Sarah Jenkins');
            expect(lawyer?.id).toBe('1');
        });

        it('should return the correct lawyer for another valid ID', () => {
            const lawyer = getLawyerById('2');
            expect(lawyer).toBeDefined();
            expect(lawyer?.name).toBe('David Okon');
        });

        it('should return undefined for a non-existent ID', () => {
            const lawyer = getLawyerById('999');
            expect(lawyer).toBeUndefined();
        });
    });

    describe('lawyers data integrity', () => {
        it('should have 20 lawyers', () => {
            expect(lawyers.length).toBe(20);
        });

        it('should have consistent review counts', () => {
            lawyers.forEach(lawyer => {
                if (lawyer.reviews) {
                    expect(lawyer.reviews.length).toBe(lawyer.stats.reviews);
                } else {
                    expect(lawyer.stats.reviews).toBe(0);
                }
            });
        });

        it('should have unique IDs', () => {
            const ids = lawyers.map(l => l.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });
});
