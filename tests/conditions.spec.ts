import { test, expect } from '@playwright/test';

test('practice conditions', async () => {
    const statusCode = 200;
    const responseTime = 700;

    // TODO: create isSuccess
    const isSuccess = statusCode === 200;
    // TODO: create isFast
    const isFast = responseTime < 1000;
    // TODO: create requestIsHealthy
    const requestIsHealthy = isSuccess && isFast

    // TODO: add assertions
    expect(isSuccess).toBe(true);
    expect(isFast).toBe(true);
    expect(requestIsHealthy).toBe(true);
});

const users = [
    { username: 'admin', isActive: true },
    { username: 'guest', isActive: false },
    { username: 'editor', isActive: true },
];

let activeUsers: string[] = [];

for (const user of users) {
    if (user.isActive) {
        activeUsers.push(user.username)
    }
}

expect(activeUsers.length).toBe(2)

function canUserLogin(
    username: string,
    isActive: boolean
): boolean {
    // TODO: return a boolean
    return username.length > 0 && isActive
}

test('use the function above in an assertion', async () => {
    const loginStatus = canUserLogin('Admin', true)
    const cannotLoginStatus = canUserLogin('Admin2', false)
    const emptyUsernameStatus = canUserLogin('', true)

    expect(loginStatus).toBe(true)
    expect(cannotLoginStatus).toBe(false)
    expect(emptyUsernameStatus).toBe(false)
})


class TestUser {
    username: string;
    isActive: boolean;

    constructor(username: string, isActive: boolean) {
        // TODO: store both values on this instance
        this.username = username;
        this.isActive = isActive;
    }

    canLogin(): boolean {
        // TODO: return whether this user is active
        return this.isActive
    }
}

test('test user class', async () => {
    const adminUser = new TestUser('admin', true);
    const inactiveUser = new TestUser('user', false);

    expect(adminUser.canLogin()).toBe(true)
    expect(inactiveUser.canLogin()).toBe(false)
})
