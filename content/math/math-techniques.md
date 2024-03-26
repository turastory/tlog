---
title: Various Math Techniques
description: A collection of various math techniques
---

Here are some techniques for solving math problems.

#### Adding new term while keep the equation true

$$
\begin{aligned}
a &= b - c + c \\
\frac{b}{a} &= \frac{b}{c} \times \frac{c}{a} \\
\end{aligned}
$$

#### Manipulating fractions

$$
\begin{aligned}
1 - \frac{1}{n} &= \frac{n-1}{n} \\
\frac{n}{n-1} &= \frac{n-1}{n-1} + \frac{1}{n-1} = 1 + \frac{1}{n-1} \\
\frac{1}{n(n+1)} &= \frac{1}{n} - \frac{1}{n+1}
\end{aligned}
$$

> ##### Example: Limit of $(1-1/n)^n$ as $n \to \infty$
>
> $$
> \begin{aligned}
> (1-\frac{1}{n})^n &= (\frac{n-1}{n})^n \\
> &= (\frac{1}{\frac{n}{n-1}})^n \\
> &= (\frac{1}{1+\frac{1}{n-1}})^n \\
> &= (\frac{1}{1+\frac{1}{n-1}})^{n-1} \cdot \frac{1}{1+\frac{1}{n-1}}\\
> \end{aligned}
> $$
>
> Recall that:
>
> $$
> e \coloneqq \lim_{n \to \infty} (1+\frac{1}{n})^n
> $$
>
> As $n \to \infty$, the left term goes to $\frac{1}{e}$ and the right term goes to $1$. So:
>
> $$
> \lim_{n \to \infty} (1-\frac{1}{n})^n = \frac{1}{e}
> $$

#### Absolute values

For $a, b\in \mathbb{R}$:

$$
\begin{alignat*}
|a| = |-a| \\
ab \leq |a||b| \\
\sqrt{a^2} = |a| \\
-|a| \leq a \leq |a| \\
\forall r > 0, |a| \leq r \iff -r \leq a \leq r \\
\end{alignat*}
$$

From the triangle inequality, for $a, b, c \in \mathbb{R}$:

$$
\begin{align*}
|a+b| &\leq |a| + |b| \\
|a-b| &\leq |a| + |b| \\
|a-b| &\leq |a-c| + |c-b| \\
\end{align*}
$$
