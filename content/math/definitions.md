---
title: Notes on sequence, series
---

<!-- endexcerpt -->

## Limit

The limit of a function $f(x)$ as $x$ approaches $a$ is $L$ if for every $\epsilon > 0$, there exists a $\delta > 0$ such that if $0 < |x - a| < \delta$, then $|f(x) - L| < \epsilon$. Symbolically, this is written as:

$$
\forall \epsilon > 0, \exists \delta > 0 \text{ s.t. } 0 < |x - a| < \delta \implies |f(x) - L| < \epsilon.
$$

In this case, we write:

$$
\lim_{x \to a} f(x) = L.
$$

## Sequence

A sequence is a function from the natural numbers to the real numbers. It is usually denoted as $(a_n)$, where $n$ is a natural number.

Alternative notations:

- $(a_1, a_2, a_3, \ldots)$
- $(a_n \colon n = 1, 2, 3, \ldots)$
- $(a_n)_{n=1}^{\infty}$

When each term of the sequence satisfies a certain condition P, we write:

$$
(a_n \colon P(a_n)) \text{ or } (a_n \mid P(a_n))
$$

### Convergence & Divergence of sequences

When a sequence $(a_n)$ converges to a real number $L$, we write:

$$
\lim_{n \to \infty} a_n = L
$$

This means that for every $\epsilon > 0$, there exists a natural number $N$ such that if $n > N$, then $|a_n - L| < \epsilon$. Symbollcally, this is written as:

$$
\forall \epsilon > 0, \exists N \in \mathbb{N_0} \text{ s.t. } n > N \implies |a_n - L| < \epsilon.
$$

When a sequence $(a_n)$ diverges, we write:

$$
\lim_{n \to \infty} a_n = \infty \text{ or } \lim_{n \to \infty} a_n = -\infty
$$

## Series

A series is a sequence of partial sums of a sequence. Given a sequence $(a_n)$, a series derived from it, is usually denoted as:

$$
\sum_{n=1}^{\infty} a_n
$$

Or simply:

$$
\sum a_n
$$
