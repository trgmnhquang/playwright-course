const userArray = [
    { username: 'Hiro', age: 25 },
    { username: 'Hiromi', age: 24 },
    { username: 'Yuki', age: 25 },
    { username: 'Lyn', age: 26 }
]

const browsers = ['chrome', 'firefox', 'edge']

for (const browser of browsers) {
    console.log(browser)
}

function buildGreeting(username: string): string {
    return `Hello, ${username}`
}

console.log(buildGreeting(userArray[0].username))

function canLogin(hasUsername: boolean, hasPassword: boolean): boolean {
    return hasUsername && hasPassword;
}

const result = canLogin(true, true);
console.log(result);

const buildGreetingArrow = (username: string): string => {
    return `Hello, ${username}`;
}

console.log(buildGreetingArrow(userArray[0].username))


class User {
    username: string;
    age: number;
    isActive: boolean;

    constructor(username: string, age: number, isActive: boolean) {
        this.username = username;
        this.age = age;
        this.isActive = isActive
    }

    canLogin(): boolean {
        return this.isActive;
    }
}

const admin = new User('Hiro', 26, true);
console.log(admin.canLogin())