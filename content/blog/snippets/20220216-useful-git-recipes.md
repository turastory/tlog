---
title: 유용한 Git 레시피 몇 가지
category: snippet
tags:
  - git
  - tips
---

## 커밋 이름 변경

### 바로 이전 커밋의 메시지 변경

```
git commit --amend
```

### 과거 N번째 커밋의 메시지 변경

```
git rebase -i HEAD~N
```

이후 원하는 커밋에 pick -> reword 후 메시지 작성

## 작업 내용 저장

```
# 현재 작업 영역에 있는 모든 내용 저장
git stash push

# stash할 때 메시지 지정
git stash push -m <message>

# 한 개의 파일만 stash (~ Git 2.13)
git stash push <path-to-file>
```
