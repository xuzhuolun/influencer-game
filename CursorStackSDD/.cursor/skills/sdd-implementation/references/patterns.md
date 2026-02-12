# SDD 实现模式

SDD 实现的常见模式和规范。

## 文件组织

### 规格驱动的结构
```
specs/active/[task-id]/
├── spec.md           # 需求
├── plan.md           # 技术设计
├── tasks.md          # 任务分解
├── todo-list.md      # 执行清单
└── research.md       # (可选) 调查发现
```

### 代码组织
- 相关代码放在一起
- 每个文件一个组件/模块（通常）
- 测试与源文件放在一起或放在 `__tests__/` 文件夹
- 共享工具放在 `utils/` 或 `lib/`

## 命名规范

### 文件
- `kebab-case` 用于文件名: `user-service.ts`
- `.test.ts` 或 `.spec.ts` 用于测试
- `index.ts` 用于桶导出

### 代码
- `camelCase` 用于变量和函数
- `PascalCase` 用于类和组件
- `UPPER_SNAKE_CASE` 用于常量
- 描述性名称优于缩写

## 错误处理

### 标准模式
```typescript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('操作失败', { error, context });
  return { success: false, error: formatError(error) };
}
```

### 验证模式
```typescript
function validateInput(input: unknown): Result<ValidInput> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error };
  }
  return { success: true, data: parsed.data };
}
```

## 待办跟踪

### 格式
```markdown
- [ ] 任务描述
  - 模式: [要遵循的模式]
  - 文件: [要创建/修改的文件]
  - 依赖: [依赖项]
```

### 完成
```markdown
- [x] 任务描述
  - 完成时间: [时间戳]
  - 文件: [实际更改的文件]
```

### 阻塞
```markdown
- [ ] [BLOCKED: 原因] 任务描述
  - 已尝试: [尝试了什么]
  - 需要: [解除阻塞需要什么]
```

## 测试模式

### 单元测试结构
```typescript
describe('组件名', () => {
  describe('方法名', () => {
    it('应该处理快乐路径', () => {
      // 准备
      // 执行
      // 断言
    });
    
    it('应该处理错误情况', () => {
      // 准备
      // 执行
      // 断言
    });
  });
});
```

### 集成测试模式
```typescript
describe('功能集成', () => {
  beforeAll(async () => {
    // 设置
  });
  
  afterAll(async () => {
    // 清理
  });
  
  it('应该完成完整工作流', async () => {
    // 测试端到端场景
  });
});
```

## API 模式

### 请求处理器
```typescript
async function handleRequest(req: Request): Promise<Response> {
  // 1. 验证输入
  const validation = validateInput(req.body);
  if (!validation.success) {
    return errorResponse(400, validation.error);
  }
  
  // 2. 执行业务逻辑
  const result = await businessLogic(validation.data);
  if (!result.success) {
    return errorResponse(500, result.error);
  }
  
  // 3. 返回成功
  return successResponse(result.data);
}
```

### 响应格式
```typescript
// 成功
{ success: true, data: T }

// 错误
{ success: false, error: { code: string, message: string } }
```

## 组件模式 (React)

### 函数组件
```tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ComponentName({ value, onChange }: Props) {
  // Hooks 放在顶部
  const [state, setState] = useState();
  
  // 事件处理器
  const handleChange = useCallback(() => {}, []);
  
  // 渲染
  return <div>{/* JSX */}</div>;
}
```

## 数据库模式

### 仓储模式
```typescript
class EntityRepository {
  async findById(id: string): Promise<Entity | null> {}
  async findAll(filter: Filter): Promise<Entity[]> {}
  async create(data: CreateDTO): Promise<Entity> {}
  async update(id: string, data: UpdateDTO): Promise<Entity> {}
  async delete(id: string): Promise<void> {}
}
```
