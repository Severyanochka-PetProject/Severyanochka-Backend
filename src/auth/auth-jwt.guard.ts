import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const access = req.headers.authorization;
      /*console.log(req.headers);
      console.log(req.headers.authorization);*/
      if (!access) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      req.payload = this.jwtService.verify(access, {
        secret: 'service-testqwe232',
      });
      return true;
    } catch (e) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
