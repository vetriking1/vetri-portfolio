#!/usr/bin/env node

/**
 * Test script to verify LLM accessibility
 * Run: node test-llm-access.js
 */

const https = require('https');

const SITE_URL = 'https://vetriselvan.space';

const tests = [
  {
    name: 'Main HTML (noscript content)',
    url: `${SITE_URL}/`,
    check: (data) => data.includes('Vetri Selvan M') && data.includes('noscript')
  },
  {
    name: 'LLM.txt file',
    url: `${SITE_URL}/llm.txt`,
    check: (data) => data.includes('Vetri Selvan M') && data.includes('AI Developer')
  },
  {
    name: 'API JSON',
    url: `${SITE_URL}/api.json`,
    check: (data) => {
      try {
        const json = JSON.parse(data);
        return json.name === 'Vetri Selvan M' && json.projects;
      } catch {
        return false;
      }
    }
  },
  {
    name: 'Robots.txt',
    url: `${SITE_URL}/robots.txt`,
    check: (data) => data.includes('GPTBot') && data.includes('llm.txt')
  },
  {
    name: 'Sitemap',
    url: `${SITE_URL}/sitemap.xml`,
    check: (data) => data.includes('<?xml') && data.includes('urlset')
  }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('🤖 Testing LLM Accessibility for vetriselvan.space\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const { status, data } = await fetchUrl(test.url);
      const checkPassed = status === 200 && test.check(data);
      
      if (checkPassed) {
        console.log(`✅ ${test.name}`);
        console.log(`   URL: ${test.url}`);
        console.log(`   Status: ${status}`);
        console.log(`   Size: ${data.length} bytes\n`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        console.log(`   URL: ${test.url}`);
        console.log(`   Status: ${status}`);
        console.log(`   Check failed\n`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}`);
      console.log(`   URL: ${test.url}`);
      console.log(`   Error: ${error.message}\n`);
      failed++;
    }
  }

  console.log('='.repeat(60));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your site is LLM-ready!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above.');
  }
}

runTests().catch(console.error);
