import * as AWS from 'aws-sdk'


const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });
  const bucketName = process.env.ATTACHMENT_S3_BUCKET;
  const urlExpiration = process.env.SIGNED_URL_EXPIRATION;


  export function createAttachmentUrl(employeeId: string): string {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: employeeId,
      Expires: parseInt(urlExpiration)
    })
  }
export async function removeAttachment(id: string): Promise<void> {
    const params = {
      Bucket: bucketName,
      Key: id
    }
  
      await s3.headObject(params).promise()
    
        await s3.deleteObject(params).promise()

  }