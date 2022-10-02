import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { updateEmployee } from '../../helpers/employees'
import { UpdateEmployeeRequest } from '../../requests/UpdateEmployeeRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const employeeId = event.pathParameters.employeeId
    const updateemployee: UpdateEmployeeRequest = JSON.parse(event.body)
    const id: string = getUserId(event);
    await updateEmployee(id, employeeId, updateemployee);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "successfully"
      })
    }
  }
)

handler
  //.use(httpErrorHandler())
  .use(
    cors({
      credentials: true,
      origin: "*",
    })
  )
