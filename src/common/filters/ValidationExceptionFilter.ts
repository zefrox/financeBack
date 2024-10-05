import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseMessage: any = exception.getResponse()

    if (status === 400) {
      const errors = typeof responseMessage === 'object' ? responseMessage.message || [] : []
      response.status(status).json({
        statusCode: status,
        errors: Array.isArray(errors) ? errors : [errors],
        message: 'Validation failed'
      })
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message
      })
    }
  }
}
