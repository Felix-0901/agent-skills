---
name: "skill-architect"
description: "當使用者想要新增、建立或設計一個新的 Agent Skill 時使用此技能。這是一個 Meta-Skill，用來生成其他技能的標準結構。"
---

# Goal
協助使用者在 `agent-skills` 儲存庫中建立符合標準格式的高品質 Skill。

# Workflow
1. **Analyze Request:** 確認使用者想建立的 Skill 主題與限制（例如：一定要用 Riverpod）。
2. **Scaffold:** 在當前目錄建立 `<skill-name>/SKILL.md`。
3. **Draft Content:** 生成 YAML frontmatter, Goal, Instructions, Constraints。

# Template Structure
請參考此格式生成內容：

---
name: "{{skill-slug}}"
description: "{{trigger-condition}}"
---

# Goal
{{goal}}

# Instructions
- {{instruction-1}}

# Constraints
- {{constraint-1}}