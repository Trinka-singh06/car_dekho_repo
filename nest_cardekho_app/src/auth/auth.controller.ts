// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOTP(@Body() body: { mobileNumber: string; userName: string }) {
    const { mobileNumber, userName } = body;
    
    try {
      const result = await this.authService.sendOTP(mobileNumber, userName);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new UnauthorizedException('Failed to send OTP');
    }
  }
  
  @Post('verify-otp')
  async verifyOTP(@Body() body: { mobileNumber: string; otp: string }) {
    const { mobileNumber, otp } = body;
    
    try {
      const result = await this.authService.verifyOTP(mobileNumber, otp);
      return {
        success: true,
        token: result.token,
        user: result.user
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid OTP');
    }
  }
}
