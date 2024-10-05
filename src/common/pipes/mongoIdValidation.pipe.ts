import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  private readonly mongoIdRegex = /^[0-9a-fA-F]{24}$/

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): any {
    if (!value.match(this.mongoIdRegex)) {
      throw new BadRequestException('Invalid MongoDB ID')
    }
    return value
  }
}
