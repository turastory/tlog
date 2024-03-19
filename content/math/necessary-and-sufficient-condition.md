---
title: Notes on Necessary and Sufficient Condition
date: 2023-03-15
---

<!-- endexcerpt -->

### Definition

Consider the following statement: "If $P$, then $Q$." This statement can be written as:

$$
P \implies Q
$$

Here, $P$ is called the **sufficient condition** and $Q$ is called the **necessary condition**.

If $P \implies Q$ and $Q \implies P$, then $P$ and $Q$ are said to be the **necessary and sufficient conditions** for each other, which is written as:

$$
P \iff Q
$$

#### Why $Q$ is called 'necessary' condition?

Assume that $P \implies Q$ is true.

Then $Q$ should be true whenever $P$ is true. If $Q$ is false, then $P$ cannot be true.

In other words, $Q$ is necessary for $P$ to be true. This is why $Q$ is called the **necessary condition**.

This implies:

- If Q is not true, then P cannot be true.
- If Q is true, then P can be true, **but not necessarily**.

#### Why $P$ is called 'sufficient' condition?

Assume that $P \implies Q$ is true.

Then $P$ is enough to guarantee that $Q$ is true, since $P \implies Q$.

In other words, $P$ is sufficient for $Q$ to be true. This is why $P$ is called the **sufficient condition**.

This implies:

- If P is true, then Q is true.
- If P is not true, then Q can be not true, **but not necessarily**.

### Examples

For example consider the relationship between [differentiability and continuity](/math/differentiability-and-continuity).:

> For a function $f(x)$:
>
> $$
> f(x)\text{ is differentiable at } x = a \implies f(x)\text{ is continuous at } x = a
> $$

This means that differentiability is a sufficient condition for continuity. In other words, if a function is differentiable at a point, then it is continuous at that point.

The converse is not necessarily true. A function can be continuous at a point without being differentiable at that point.

Another example is the definition of a continuous function.

> For a function $f(x)$:
>
> $$
> f(x)\text{ is continuous at } x = a \iff \lim_{x \to a} f(x) = f(a)
> $$

In this case, the left side and the right side mean the same thing. They're the necessary and sufficient conditions for each other.
