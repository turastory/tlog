---
title: Notes on Differentiability and Continuity
date: 2023-03-15
---

<!-- endexcerpt -->

### Continuity

A function $f(x)$ is continuous at $x = a$ if the following three conditions are satisfied:

1. $f(a)$ is defined.
2. $\lim_{x \to a} f(x)$ exists.
3. $\lim_{x \to a} f(x) = f(a)$.

Formally,

$$
\forall \epsilon > 0, \exists \delta > 0 \text{ s.t. } |x - a| < \delta \implies |f(x) - f(a)| < \epsilon.
$$

$$
\int_{a}^{b} f(x) \, dx
$$

> Note: being continuous at a specific point and being a continuous function are different things. A function is continuous if it is continuous **at every point in its domain**.

### Differentiability

A function $f(x)$ is differentiable at $x = a$ if the following limit exists:

$$
f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.
$$

Here, $f'(a)$ is called the derivative of $f(x)$ at $x = a$.

> Note: again, 'differentiable at a point $a$' and 'differentiable function' are different things. A function is differentiable if it is differentiable **at every point in its domain**.

### The relationship between continuity and differentiability

If a function is differentiable at a point, then it is continuous at that point. However, the converse is not necessarily true.

$$
f(x)\text{ is differentiable at } x = a \implies f(x)\text{ is continuous at } x = a
$$
