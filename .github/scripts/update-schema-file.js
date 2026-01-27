import fs from 'fs';
import path from 'path';

export const updateSchemaFile = async (webhookPayload, serviceDomain, managementApiKey) => {
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
  
  if (!serviceDomain) {
    throw new Error('MICROCMS_SERVICE_DOMAIN環境変数が設定されていません。');
  }
  if (!managementApiKey) {
    throw new Error('MICROCMS_MANAGEMENT_API_KEY環境変数が設定されていません。');
  }
  
  const apiUrl = `https://${serviceDomain}.microcms-management.io/api/v1/apis/${apiName}`;

  // APIスキーマを取得し、ファイルに保存
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': managementApiKey,
        'Content-Type': 'application/json',
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
