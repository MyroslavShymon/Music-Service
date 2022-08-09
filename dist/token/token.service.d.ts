import { JwtService } from "@nestjs/jwt";
export declare class TokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    private generateToken;
}
