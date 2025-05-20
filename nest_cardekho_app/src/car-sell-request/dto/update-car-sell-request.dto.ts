import { PartialType } from '@nestjs/mapped-types';
import { CreateCarSellRequestDto } from './create-car-sell-request.dto';

export class UpdateCarSellRequestDto extends PartialType(CreateCarSellRequestDto) {}
