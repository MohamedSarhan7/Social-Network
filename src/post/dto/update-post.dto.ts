import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto extends CreatePostDto {
  @IsNotEmpty()
  id: string;
}
