export class BadRequestExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestExceptions';
    }
}
export class NotFoundExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundExceptions';
    }
}
export class ForbiddenExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenExceptions';
    }
}
export class UnauthorizedExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedExceptions';
    }
}
export class TooManyRequestsExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TooManyRequestsExceptions';
    }
}