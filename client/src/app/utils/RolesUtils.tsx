import { User } from "../models/user";

export function isAdmin(user: User | null) {
    return user && user.roles?.includes('Admin') ? true : false;   
}

export function isMember(user: User | null) {
    return user && (user.roles?.includes('Admin') || user.roles?.includes('Member')) ? true : false;   
}