---
title: Kotlin 환경에서 Spring Data JPA를 사용할 때 Entity에서 Set 사용 시 ClassCastException 문제
description: 스프링 열받네..
category: snippet
tags:
  - kotlin
  - socket
  - spring
---

Kotlin 환경에서 Spring Data JPA 사용할 때 Entity에 `setOf()`, `Collections.toSet()`를 사용하면 내부 구현이 EmptySet으로 되어 있어서 (`Set<Nothing>`) merge할 때 `ClassCastException`이 발생한다.

대신 `HashSet`을 사용하면 된다.

```kotlin
// 선언
@Entity
class Model(
    var options: Set<OtherModel> = setOf() -> hashSetOf()
)

// 리스트 변환
model.options = options.toHashSet()
```

동일한 문제가 `listOf()`에 대해서도 발생하는 것을 확인했다. 리스트를 사용할 경우에는 `listOf()` 대신 `arrayListOf()`를 사용하면 된다.

```kotlin
// 선언
@Entity
class Model(
    var options: List<OtherModel> = listOf() -> arrayListOf()
)
```
