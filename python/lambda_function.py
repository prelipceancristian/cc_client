import json
import urllib.parse
import boto3
import base64
import requests

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    # print("Received event: " + json.dumps(event, indent=2))

    file_name = event.get('file_name')
    file_content = event.get('file_content')
    language = event.get('language')
    community_id = event.get('community_id')
    text_file = {
        'file_name': file_name,
        'language': language,
        'community_id': community_id,
        'file_content': file_content
    }

    if not file_name or not file_content:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid input')
        }

    # Specify the S3 bucket name
    bucket_name = 'cc-file-storage'

    # Initialize the S3 client
    s3_client = boto3.client('s3')

    try:
        # Upload the file to S3
        s3_client.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=file_content
        )

        save_text_file_in_db(text_file)

        return {
            'statusCode': 200,
            'body': json.dumps('File uploaded successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error uploading file: {str(e)}')
        }


def save_text_file_in_db(textFile):
    ec2_server_address = 'https://54.234.213.129:5000/textFile'
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.post(ec2_server_address, textFile, headers=headers)
    print(response)
    return response
