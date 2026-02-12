# 架构图模板

常见 SDD 架构的 Mermaid 图模板。

## 基础 Web 应用

```mermaid
flowchart TB
    subgraph Client [客户端层]
        Browser[浏览器]
        Mobile[移动应用]
    end
    
    subgraph API [API 层]
        Gateway[API 网关]
        Auth[认证服务]
    end
    
    subgraph Services [服务层]
        UserSvc[用户服务]
        CoreSvc[核心服务]
    end
    
    subgraph Data [数据层]
        DB[(数据库)]
        Cache[(缓存)]
    end
    
    Browser --> Gateway
    Mobile --> Gateway
    Gateway --> Auth
    Gateway --> UserSvc
    Gateway --> CoreSvc
    UserSvc --> DB
    CoreSvc --> DB
    CoreSvc --> Cache
```

## 微服务架构

```mermaid
flowchart LR
    subgraph Gateway [API 网关]
        GW[网关]
    end
    
    subgraph Services [服务]
        SvcA[服务 A]
        SvcB[服务 B]
        SvcC[服务 C]
    end
    
    subgraph Messaging [消息总线]
        Queue[消息队列]
    end
    
    subgraph Data [数据存储]
        DBA[(数据库 A)]
        DBB[(数据库 B)]
        DBC[(数据库 C)]
    end
    
    GW --> SvcA
    GW --> SvcB
    GW --> SvcC
    SvcA --> DBA
    SvcB --> DBB
    SvcC --> DBC
    SvcA <--> Queue
    SvcB <--> Queue
    SvcC <--> Queue
```

## 事件驱动架构

```mermaid
flowchart TB
    subgraph Producers [事件生产者]
        API[API 服务]
        Worker[Worker]
    end
    
    subgraph Bus [事件总线]
        Events[事件流]
    end
    
    subgraph Consumers [事件消费者]
        Handler1[处理器 1]
        Handler2[处理器 2]
        Handler3[处理器 3]
    end
    
    subgraph Storage [存储]
        EventStore[(事件存储)]
        ReadDB[(读数据库)]
    end
    
    API --> Events
    Worker --> Events
    Events --> Handler1
    Events --> Handler2
    Events --> Handler3
    Events --> EventStore
    Handler1 --> ReadDB
    Handler2 --> ReadDB
```

## 组件图

```mermaid
classDiagram
    class Controller {
        +handleRequest()
        +validateInput()
    }
    
    class Service {
        +businessLogic()
        +orchestrate()
    }
    
    class Repository {
        +find()
        +save()
        +delete()
    }
    
    class Entity {
        +id
        +data
        +validate()
    }
    
    Controller --> Service
    Service --> Repository
    Repository --> Entity
```

## 时序图 - 请求流程

```mermaid
sequenceDiagram
    participant C as 客户端
    participant G as 网关
    participant A as 认证
    participant S as 服务
    participant D as 数据库
    
    C->>G: 请求
    G->>A: 验证令牌
    A-->>G: 令牌有效
    G->>S: 转发请求
    S->>D: 查询数据
    D-->>S: 数据
    S-->>G: 响应
    G-->>C: 响应
```

## 状态机

```mermaid
stateDiagram-v2
    [*] --> 草稿
    草稿 --> 待审核: 提交
    待审核 --> 已批准: 批准
    待审核 --> 已拒绝: 拒绝
    已拒绝 --> 草稿: 修改
    已批准 --> 已发布: 发布
    已发布 --> 已归档: 归档
    已归档 --> [*]
```

## 数据流图

```mermaid
flowchart LR
    subgraph Input [输入]
        User[用户输入]
        API[外部 API]
    end
    
    subgraph Process [处理]
        Validate[验证]
        Transform[转换]
        Enrich[增强]
    end
    
    subgraph Output [输出]
        Store[存储]
        Notify[通知]
        Response[响应]
    end
    
    User --> Validate
    API --> Validate
    Validate --> Transform
    Transform --> Enrich
    Enrich --> Store
    Enrich --> Notify
    Store --> Response
```

## 部署图

```mermaid
flowchart TB
    subgraph Cloud [云服务商]
        subgraph LB [负载均衡]
            ALB[应用负载均衡]
        end
        
        subgraph Compute [计算]
            Container1[容器 1]
            Container2[容器 2]
        end
        
        subgraph Storage [存储]
            RDS[(RDS)]
            S3[S3 存储桶]
            Redis[(Redis)]
        end
    end
    
    Internet[互联网] --> ALB
    ALB --> Container1
    ALB --> Container2
    Container1 --> RDS
    Container2 --> RDS
    Container1 --> Redis
    Container2 --> Redis
    Container1 --> S3
```

## 使用说明

1. 复制相关模板
2. 用实际组件名替换占位符名称
3. 调整关系以匹配你的架构
4. 根据需要添加或删除组件
5. 使用一致的命名规范
