// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { OTP } from './otp.entity';


@Injectable()
export class AuthService {
    
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    
    private jwtService: JwtService,
  ) {}
  async sendOTP(mobileNumber: string, userName: string): Promise<any> {
    // Generate a 4-digit OTP
    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Find if user exists
    let user = await this.usersRepository.findOne({
      where: { mobileNumber },
    });
    
    // If user doesn't exist, create a new user
    if (!user) {
      user = new User();
      user.mobileNumber = mobileNumber;
      user.name = userName; // Use the name provided by the user
      await this.usersRepository.save(user);
    } else {
      // Update the user's name if they already exist
      user.name = userName;
      await this.usersRepository.save(user);
    }
    
    // Save the OTP in the database
    const otp = new OTP();
    otp.user = user;
    otp.otp = generatedOTP;
    otp.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    await this.otpRepository.save(otp);
    
    // In a real application, you would send the OTP via SMS
    // For development, we'll just log it
    console.log(`OTP for ${mobileNumber}: ${generatedOTP}`);
    
    return { success: true };
  }

  async verifyOTP(mobileNumber: string, otp: string): Promise<any> {
   
    const user = await this.usersRepository.findOne({
      where: { mobileNumber },
    });
    
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
 
    const otpRecord = await this.otpRepository.findOne({
      where: {
        user: { id: user.id },
        otp: otp,
        isUsed: false
      },
      order: { createdAt: 'DESC' }
    });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
    

    otpRecord.isUsed = true;
    await this.otpRepository.save(otpRecord);
    
   
    const token = this.jwtService.sign({
      sub: user.id,
      mobileNumber: user.mobileNumber,
      isAdmin: user.isAdmin 
    });
    
    return {
      token,
      user: {
        id: user.id,
        mobileNumber: user.mobileNumber,
        name: user.name
      }
    };
  }
}