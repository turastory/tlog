---
title: Jetpack Compose - remember()와 method reference 사용 시 주의점
description: Compose에서 참조로 인한 골치 아픈 문제를 피하려면 가급적 method reference 보다 lambda를 사용하자.
tags:
  - kotlin
  - android
  - jetpack
  - compose
---

### TL;DR

Compose에서 참조로 인한 골치아픈 문제를 피하려면 가급적 method reference 보다 lambda를 사용하자.

---

Jetpack Compose를 활용해서 UI를 만들다가, `remember()`와 method reference을 사용하면서 생긴 문제에 대해 정리해보았다.

## Glossaries

### `remember()`

`remember()`는 Compose 런타임에서 활용할 수 있는 저장 및 캐시 매커니즘으로,
기본적으로는 저장된 값을 사용하되 키로 넘겨진 값이 변경되었을 경우 calculation block 내의 코드가 다시 실행된다.

```kotlin
// Always use the same instance (guaranteed to be retained across recomposition)
val manager = remember { CoordinatesManager() }

// Use the same instance unless 'key' changed (may not be retained across recomposition)
val manager = remember(key) { CoordinatesManager() }
```

### Lambda expression

Lambda expression - 람다 표현식은 파라미터를 받아서 값을 리턴하는 코드다.

함수와 무척 유사하지만, 이름이 없고 클로저로서 해당 코드 블록을 감싸고 있는 상위 영역의 환경에 접근이 가능하다. 이 환경 - environment에는 변수, 함수, 리시버 등이 포함된다.

```kotlin
val number = 5
button.onClick {
    // number is captured in this block
    println(number)
}
```

### Method reference

Method reference는 함수를 참조하는 것으로 람다와 비슷하게 함수가 필요한 곳에서 사용할 수 있다.

```kotlin
val number = 5

fun printNumber() {
    println(number)
}

button.onClick(::printNumber)
```

Lambda expression과 Method reference의 실제 구현상 가장 큰 차이점은 다음과 같다.

- Method reference을 사용하면, **생성되는 시점**의 환경을 캡처해서 사용하게 된다.
- Lambda expression을 사용하면, **사용하는 시점**의 환경을 캡처해서 사용하게 된다.

일반적으로는 lambda 대신 method reference를 사용해도 별 문제가 없는데, **코드에서 접근하는 대상(객체나 리시버)이 달라지면 이야기가 달라진다.**
다음 문단에서 좀 더 자세히 살펴보자.

### Case

Compose를 사용하면서 문제가 발생한 상황은 이렇다.

`SomeLayout`은 UI가 화면에 그려지는 시점에, 관련된 좌표와 크기를 가져오기 위한 콜백을 받는다. 내부에서는 items를 뿌려서 보여주고 있다.

```kotlin
@Composable
fun SomeLayout(
    items: List<Item>,
    register: (LayoutCoordinates) -> Unit
) {
    Box(
        Modifier.onGloballyPositioned { register(it) }
    ) {
        Column {
            items.forEach { item ->
                Text(item.text)
            }
        }
    }
}
```

뷰를 그리는 쪽은 다음과 같이 작성했다. 이 때 `SomeLayout`으로 넘겨지는 콜백에 method reference를 사용했다.

```kotlin
@Composable
fun MainUi(state: MainUiState) {
    val structureKey = listOf(
        state.items1, state.items2, state.items3
    ).map { it.id }.flatten().joinToString()

    val manager = remember(structureKey) {
        CoordinatesManager()
    }

    fun register(coords: LayoutCoordinates) {
        manager.register(coords)
    }

    Columns {
      SomeLayout(state.items1, ::register)
      SomeLayout(state.items2, ::register)
      SomeLayout(state.items3, ::register)
    }
}

```

여기서 `manager`를 가져올 때 `remember`의 키로 `structureKey`를 넘겨준 것을 확인할 수 있다.
레이아웃 구조가 변경되면 `manager`가 들고 있는 좌표 값들을 새로 갱신해야 해서 범위를 이렇게 잡았다.

### Issue

얼핏 보아서는 별로 문제가 되지 않을 것처럼 보이는 코드이지만, method reference의 특성 때문에 상태가 변경되었을 때 문제가 발생한다.

기대하는 동작은, 전체적인 레이아웃의 구조가 변경되었을 때 `manager`가 다시 생성되고, 각각의 레이아웃이 다시 그려지면 새로 생성된 `manager`의 `register` 함수를 호출하는 것이다.

하지만 실제로는 레이아웃이 다시 그려졌을 때 **이전에 참조했던 `manager`의 `register` 함수를 호출**하게 된다.
앞서 나왔던 method reference의 특성에 따라 초기 시점의 `manager`를 캡처해서 사용하고 있는 것이다.

### Resolution

그렇다면 람다를 사용하면 문제가 해결될까? **그렇다.** 다음과 같이 사용하면 된다.

```kotlin
Columns {
    SomeLayout(state.items1) { register(it) }
    SomeLayout(state.items2) { register(it) }
    SomeLayout(state.items3) { register(it) }
}
```

다른 방법은 없을까? Method reference를 사용한다면 결국 생성 시점의 환경을 캡처한다는 문제를 어떻게 핸들링하는지가 핵심이다.

`remember`에 키를 넘기지 않고 동일한 인스턴스를 계속 사용하면서, 갱신이 필요할 때 인스턴스를 다시 생성하는 대신 별도의 초기화를 진행하는 식으로 푸는 수밖에는 없을 것 같다.

근데 그렇게 머리아프게 고민할 시간에 그냥 람다를 쓰자.. method reference를 사용했을 때 가독성이 좋은 몇몇 부분들이 있어 여러 방면으로 혼용했었는데,
Compose를 사용할 때는 이런 문제를 피하기 위해서라도 가급적 람다를 사용해야겠다.

## Reference

좀 더 디테일한 구현상 차이는 [Lambda vs Method Reference](https://proandroiddev.com/kotlin-lambda-vs-method-reference-fdbd175f6845) 포스트를 참고.
