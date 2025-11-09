// Script tự động tạo R2 bucket
require('dotenv').config({ path: '.env.local' });

const { S3Client, CreateBucketCommand, ListBucketsCommand } = require('@aws-sdk/client-s3');

async function createBucket() {
  console.log('🪣 Creating R2 Bucket...');
  
  const bucketName = process.env.R2_BUCKET_NAME || 'survey-student';
  
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  
  try {
    // Kiểm tra bucket đã tồn tại chưa
    console.log('🔍 Checking existing buckets...');
    const listCommand = new ListBucketsCommand({});
    const buckets = await r2Client.send(listCommand);
    
    const existingBucket = buckets.Buckets?.find(b => b.Name === bucketName);
    
    if (existingBucket) {
      console.log(`✅ Bucket "${bucketName}" already exists!`);
      console.log(`   Created: ${existingBucket.CreationDate}`);
      return;
    }
    
    // Tạo bucket mới
    console.log(`🔄 Creating bucket "${bucketName}"...`);
    const createCommand = new CreateBucketCommand({
      Bucket: bucketName,
    });
    
    await r2Client.send(createCommand);
    
    console.log(`✅ Bucket "${bucketName}" created successfully!`);
    console.log('\n🎉 Ready to test image upload!');
    console.log('   Run: node scripts/test-r2-with-env.js');
    
  } catch (error) {
    console.log('\n❌ Failed to create bucket:');
    console.log(`   Error: ${error.message}`);
    
    if (error.name === 'BucketAlreadyExists') {
      console.log('   💡 Bucket name already taken, try a different name');
    } else if (error.name === 'InvalidBucketName') {
      console.log('   💡 Invalid bucket name, use lowercase letters, numbers, and hyphens only');
    } else {
      console.log('   💡 Check your R2 permissions and try again');
    }
  }
}

createBucket().catch(console.error);