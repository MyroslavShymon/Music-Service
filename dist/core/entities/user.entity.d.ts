import { Preferences } from './preferences.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    image?: string;
    preferences: Preferences[];
    roles: Role[];
}
