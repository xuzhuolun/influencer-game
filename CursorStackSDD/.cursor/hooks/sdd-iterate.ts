/**
 * SDD 迭代 Hook
 *
 * 用于在简单迭代循环中继续代理执行：
 * - 持续运行测试直到全部通过
 * - 持续迭代 UI 直到符合设计
 * - 持续修复 linter 错误直到干净
 *
 * 依赖：Cursor 2.3+ 且运行时为 Bun
 */

import { readFileSync, existsSync } from "fs";

interface StopHookInput {
  conversation_id: string;
  status: "completed" | "aborted" | "error";
  loop_count: number;
}

const MAX_ITERATIONS = 10;
const SCRATCHPAD_PATH = ".cursor/scratchpad.md";

async function main(): Promise<void> {
  try {
    // 从 stdin 读取输入（Cursor 以 JSON 形式传入 hook 上下文）
    const input: StopHookInput = await Bun.stdin.json();

    // 如果已中止、出错或达到最大迭代次数，则不再继续
    if (input.status !== "completed" || input.loop_count >= MAX_ITERATIONS) {
      console.log(JSON.stringify({}));
      return;
    }

    // 在 scratchpad 中检查完成信号
    const scratchpad = existsSync(SCRATCHPAD_PATH)
      ? readFileSync(SCRATCHPAD_PATH, "utf-8")
      : "";

    // 停止条件 - 查找成功标记
    const stopMarkers = [
      "DONE",
      "COMPLETE",
      "ALL TESTS PASS",
      "NO ERRORS",
      "ITERATION COMPLETE",
    ];

    const shouldStop = stopMarkers.some((marker) =>
      scratchpad.toUpperCase().includes(marker)
    );

    if (shouldStop) {
      // 满足停止条件，结束迭代
      console.log(JSON.stringify({}));
    } else {
      // 继续迭代，并附带下一轮提示信息
      console.log(
        JSON.stringify({
          followup_message: `[迭代 ${input.loop_count + 1}/${MAX_ITERATIONS}] 继续按计划执行。本轮完成后，请在 ${SCRATCHPAD_PATH} 中写入 DONE 以结束循环。`,
        })
      );
    }
  } catch (error) {
    // 发生错误时，优雅地停止迭代
    console.error("Hook error:", error);
    console.log(JSON.stringify({}));
  }
}

main();
