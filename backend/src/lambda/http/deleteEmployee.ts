import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteEmployee } from '../../helpers/employees'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const employeeId = event.pathParameters.employeeId
    const userId: string = getUserId(event);
    await deleteEmployee(userId, employeeId);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "successfully"
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true,
      origin: "*",
    })
  )
