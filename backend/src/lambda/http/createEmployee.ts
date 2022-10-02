import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateEmployeeRequest } from '../../requests/CreateEmployeeRequest'
import { getUserId } from '../utils';
import { createEmployee } from '../../helpers/employees'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newEmployee: CreateEmployeeRequest = JSON.parse(event.body)
    const id: string = getUserId(event)
    const employee = await createEmployee(newEmployee, id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: employee
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
