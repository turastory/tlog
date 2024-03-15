---
title: TypeORM에서 default value 사용 시 주의점
tags:
  - nestjs
  - typeorm
---

```typescript
@Column({ default: 0 })
views: number;
```

위처럼 같이 default 값을 줬는데 에러가 난다. non-null value에 null 값이 들어왔다는 오류였다. default 값이 제대로 인식되지 않는 것일까? 여기서 뭘 더 해줘야하나?

해답은 [레퍼런스](https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-options)에 있었다.

```markdown
default: string - Adds database-level column's DEFAULT value.
```

default가 string 타입이란다. 분명 타입 정의에서는 이렇게 봤었는데..

```typescript
default?: any
```

DB로는 Postgres를 사용했는데 이게 Postgres만 그런건지, 아니면 다른 것들도 그런건지는 모르겠다. 어쨌든 다음과 같이 따옴표로 감싸주면 정상적으로 동작한다.

```typescript
@Column({ default: '0' })
views: number;
```
