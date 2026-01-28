import fs from 'fs';
import path from 'path';

export const updateSchemaFile = async (apiName, core) => {
  // スキーマファイルのディレクトリがなければ作成
  const schemaDir = 'schemas';
  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir, { recursive: true });
  }

  const schemaFile = path.join(schemaDir, `${apiName}.json`);
  
  if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    core.setFailed('MICROCMS_SERVICE_DOMAIN環境変数が設定されていません。');
    return;
  }
  if (!process.env.MICROCMS_MANAGEMENT_API_KEY) {
    core.setFailed('MICROCMS_MANAGEMENT_API_KEY環境変数が設定されていません。');
    return;
  }

  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const managementApiKey = process.env.MICROCMS_MANAGEMENT_API_KEY;
  
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
      core.setFailed(`APIスキーマの取得に失敗しました: ${response.statusText}`);
      return;
    }
    
    const schema = await response.json();
    fs.writeFileSync(schemaFile, JSON.stringify(schema, null, 2));
    core.info(`APIスキーマを${schemaFile}に保存しました。`);
  } catch (err) {
    core.setFailed(`エラーが発生しました：${err}`);
    return;
  }
};
