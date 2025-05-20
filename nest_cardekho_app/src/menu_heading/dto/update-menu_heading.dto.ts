import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuHeadingDto } from './create-menu_heading.dto';

export class UpdateMenuHeadingDto extends PartialType(CreateMenuHeadingDto) {}
