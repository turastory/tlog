---
title: Android Studio에서 keystore 생성 시 주의점
date: "2022-02-10"
category: snippet
tags:
  - android
  - androidstudio
  - keystore
  - release
---

Android Studio에서 릴리즈를 위해 keystore를 생성할 때, 키스토어의 패스워드와 키의 패스워드가 다르면 아래와 같은 오류가 발생합니다.

혹시라도 동일한 문제를 겪고 있다면 두 패스워드에 동일한 걸 사용해보세요.

!["PKCS12 error"](./20220210-android-studio-keystore/error-pkcs12.png)
!["Final block error"](./20220210-android-studio-keystore/error-final-block.png)
