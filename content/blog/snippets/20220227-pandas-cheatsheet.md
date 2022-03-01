---
title: Pandas Cheatsheet
date: "2022-02-27"
category: snippet
tags:
  - python
  - pandas
  - data-analysis
---

## By use case

###Filter rows

```python
1. df[df[column_name] == some_value]
2. df[df[column_name].isin(some_values)]
3. df[~df[column_name].isin(some_values)]
4. df[(cond1) & (cond2) | (cond3)]
5. s[s == some_value]
```

###Convert multi-index series to dataframe

```python
Series.unstack
```

https://stackoverflow.com/questions/44142591/converting-a-pandas-multi-index-series-to-a-dataframe-by-using-second-index-as-c

###Convert index of dataframe to a column

```python
1. df[column_name] = df.index
2. df.insert(0, column_name, df.index)
3. df.reset_index(level=0, inplace=True)
```

###Rename columns

```python
result.rename(columns={ category: 'item_code' })
```

https://stackoverflow.com/questions/20461165/how-to-convert-index-of-a-pandas-dataframe-into-a-column

###Split a single row into multiple rows

```python
DataFrame.explode
Series.explode
```

https://stackoverflow.com/questions/50731229/split-cell-into-multiple-rows-in-pandas-dataframe

###Group by - sort within groups

```python
# We need to sort within depth2, so group by depth2 and aggergate.
agg = df.groupby(['depth1', 'depth2'])['depth2'].agg([('total_size', 'size)])

# sort within the groups, take the most N rows.
# Note: pass group_keys=False to avoid receiving indices in subsequent apply() function.
count = 3
result = agg.groupby('depth1', group_keys=False).apply(
  lambda x: x.sort_values(by='total_size', ascending=False).iloc[:count]
)

# Optional - join the most N rows to a single row
result.reset_index(level='depth2').groupby(category, group_keys=False).apply(
    lambda x: ','.join(map(str, x['depth2']))
)
```

https://stackoverflow.com/questions/27842613/pandas-groupby-sort-within-groups

---

## Mapping Functions

> map vs apply vs applymap vs transform

헷갈리는 Pandas의 매핑 함수들에 대해 정리해보았다.

###[GroupBy.apply](https://pandas.pydata.org/docs/reference/api/pandas.core.groupby.GroupBy.apply.html)

> Apply function func group-wise and combine the results together.

- group에 속한 Row를 가지고 있는 `DataFrame`을 함수 인자로 받는다. 다음과 같이 apply에 넘기는 lambda 함수에서 print를 해보면 알 수 있다.
- 함수에서는 DataFrame, Series, Scalar 등 다양한 값을 리턴할 수 있다.

###[DataFrame.apply](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html)

> Apply a function along input axis of DataFrame.

- DataFrame의 row나 column을 함수 인자로 받는다.

  - axis: 0 or index - 각각의 column에 적용
  - axis: 1 or columns - 각각의 row에 적용

- 함수에서는 Series나 Scalar를 리턴해야 한다.
- `result_type`을 통해 함수에서 리턴하는 값들이 어떻게 묶이는지 결정할 수 있다.

###[DataFrame.applymap](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.applymap.html)

> Apply a function to a Dataframe elementwise

- DataFrame의 모든 값을 각각 함수 인자로 받는다.
- 함수에서는 Scalar를 리턴해야 한다.

### Element-wise?

- `DataFrame.apply` - 전체 row나 column에 적용됨.
- `DataFrame.applymap`, `Series.apply`, `Series.map` - 각각의 요소에 적용됨.

###`Series.apply`와 `Series.map`의 차이점

둘 모두 개별 요소에 함수가 적용되지만(element-wise), 리턴할 수 있는 형태가 다르다.

- `Series.apply`에 전달되는 함수는 개별 요소나 `Series`를 리턴할 수 있음
- `Series.map`은 개별 요소만 리턴할 수 있음

-> `Series.map`은 변환 전/후의 차원이 유지되는 반면 `Series.apply`는 변환 후의 차원이 변할 수 있음. (Series -> DataFrame이 될 수 있다)
