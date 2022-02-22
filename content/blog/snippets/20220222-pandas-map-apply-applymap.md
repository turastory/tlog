---
title: Pandas map vs apply vs applymap
date: "2022-02-22"
category: snippet
tags:
  - python
  - pandas
  - data-analysis
---

세 가지의 차이에 대해 정리해보았다.

### Element-wise?

- `DataFrame.apply` - 전체 row나 column에 적용됨.
- `DataFrame.applymap`, `Series.apply`, `Series.map` - 전체 row나 column에 적용됨.

### `Series.apply`와 `Series.map`의 차이점

둘 모두 개별 요소에 함수가 적용되지만(element-wise), 리턴할 수 있는 형태가 다르다.

- `Series.apply`에 전달되는 함수는 개별 요소나 `Series`를 리턴할 수 있음
- `Series.map`은 개별 요소만 리턴할 수 있음

-> `Series.map`은 변환 전/후의 차원이 유지되는 반면 `Series.apply`는 변환 후의 차원이 변할 수 있음. (Series -> DataFrame이 될 수 있다)
