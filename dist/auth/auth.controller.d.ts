import { AuthService } from './auth.service';
import { Signin, CheckEmail } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    checkEmail(req: CheckEmail): Promise<boolean>;
    signin(req: Signin): Promise<import("./types").Token>;
    refresh(req: any): Promise<import("./types").NewToken>;
    getAku(): Promise<{
        ini: string;
    }>;
}
