import {PartialType} from '@nestjs/swagger'
import {CreateUserDto} from './create-user.dto'
import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

//

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
