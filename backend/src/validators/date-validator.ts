import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsFutureOrToday', async: false })
export class IsFutureOrToday implements ValidatorConstraintInterface {
    validate(value: Date) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return value >= today;
    }
}