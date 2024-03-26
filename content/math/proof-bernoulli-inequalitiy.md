---
title: Proof of Bernoulli's Inequality
---

<!-- endexcerpt -->

### Ideas

- Mathematical induction

### Claim

For $n \in \mathbb{N_0}$ and $x \geq -1$, the following inequality holds:

$$
(1+x)^n \geq 1 + nx
$$

### Proof

For $n=0$, the inequality is trivially true:

$$
(1+x)^n = 1 \geq 1 + nx = 1
$$

Assume that the inequality holds for some $n=k, k \in \mathbb{N_0}$. We need to show that it holds for $n=k+1$.

Multiplying $(1+x)$ on both sides of the inequality:

$$
\begin{aligned}
(1+x)^{k+1} &\geq (1 + kx)(1+x) \\
&\geq 1 + kx + x + x^2 \\
&\geq 1 + (k + 1)x + x^2
\end{aligned}
$$

Now we have:

$$
(1+x)^{k+1} \geq 1 + (k+1)x + x^2 \geq 1 + (k+1)x
$$

Which implies:

$$
(1+x)^{k+1} \geq 1 + (k+1)x
$$

We've shown if the inequality holds for $n=k$, then it also holds for $n=k+1$.

This completes the inductive step. By mathematical induction, the claim is true for all $n$.
