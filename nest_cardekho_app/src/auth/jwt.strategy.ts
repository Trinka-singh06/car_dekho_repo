// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', '9f1900bdc2e74a9a588a214f07f0e3391fa006e56e8c472acac20aa8a7370ec6e20e7d3af6900d874267977a646a5c664e82cb5e3bc21a0b20fbb88d3c22bd28' ),
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      mobileNumber: payload.mobileNumber,
      // Add isAdmin flag if you have it in your JWT payload
      isAdmin: payload.isAdmin || false 
    };
  }
}