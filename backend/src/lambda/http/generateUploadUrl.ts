import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'

import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentUrl } from '../../helpers/attachmentUtils'
import { getUserId } from '../utils'
import { updateEmployeeAttachment } from '../../helpers/employees'
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const employeeId = event.pathParameters.employeeId
    // employee: Return a presigned URL to upload a file for a employee item with the provided id
    const userId = getUserId(event)
    const uploadUrl = createAttachmentUrl(employeeId);
    await updateEmployeeAttachment(userId, employeeId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
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
