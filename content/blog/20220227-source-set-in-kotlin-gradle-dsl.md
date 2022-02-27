---
title: Gradle 프로젝트에 새로운 Source Set 추가하기 (with Kotlin Gradle DSL)
date: "2022-02-27"
category: snippet
tags:
  - kotlin
  - gradle
  - intellij
---

Gradle에서는 모듈 내에서도 소스셋을 나누어 사용할 수 있다. Intellij를 사용했을 때는 기본적으로는 다음과 같이 `main`, `test` 두 가지의 source set이 디폴트로 주어지지만, 상황에 따라 여분의 소스셋을 추가하고 싶을 때도 있다.

![main and test source sets](./20220227-source-set-in-kotlin-gradle-dsl/main-and-test.png)

나는 유닛 테스트와 통합 테스트를 서로 다른 소스셋으로 구분하고 싶어서 기존의 `test`는 그대로 둔 채로 `unitTest`라는 소스셋을 새로 추가했다. `build.gradle.kts`에서 아래와 같이 새로운 소스셋을 추가할 수 있다.

```kotlin
// Create a new sourceSet for unitTests
sourceSets {
    create("unitTest") {
        java {
            compileClasspath += main.get().compileClasspath + test.get().compileClasspath
            runtimeClasspath += main.get().runtimeClasspath + test.get().runtimeClasspath
            srcDir("src/unitTest/kotlin")
        }
    }
}
```

여기서 주목할 만한 부분은 `classpath`를 설정하는 부분이다. 기존에 테스트를 작성할 때는 별도의 설정 없이 `main` 소스셋의 클래스들을 가져다 사용할 수 있었다. 이는 `test` 소스셋에서 `main`의 클래스패스를 참조하기 때문에 그렇다. 마찬가지로 `unitTest`에서도 테스트를 위한 디펜던시들에 접근해야 하기 때문에 `test`의 클래스패스를 새로운 소스셋의 클래스패스에 추가해주었다.

여기까지 작성했다면 IDE의 파일 트리에 새로운 소스셋이 추가된 것을 확인할 수 있다. 그런데 Intellij가 해당 소스셋을 테스트 소스셋으로 인식하지 않는다.

![does not recognize as test source set](./20220227-source-set-in-kotlin-gradle-dsl/not-a-test-source-set.png)

이를 위해서는 idea 플러그인을 추가하고, `testSourceDirs`에 새로 추가한 소스셋을 등록하면 된다.

```kotlin
plugins {
    idea
}

// Register unitTest sourceSet as a test sourceSet.
idea.module {
    val testSources = testSourceDirs
    testSources.addAll(project.sourceSets.getByName("unitTest").java.srcDirs)
    // This line is redundant, but I just keep it as a reference.
    testSources.addAll(project.sourceSets.getByName("unitTest").resources.srcDirs)
    testSourceDirs = testSources
}
```

![recognize as test source set](./20220227-source-set-in-kotlin-gradle-dsl/test-source-set.png)

---
