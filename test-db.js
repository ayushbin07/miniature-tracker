const { Client } = require('pg');

const regions = ['ap-south-1', 'ap-southeast-1', 'us-east-1', 'eu-central-1', 'us-west-1'];
const password = 'Ayush2026Jul7';
const project = 'qykbjkvomxzfesjmqwev';

async function test() {
  for (const region of regions) {
    const url = `postgresql://postgres.${project}:${password}@aws-0-${region}.pooler.supabase.com:5432/postgres`;
    const client = new Client({ connectionString: url, connectionTimeoutMillis: 3000 });
    try {
      await client.connect();
      console.log('SUCCESS:', region);
      await client.end();
      return;
    } catch (e) {
      console.log('FAILED:', region, e.message);
    }
  }
}
test();
