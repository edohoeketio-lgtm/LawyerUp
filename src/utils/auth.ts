export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // In a real app never store this plainly. For demo relying on local storage it is acceptable risk if local.
    role: "client" | "lawyer";
    legalInterests?: string[];
    // Optional profile fields
    jobTitle?: string;
    workplace?: string;
    gender?: string;
    location?: string;
    languages?: string[];
    bio?: string;
    timezone?: string;
}

const USERS_KEY = "lawyerup_users";
const SESSION_KEY = "lawyerup_session";

export const auth = {
    getUsers: (): User[] => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem(USERS_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    registerUser: (user: Omit<User, "id">) => {
        const users = auth.getUsers();
        // Check if exists
        if (users.find(u => u.email === user.email)) {
            throw new Error("User already exists");
        }

        const newUser = { ...user, id: crypto.randomUUID() };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    },

    login: (email: string, password: string): User => {
        const users = auth.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        auth.setSession(user);
        return user;
    },

    setSession: (user: User) => {
        // Don't store password in session
        const { password, ...safeUser } = user;
        localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
        // Dispatch event so components can react
        window.dispatchEvent(new Event("auth-change"));
    },

    getSession: (): User | null => {
        if (typeof window === "undefined") return null;
        const stored = localStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    },

    logout: () => {
        localStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new Event("auth-change"));
    },

    updateUser: (updatedData: Partial<User>) => {
        const users = auth.getUsers();
        const currentUser = auth.getSession();

        if (!currentUser) return;

        const index = users.findIndex(u => u.id === currentUser.id);
        if (index !== -1) {
            const updatedUser = { ...users[index], ...updatedData };
            users[index] = updatedUser;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            auth.setSession(updatedUser); // Update active session
        }
    }
};
