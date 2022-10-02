import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getEmployees } from '../../helpers/employees'
import { getUserId } from '../utils';

// employee: Get all employee items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const id: string = getUserId(event);
    const employees = await getEmployees(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        employees
      })
    }
  }
)
handler.use(
  cors({
    credentials: true,
    origin: "*",
  })
)
  
