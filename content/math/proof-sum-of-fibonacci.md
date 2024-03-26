---
title: Proof of sum of fibonacci sequence
---

<!-- endexcerpt -->

### Ideas

- Mathematical induction

### Claim

Let $(f_n)$ be the sequence of Fibonacci numbers, i.e.

$$
f_1 = 1, f_2 = 1, f_n = f_{n-1} + f_{n-2} \text{ for } n \geq 3.
$$

Let $(s_n) = \sum_{n}^{\infty} f_n$. Then the following statement is true:

$$
s_n = f_{n+2} - 1.
$$

### Proof

For $n=1$, $s_1 = f_1 = 1$. And we can know it satisfies the claim, since $f_3 - 1 = 2 - 1 = 1$.

Assume that the claim is true for some $n=k, k \in \mathbb{N}$:

$$
s_k = f_{k+2} - 1
$$

We need to show that it also holds for $n=k+1$:

$$
s_{k+1} = f_{k+3} - 1
$$

From the claim:

$$
f_1 + f_2 + \ldots + f_k = f_{k+2} - 1
$$

Adding $f_{k+1}$ to both sides:

$$
f_1 + f_2 + \ldots + f_k + f_{k+1} = f_{k+2} - 1 + f_{k+1}
$$

Using the definition of Fibonacci numbers, this can be written as:

$$
s_{k+1} = f_{k+3} - 1
$$

This completes the inductive step. By the principle of mathematical induction, the claim is true for all $n \in \mathbb{N}$.
