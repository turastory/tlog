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
1 - \frac{1}{a} &= \frac{a-1}{a} \\
\frac{a}{a-1} &= \frac{a-1}{a-1} + \frac{1}{a-1} = 1 + \frac{1}{a-1} \\
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
> $$
> e \coloneqq \lim_{n \to \infty} (1+\frac{1}{n})^n
> $$
>
> As $n \to \infty$, the left term goes to $\frac{1}{e}$ and the right term goes to $1$. So:
>
> $$
> \lim_{n \to \infty} (1-\frac{1}{n})^n = \frac{1}{e}
> $$
