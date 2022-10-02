import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { EmployeeItem } from '../models/EmployeeItem';
import { UpdateEmployeeRequest } from '../requests/UpdateEmployeeRequest';
import { createLogger } from '../utils/logger';

const logger = createLogger('EmployeeAccess');

const XAWS = AWSXRay.captureAWS(AWS);

export class EmployeeAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly employeeTable = process.env.EMPLOYEES_TABLE,
    private readonly attachmentBucket = process.env.ATTACHMENT_S3_BUCKET) {
  }

  async getEmployeesForUser(userId: string): Promise<EmployeeItem[]> {

    const result = await this.docClient.query({
      TableName: this.employeeTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      },
      
    }).promise()
    const items = result.Items

    return items as EmployeeItem[]
  }

  async getEmployee(employeeId: string, userId: string): Promise<EmployeeItem> {
    const result = await this.docClient.get({
        TableName: this.employeeTable,
        Key: {
          employeeId,
            userId
        }
    }).promise();

    return result.Item as EmployeeItem;
}

  async createEmployee(employee: EmployeeItem): Promise<EmployeeItem> {
    await this.docClient.put({
      TableName: this.employeeTable,
      Item: employee
    }).promise()

    return employee;
  }
  
  async deleteEmployee(userId: string, employeeId: string): Promise<void> {
    await this.docClient.delete({
      TableName: this.employeeTable,
      Key: {
        employeeId,
        userId
      }
    }).promise();

  }

  async updateEmployee(userId: string, employeeId: string, employee: UpdateEmployeeRequest): Promise<void> {
    logger.info('Starting update employee: ', employee);
    await this.docClient.update({
      TableName: this.employeeTable,
      Key: { employeeId, userId },
      UpdateExpression: 'set #name = :name, #department = :department',
      ExpressionAttributeNames: { '#name': 'name', '#department': 'department' },
      ExpressionAttributeValues: {
        ':name': employee.name,
        ':department': employee.department,
      },
      ReturnValues: "UPDATED_NEW"
    }).promise();

    return;
  }
  employee
  async GenerateUploadUrl(userId: string, employeeId: string): Promise<void> {
    await this.docClient.update({
      TableName: this.employeeTable,
      Key: { employeeId, userId },
      UpdateExpression: 'set #attachmentUrl = :attachmentUrl',
      ExpressionAttributeNames: { '#attachmentUrl': 'attachmentUrl' },
      ExpressionAttributeValues: {
        ':attachmentUrl': `https://${this.attachmentBucket}.s3.amazonaws.com/${employeeId}`
      },
      ReturnValues: "UPDATED_NEW"
    }).promise();
  }

  async employeeExists(employeeId: string): Promise<boolean> {
    const result = await this.docClient
      .get({
        TableName: this.employeeTable,
        Key: {
          employeeId
        }
      })
      .promise()
  
    return !!result.Item
  }
}

