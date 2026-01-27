import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const updateSchemaFile = async (webhookPayload) => {
  const apiName = webhookPayload.api;

  // API名が空の場合はエラー
  if (!apiName || apiName === 'null') {
    throw new Error('API名がWebhookのペイロードに含まれていません。');
  }

  console.log(`API: ${apiName}`);

  // スキーマファイルのディレクトリがなければ作成
  const schemaDir = 'schemas';
  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir, { recursive: true });
  }

  const schemaFile = path.join(schemaDir, `${apiName}.json`);
  const apiUrl = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms-management.io/api/v1/apis/${apiName}`;

  // APIスキーマを取得し、ファイルに保存
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_MANAGEMENT_API_KEY,
      },
    });
    
    if (!response.ok) {
      throw new Error(`APIスキーマの取得に失敗しました: ${response.statusText}`);
    }
    
    const schema = await response.json();
    fs.writeFileSync(schemaFile, JSON.stringify(schema, null, 2));
    console.log(`APIスキーマを${schemaFile}に保存しました。`);
  } catch (err) {
    throw new Error(`エラーが発生しました：${err}`);
  }

  const branchName = `update-schema-${apiName}-${Date.now()}`;

  return {
    apiName,
    branchName,
  };
};
