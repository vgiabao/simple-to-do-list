import { TaskStatus } from "../task-status.enum";
import {IsOptional, IsEnum, IsString} from "class-validator";

export class GetTaskFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @IsString()
  @IsOptional()
  search?: string;
}
