#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';
import figlet from 'figlet';
import { homedir } from 'os';
import { join } from 'path';

// GitHub Repo 路徑設定
const repoBase = 'Felix-0901/agent-skills';

// 可用的技能列表
const availableSkills = [
  { name: 'flutter-pro', value: 'flutter-pro' },
  { name: 'logo-design', value: 'logo-design' },
];

// 預設安裝路徑選項
const installPathOptions = [
  {
    name: 'Antigravity (~/.gemini/settings/agent/skills)',
    value: join(homedir(), '.gemini', 'settings', 'agent', 'skills'),
  },
  {
    name: 'Cursor (~/.cursor/agent/skills)',
    value: join(homedir(), '.cursor', 'agent', 'skills'),
  },
  {
    name: '自訂路徑',
    value: 'custom',
  },
];

// 顯示標題
function showTitle() {
  console.log(
    chalk.cyan(
      figlet.textSync('BEI SKILLS', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.yellow('🚀 歡迎使用 BEI Skills 下載工具\n'));
}

// 主程式
async function main() {
  showTitle();

  // 詢問安裝路徑
  const { pathChoice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'pathChoice',
      message: '請選擇要安裝技能的位置：',
      choices: installPathOptions,
    },
  ]);

  let installPath = pathChoice;

  // 如果選擇自訂路徑
  if (pathChoice === 'custom') {
    const { customPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customPath',
        message: '請輸入自訂路徑：',
        validate: (input) => {
          if (!input.trim()) {
            return '路徑不能為空';
          }
          return true;
        },
      },
    ]);
    installPath = customPath;
  }

  // 詢問要下載的技能
  const { selectedSkills } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedSkills',
      message: '請選擇要下載的技能（使用空白鍵選擇）：',
      choices: availableSkills,
      validate: (answer) => {
        if (answer.length < 1) {
          return '請至少選擇一個技能';
        }
        return true;
      },
    },
  ]);

  console.log(chalk.gray('\n─'.repeat(50)));
  console.log(chalk.blue('\n📦 開始下載技能...\n'));

  // 確認 npx 可用
  if (!shell.which('npx')) {
    console.log(chalk.red('❌ 錯誤：找不到 npx，請確認已安裝 Node.js'));
    process.exit(1);
  }

  // 下載每個選擇的技能
  for (const skill of selectedSkills) {
    const targetPath = join(installPath, skill);
    const degitSource = `${repoBase}/skills/${skill}`;

    console.log(chalk.yellow(`📥 正在下載 ${skill}...`));
    console.log(chalk.gray(`   來源: ${degitSource}`));
    console.log(chalk.gray(`   目標: ${targetPath}`));

    const result = shell.exec(`npx degit ${degitSource} "${targetPath}" --force`, {
      silent: false,
    });

    if (result.code === 0) {
      console.log(chalk.green(`✅ ${skill} 下載成功！\n`));
    } else {
      console.log(chalk.red(`❌ ${skill} 下載失敗！\n`));
    }
  }

  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.green('\n🎉 所有技能下載完成！'));
  console.log(chalk.cyan(`📂 安裝位置: ${installPath}\n`));
}

// 執行主程式
main().catch((error) => {
  console.error(chalk.red('發生錯誤：'), error);
  process.exit(1);
});
