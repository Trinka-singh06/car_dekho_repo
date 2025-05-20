import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Implement your admin check logic here
    // This is just an example - you should define what makes a user an admin
    if (user && user.isAdmin) {
      return true;
    }

    throw new UnauthorizedException('Admin access required');
  }
}